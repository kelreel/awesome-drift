import { Session } from "@shopify/shopify-api";
import { Response } from "express";

import { shopify } from "../shopify";

// get offline session by shop or from Request
export const loadOfflineSession = async ({
  shop,
  res,
}: {
  shop?: string;
  res?: Response;
}): Promise<Session> => {
  if (res) {
    shop = res.locals?.shopify?.session?.shop || shop;
  }

  if (!shop) {
    throw "No shop provided";
  }

  const id = shopify.api.session.getOfflineId(shop);
  const session = await shopify.config.sessionStorage.loadSession(id);
  return session as Session;
};
