import { BillingPlan, BillingPlans, IBillingPlanDetails } from "@blinks/shared";
import { Session } from "@shopify/shopify-api";

import { shopify } from "../../shopify";

interface BillingData {
  details: IBillingPlanDetails;
  plan: BillingPlan;
  hasPayment: boolean;
  subscription: {
    id: string;
    name: string;
    test: boolean;
  } | null;
}

export const getBillingData = async (
  session: Session,
): Promise<BillingData> => {
  const { activeSubscriptions } = await shopify.api.billing.subscriptions({
    session,
  });
  const hasActive = activeSubscriptions.length > 0;

  return {
    hasPayment: hasActive,
    plan: hasActive ? BillingPlan.Pro : BillingPlan.Free,
    subscription: hasActive ? activeSubscriptions[0] : null,
    details: hasActive
      ? BillingPlans[BillingPlan.Pro]
      : BillingPlans[BillingPlan.Free],
  };
};
