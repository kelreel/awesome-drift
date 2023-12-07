import { useNavigate, useToast } from "@shopify/app-bridge-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { useApi } from "./useApi";

export const useBilling = () => {
  const api = useApi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { show } = useToast();

  const { mutate: createAppSubscription, isLoading: applyProPlanLoading } =
    useMutation({
      mutationFn: (plan: "Pro") =>
        api
          .post("shop/create-app-subscription", { json: { plan } })
          .json<{ confirmationUrl: string }>(),
      onSuccess: (data) => {
        navigate(data.confirmationUrl);
        show("Redirecting...", { duration: 30_000 });
      },
    });

  const { mutate: cancelAppSubscription, isLoading: applyFreePlanLoading } =
    useMutation({
      mutationFn: () => api.post("shop/cancel-app-subscription").json(),
      onSuccess: () => {
        show(
          "Success. You will receive App Credits for the unused portion of the subscription.",
          { duration: 30_000 },
        );
        queryClient.invalidateQueries(["shop-profile"]);
      },
    });

  const applyProPlan = useCallback(
    () => createAppSubscription("Pro"),
    [createAppSubscription],
  );

  return {
    applyFreePlanLoading,
    applyProPlanLoading,
    applyFreePlan: cancelAppSubscription,
    applyProPlan,
  };
};
