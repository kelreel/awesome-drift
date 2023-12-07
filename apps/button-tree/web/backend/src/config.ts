import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  debug: true,
  path: path.join(process.cwd(), "..", ".env"),
});

export const CONFIG = {
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
  POSTGRES_URL: process.env.POSTGRES_URL,
  PORT: process.env.BACKEND_PORT || process.env.PORT || 3401,
  BILLING_TEST: process.env.BILLING_TEST === "true",
  SHOPIFY_BLOCK_ID: process.env.SHOPIFY_BLINKS_BLOCK_ID,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME || "Session",
  ADMIN_GRAPHQL_PASSWORD: process.env.ADMIN_GRAPHQL_PASSWORD || "xxx",
};
