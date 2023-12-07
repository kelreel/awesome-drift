import { Router } from "express";

import { METAFIELD_KEY, METAFIELD_NAMESPACE } from "../constants";
import {
  createMetafieldDefinition,
  getAppMetafield,
  getMetafieldDefinitions,
} from "../features/metafield";
import { errorLogger } from "../helpers/error-logger";
import { loadOfflineSession } from "../helpers/load-offline-session";

const router = Router();

router.get("/app-all", async (req, res) => {
  const session = await loadOfflineSession({ res });

  try {
    if (session) {
      const widgetSettingMetafield = await getAppMetafield(
        session,
        METAFIELD_NAMESPACE.widget,
        METAFIELD_KEY.settings,
      );

      const billingMetafield = await getAppMetafield(
        session,
        METAFIELD_NAMESPACE.billing,
        METAFIELD_KEY.plan,
      );

      const productMetafields = await getMetafieldDefinitions(
        session,
        "PRODUCT",
      );

      res.send({
        widgetSettingMetafield,
        billingMetafield,
        productMetafields,
      });
    }
  } catch (e: any) {
    errorLogger(req, session, e);
    res.status(400).send({
      error: "Error while initializing metafields",
      data: e?.response?.errors,
    });
  }
});

router.get("/find", async (req, res) => {
  const session = await loadOfflineSession({ res });
  const search = (req.query.search as string) || "";

  try {
    if (session) {
      const definitions = await getMetafieldDefinitions(
        session,
        "PRODUCT",
        search,
      );

      res.send(definitions);
    }
  } catch (e: any) {
    errorLogger(req, session, e);
    res.status(400).send({
      error: "Error while getting metafields",
      data: e?.response?.errors,
    });
  }
});

router.post("/create", async (req, res) => {
  const session = await loadOfflineSession({ res });
  const { namespace, key, name } = req.body;

  try {
    if (session) {
      const definition = await createMetafieldDefinition(session, {
        name,
        namespace,
        key,
        type: "single_line_text_field",
        ownerType: "PRODUCT",
        visibleToStorefrontApi: true,
        pin: true,
      });

      console.log(
        `[Metafield-Controller]: create mf "${namespace}.${key}" for ${session.shop}`,
      );
      res.send(definition);
    }
  } catch (e: any) {
    errorLogger(req, session, e);
    res.status(400).send({
      errors: [e],
    });
  }
});

export const MetafieldController = router;
