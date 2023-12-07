//@ts-check
import { BillingInterval, BillingReplacementBehavior, LATEST_API_VERSION, LogSeverity } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-07";
import { PostgreSQLSessionStorage } from '@shopify/shopify-app-session-storage-postgresql';
import { CONFIG } from "./config.js";
import { BILLING_BASE_PLAN } from "./billing/constants.js";

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
const billingConfig = {
  [BILLING_BASE_PLAN]: {
    amount: 7,
    currencyCode: "USD",
    replacementBehavior: BillingReplacementBehavior.ApplyImmediately,
    interval: BillingInterval.Every30Days,
    trialDays: 7,
  },
};

export const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: billingConfig,
    logger: {
      level: process.env.NODE_ENV === "production" ? LogSeverity.Error : LogSeverity.Info,
      // httpRequests: true,
    }
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  useOnlineTokens: true,
  webhooks: {
    path: "/api/webhooks",
  },
  sessionStorage: new PostgreSQLSessionStorage(new URL(CONFIG.PG), { sessionTableName: CONFIG.SESSION_TABLE_NAME, migratorOptions: { migrationDBIdentifier: CONFIG.SESSION_MIGRATION_TABLE_NAME } }),
});