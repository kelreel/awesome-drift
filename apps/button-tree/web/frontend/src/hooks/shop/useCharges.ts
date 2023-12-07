import { useQuery } from "@tanstack/react-query";

import { useApi } from "../useApi";

export const useCharges = () => {
  const api = useApi();

  return useQuery<any>(["charges"], async () =>
    api.get(`shop/charges`).json<any>(),
  );
};
