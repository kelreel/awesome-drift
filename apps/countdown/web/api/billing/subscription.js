// @ts-check
import { CONFIG } from '../config.js';
import { shopify } from '../shopify.js'
import { checkDevStore } from '../utils/check-dev-store.js';
import { BILLING_BASE_PLAN } from './constants.js';

// use with offline sessions
export const hasSubscription = async (session) => {
    const { activeSubscriptions } = await shopify.api.billing.subscriptions({
        session,
    });
    return activeSubscriptions.some(
        (sub) => sub.name === BILLING_BASE_PLAN,
    );
}

// use with offline sessions
export const createSubscription = async (session) => {
    const isDevStore = await checkDevStore(session);
    const chargeUrl = await shopify.api.billing.request({ session, plan: BILLING_BASE_PLAN, isTest: isDevStore || CONFIG.BILLING_TEST, });
    console.log(`[Billing]: create App Subscription for ${session.shop}, isDevStore: ${isDevStore}`);

    return chargeUrl
}