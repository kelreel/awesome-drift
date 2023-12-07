import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
    PG: process.env.POSTGRES_URL,
    PORT: process.env.BACKEND_PORT || process.env.PORT || 3000,
    BILLING_TEST: process.env.BILLING_TEST === 'true',
    SHOPIFY_TIMER_BLOCK_ID: process.env.SHOPIFY_TIMER_BLOCK_ID,
    SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME || 'shopify_sessions',
    SESSION_MIGRATION_TABLE_NAME: process.env.SESSION_MIGRATION_TABLE_NAME || 'shopify_sessions_migrations'
}