export enum BillingPlan {
  Free = "Free",
  Pro = "Pro",
}

export interface IBillingPlanDetails {
  plan: BillingPlan;
  price: number;
  params: any;
}

export const BillingPlans: Record<BillingPlan, IBillingPlanDetails> = {
  [BillingPlan.Free]: {
    plan: BillingPlan.Free,
    price: 0,
    params: null,
  },
  [BillingPlan.Pro]: {
    plan: BillingPlan.Pro,
    price: 6.99,
    params: null,
  },
};
