import { BillingPlan } from "@blinks/shared";
import { Session } from "@shopify/shopify-api";

import { CONFIG } from "../../config";
import { checkDevStore } from "../../helpers/check-dev-store";
import { shopify } from "../../shopify";

export const createSubscription = async (session: Session): Promise<string> => {
  const isDevStore = await checkDevStore(session);
  const chargeUrl = await shopify.api.billing.request({
    session,
    plan: BillingPlan.Pro,
    isTest: isDevStore || CONFIG.BILLING_TEST,
  });
  console.log(
    `[Billing]: create "${BillingPlan.Pro}" App Subscription for ${session.shop}, isDevStore: ${isDevStore}`,
  );

  return chargeUrl;
};
