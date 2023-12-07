// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import { shopify } from "./shopify.js";
import { GDPRWebhookHandlers } from "./webhooks/gdpr.js";
import { BillingWebhookHandlers } from "./webhooks/billing.js";
import { ThemeController } from "./controllers/theme-controller.js";
import { ensureBilling } from "./billing/ensure-billing.js";
import { ShopController } from "./controllers/shop-controller.js";
import { CONFIG } from "./config.js";

const app = express();

app.get("/api/status", (_req, res) => {
  res.status(200).send({
    billing_test: CONFIG.BILLING_TEST,
    block_id: CONFIG.SHOPIFY_TIMER_BLOCK_ID,
    node_env: process.env.NODE_ENV,
  });
})

// Auth
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  (_req, res, next) => {
    const { session } = res.locals.shopify;
    shopify.api.webhooks.register({ session })
    next();
  },
  ensureBilling,
  shopify.redirectToShopifyOrAppRoot()
);

// Webhooks
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: { ...GDPRWebhookHandlers, ...BillingWebhookHandlers } })
);

// API Controllers
app.use("/api/*", shopify.validateAuthenticatedSession());
app.use(express.json());

app.use('/api/shop', ShopController);
app.use('/api/theme', ThemeController);

// Serve frontend
const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(CONFIG.PORT, () => {
  const { PG, ...params } = CONFIG;
  console.log(`Config:`, params);
  console.log("App listening on port", CONFIG.PORT);
});
