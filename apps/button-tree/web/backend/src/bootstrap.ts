import express, { Request, urlencoded } from "express";
import { readFileSync } from "fs";
import { join } from "path";
import serveStatic from "serve-static";

import { CONFIG } from "./config";
import { METAFIELD_KEY, METAFIELD_NAMESPACE } from "./constants";
import {
  ClientController,
  MetafieldController,
  ShopController,
  ShopifyThemeController,
  WidgetController,
} from "./controllers";
import { createSubscription, ensureCurrentBilling } from "./features/billing";
import { loadOfflineSession } from "./helpers/load-offline-session";
import { ensureShopData } from "./helpers/save-shop-data";
import { shopify } from "./shopify";
import { webhookHandlers } from "./webhook-handlers";

const IS_PROD = process.env.NODE_ENV === "production";

const STATIC_PATH = IS_PROD ? `../frontend/dist` : `../frontend`;

export async function createServer() {
  const app = express();

  app.use("/api/status", async (req, res) => {
    res.status(200).send({
      status: "ok",
      production: IS_PROD,
      apiKey: CONFIG.SHOPIFY_API_KEY,
      blockId: CONFIG.SHOPIFY_BLOCK_ID,
      billing_test: CONFIG.BILLING_TEST,
      metafields: {
        namespace: METAFIELD_NAMESPACE,
        key: METAFIELD_KEY,
      },
    });
  });

  app.use("/api/client", ClientController);

  // Internal GQL proxy for local graphiql admin
  app.post("/api/admin-graphql", express.json(), async (req, res) => {
    const password = req.headers.password;

    if (password !== CONFIG.ADMIN_GRAPHQL_PASSWORD) {
      res.status(401).json({ err: "incorrect shop or password" });
      return;
    }
    const session = await loadOfflineSession({ res });

    try {
      await shopify.api.clients
        .graphqlProxy({
          session,
          rawBody: req.body,
        })
        .then((data) => res.send(data?.body))
        .catch((e) => {
          res.status(400).send({ errors: e?.response?.errors });
        });
    } catch (e) {
      console.log(e);
    }
  });

  // CSP x-frame header
  app.use(async (req, res, next) => {
    const shop = shopify.api.utils.sanitizeShop(req.query.shop as string);

    res.setHeader(
      "Content-Security-Policy",
      `frame-ancestors https://admin.shopify.com ${
        shop ? "https://" + encodeURIComponent(shop) : ""
      }`,
    );
    next();
  });

  app.get(shopify.config.auth.path, shopify.auth.begin());
  app.get(
    shopify.config.auth.callbackPath,
    shopify.auth.callback(),
    async (req, res, next) => {
      const session = await loadOfflineSession({ res });
      await ensureShopData(session);

      const { hasPayment } = await ensureCurrentBilling(session);

      if (!hasPayment) {
        const confirmationUrl = await createSubscription(session);
        res.redirect(confirmationUrl);
      }
      next();
    },
    shopify.redirectToShopifyOrAppRoot(),
  );

  app.post(
    shopify.config.webhooks.path,
    shopify.processWebhooks({ webhookHandlers }),
  );

  // All endpoints after this point will require an active session
  app.use("/api/*", shopify.validateAuthenticatedSession());

  // All endpoints after this point will have access to a request.body
  // attribute, as a result of the express.json() middleware
  app.use(express.json());
  app.use(urlencoded({ extended: true }));

  app.post("/api/graphql", async (req: Request, res) => {
    const session = await loadOfflineSession({ res });

    try {
      await shopify.api.clients
        .graphqlProxy({
          session,
          rawBody: req.body,
        })
        .then((data) => res.send(data.body))
        .catch((e) => res.status(400).send({ errors: e?.response?.errors }));
    } catch (e) {
      console.log(e);
    }
  });

  app.use("/api/shop", ShopController);
  app.use("/api/shopify-theme", ShopifyThemeController);
  app.use("/api/widget", WidgetController);
  app.use("/api/metafield", MetafieldController);

  app.use(serveStatic(STATIC_PATH, { index: false }));

  app.use("/*", shopify.ensureInstalledOnShop(), async (req, res) => {
    const htmlFile = join(STATIC_PATH, "index.html");

    return res
      .status(200)
      .set("Content-Type", "text/html")
      .send(readFileSync(htmlFile));
  });

  return { app };
}
