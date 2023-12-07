import { BillingPlan, BillingPlans } from "@blinks/shared";
import {
  BillingInterval,
  BillingReplacementBehavior,
  LATEST_API_VERSION,
  LogSeverity,
} from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-07";
import { shopifyApp } from "@shopify/shopify-app-express";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";

import { CONFIG } from "./config";
import { prisma } from "./prisma";

const storage = new PrismaSessionStorage(prisma, {
  tableName: CONFIG.SESSION_TABLE_NAME,
});

export const SESSION_TABLE_NAME = "shopify_sessions";

export const shopify = shopifyApp({
  api: {
    restResources,
    apiKey: CONFIG.SHOPIFY_API_KEY,
    apiSecretKey: CONFIG.SHOPIFY_API_SECRET,
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: true,
    logger: {
      level: LogSeverity.Info,
      httpRequests: false,
    },
    billing: {
      [BillingPlan.Pro]: {
        interval: BillingInterval.Every30Days,
        amount: BillingPlans.Pro.price,
        currencyCode: "USD",
        replacementBehavior: BillingReplacementBehavior.ApplyImmediately,
        trialDays: 7,
      },
    },
  },
  webhooks: {
    path: "/api/webhooks",
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  sessionStorage: storage,
  useOnlineTokens: true,
});
