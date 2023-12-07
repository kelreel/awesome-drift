import { useQuery } from "@tanstack/react-query";

import { useApi } from "../useApi";

interface ShopProfileData {
  shop: {
    id: number;
    shop: string;
    installed: boolean;
    createdAt: string;
    updatedAt: string;
    data: Record<string, any>;
  };
  subscription: any;
  hasSubscription: boolean;
}

export const useShopData = () => {
  const api = useApi();
  return useQuery(["shop-profile"], async () =>
    api.get(`shop/profile`).json<ShopProfileData>(),
  );
};
