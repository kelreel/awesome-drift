import { Prisma } from "@prisma/client";
import { Session } from "@shopify/shopify-api";

import { prisma } from "../../prisma";
import { setBillingMetafield } from "./billing-metafield";
import { getBillingData } from "./get-billing-data";

// use with offline sessions
export const ensureCurrentBilling = async (
  session: Session,
): Promise<{ hasPayment: boolean }> => {
  try {
    const { plan, details, subscription, hasPayment } =
      await getBillingData(session);

    await setBillingMetafield(session, plan);
    console.log(
      `[Ensure-Billing]: Set billing metafield "${plan}" for ${session.shop}`,
    );

    await prisma.shop.update({
      where: { shop: session.shop },
      data: {
        billing: {
          hasPayment,
          details,
          subscription,
        } as unknown as Prisma.InputJsonValue,
      },
    });

    return { hasPayment };
  } catch (e) {
    console.log(`[Ensure-Billing]: flow error`, e);
    return { hasPayment: false };
  }
};
