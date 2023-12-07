import { BillingPlan } from "@blinks/shared";

import { METAFIELD_KEY, METAFIELD_NAMESPACE } from "../../constants";
import { setAppMetafield } from "../metafield";

export const setBillingMetafield = async (session, plan: BillingPlan) => {
  return setAppMetafield(
    session,
    METAFIELD_NAMESPACE.billing,
    METAFIELD_KEY.plan,
    "single_line_text_field",
    plan,
  );
};
