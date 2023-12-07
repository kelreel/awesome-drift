import { useQuery } from "@tanstack/react-query";

import { useApi } from "./useApi";

type ShopifyThemeBrief = {
  admin_graphql_api_id: string;
  created_ad: string;
  id: number;
  name: string;
  previewable: boolean;
  processing: boolean;
  role: "main" | "unpublished" | "development" | string;
  theme_store_id: number;
  updated_at: string;
};

type AppBlocksInfo = {
  count: number;
  disabledCount: number;
  isInstalled: boolean;
};

type ThemeCheckResponse = {
  theme: ShopifyThemeBrief;
  supportsAppBlocks: boolean;
  supportsSections: boolean;
  appBlocks: AppBlocksInfo;
  appBlockId: string;
};

export const useThemeData = () => {
  const api = useApi();

  return useQuery(
    ["theme-info"],
    async () => api.get("shopify-theme/check").json<ThemeCheckResponse>(),
    { refetchOnWindowFocus: true },
  );
};
