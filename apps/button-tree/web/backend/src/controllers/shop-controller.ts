import { Router } from "express";

import { createSubscription, getBillingData } from "../features/billing";
import { errorLogger } from "../helpers/error-logger";
import { loadOfflineSession } from "../helpers/load-offline-session";
import { prisma } from "../prisma";

const router = Router();

router.get("/profile", async (req, res) => {
  const session = await loadOfflineSession({ res });
  try {
    if (session) {
      const shop = await prisma.shop.findFirstOrThrow({
        where: { shop: session.shop },
      });

      const { hasPayment, details } = await getBillingData(session);

      res.send({
        shop,
        hasSubscription: hasPayment,
        plan: details,
      });
    }
  } catch (e: any) {
    errorLogger(req, session, e);
    res.status(400).send({
      error: "Error while getting shop data",
      data: e?.response?.errors,
    });
  }
});

router.post("/create-app-subscription", async (req, res) => {
  const session = await loadOfflineSession({ res });
  try {
    if (session) {
      const confirmationUrl = await createSubscription(session);

      res.status(200).send({ confirmationUrl });
    }
  } catch (e: any) {
    errorLogger(req, session, e);
    res.status(400).send({
      error: "Error while creating App Subscription",
      data: e?.response?.errors,
    });
  }
});

export const ShopController = router;
