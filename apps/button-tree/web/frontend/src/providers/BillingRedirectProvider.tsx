import React, { ReactNode, useEffect } from "react";

import { useBilling, useShopData } from "../hooks";

type Props = {
  children: ReactNode;
};

export const BillingRedirectProvider = ({ children }: Props) => {
  const { data } = useShopData();

  const { applyProPlan } = useBilling();

  useEffect(() => {
    if (data && !data.hasSubscription) {
      console.log(data);

      applyProPlan();
    }
  }, [applyProPlan, data]);

  return <>{children}</>;
};
