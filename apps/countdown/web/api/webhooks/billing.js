// @ts-check
import { DeliveryMethod } from "@shopify/shopify-api";
import { setBillingMetafield } from "../metafields/billingMetafield.js";
import { loadOfflineSession } from "../utils/load-offline-session.js";
import { hasSubscription } from "../billing/subscription.js";
import { BILLING_BASE_PLAN } from "../billing/constants.js";

/**
 * @type {{[key: string]: import("@shopify/shopify-api").WebhookHandler}}
 */
export const BillingWebhookHandlers = {
    APP_SUBSCRIPTIONS_UPDATE: {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: "/api/webhooks",
        callback: async (topic, shop, body, webhookId) => {
            try {
                const payload = JSON.parse(body);
                const { app_subscription } = payload;

                console.log(`[Webhooks]: Process webhook ${topic} (ID: ${webhookId}) for ${shop}.Sub.status: ${app_subscription.status} `)

                const session = await loadOfflineSession(shop);
                const hasPayment = await hasSubscription(session);
                await setBillingMetafield(session, hasPayment ? BILLING_BASE_PLAN : "null", "webhook")

            } catch (error) {
                console.log(`[Webhooks]: Failed to update billing metafield for ${shop} (ID: ${webhookId})`, error)
            }
        }
    },
};
