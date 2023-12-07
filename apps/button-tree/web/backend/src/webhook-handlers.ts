import { DeliveryMethod } from "@shopify/shopify-api";
import { WebhookHandlersParam } from "@shopify/shopify-app-express";

import { ensureCurrentBilling } from "./features/billing/ensure-current-billing";
import { loadOfflineSession } from "./helpers/load-offline-session";
import { prisma } from "./prisma";
import { shopify } from "./shopify";

export const webhookHandlers: WebhookHandlersParam = {
  APP_UNINSTALLED: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: shopify.config.webhooks.path,
    callback: async (topic, shop, body, webhookId, apiVersion) => {
      await prisma.shop.update({ where: { shop }, data: { installed: false } });
      console.log(`Ap uninstalled, shop: ${shop}`);
    },
  },
  APP_SUBSCRIPTIONS_UPDATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      try {
        const payload = JSON.parse(body);
        const { app_subscription } = payload;

        console.log(
          `[Webhooks]: Process webhook ${topic} (ID: ${webhookId}) for ${shop}.Sub.status: ${app_subscription.status} `,
        );

        const session = await loadOfflineSession({ shop });

        if (!session) {
          return;
        }

        await ensureCurrentBilling(session);
      } catch (error) {
        console.log(
          `[Webhooks]: Failed to update billing metafield for ${shop} (ID: ${webhookId})`,
          error,
        );
      }
    },
  },
  CUSTOMERS_DATA_REQUEST: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: shopify.config.webhooks.path,
    callback: async (topic, shop, body, webhookId, apiVersion) => {
      const payload = JSON.parse(body);
    },
  },
  CUSTOMERS_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: shopify.config.webhooks.path,
    callback: async (topic, shop, body) => {
      const payload = JSON.parse(body);
    },
  },
  SHOP_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: shopify.config.webhooks.path,
    callback: async (topic, shop, body, webhookId, apiVersion) => {
      const payload = JSON.parse(body);
    },
  },
};
