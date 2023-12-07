import {
  Banner,
  LegacyCard,
  SkeletonBodyText,
  SkeletonDisplayText,
  Text,
} from "@shopify/polaris";
import React from "react";

import { useShopData } from "../hooks";
import { useThemeData } from "../hooks/useThemeData";

export const AppBlockBanner = () => {
  const { data: themeData, isLoading: isThemeLoading } = useThemeData();
  const { data: shopData } = useShopData();

  if (isThemeLoading) {
    return (
      <LegacyCard sectioned>
        <div
          style={{
            display: "flex",
            flexFlow: "column nowrap",
            gap: "16px",
          }}
        >
          <SkeletonDisplayText size="medium" />
          <div>
            <SkeletonBodyText lines={3} />
          </div>
        </div>
      </LegacyCard>
    );
  }

  const openThemeEditor = () => {
    const shop = shopData?.shop.shop.split(".")[0] ?? "";
    const url = `https://admin.shopify.com/store/${shop}/themes/current/editor?template="product"`;
    window.open(url, "_blank");
  };

  if (!themeData) {
    return null;
  }

  const isInstalled = themeData.appBlocks.isInstalled;

  return (
    <Banner
      title={
        isInstalled
          ? `Some widgets has been successfully installed to active theme`
          : `Widgets is not added to active theme`
      }
      tone={isInstalled ? "success" : "info"}
      action={{
        content: "Open theme editor",
        onAction: () => {
          openThemeEditor();
        },
      }}
    >
      <Text as="p" variant="bodyMd">
        You can add multiple blocks to different sections and templates.
      </Text>
      <Text as="p" variant="bodyMd">
        When installing, specify the widget ID from the list above in the Widget
        ID field.
      </Text>
    </Banner>
  );
};
