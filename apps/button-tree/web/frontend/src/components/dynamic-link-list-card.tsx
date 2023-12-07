import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { Button, Card, LegacyStack, Text } from "@shopify/polaris";
import { EditMajor, SettingsMinor } from "@shopify/polaris-icons";
import { PlusMinor } from "@shopify/polaris-icons";
import React from "react";

import { useShopData } from "../hooks";
import { useThemeData } from "../hooks/useThemeData";

export const DynamicLinkListCard = () => {
  const { data } = useShopData();

  const { hostOrigin } = useAppBridge();

  const { data: themeData, isLoading: isThemeLoading } = useThemeData();

  const navigate = useNavigate();

  const handleAddAppBlock = (handle: string) => {
    navigate(
      `${hostOrigin}/admin/themes/current/editor?template=product&addAppBlockId=${themeData?.appBlockId}/${handle}&target=mainSection`,
      {
        target: "new",
      },
    );
  };

  const handleEdit = () => {
    if (data) {
      const shop = data.shop.shop.split(".")[0] ?? "";

      window.open(
        encodeURI(
          `https://admin.shopify.com/store/${shop}/bulk?resource_name=Product&edit=status,metafields.xp_links_buttons.urls,metafields.xp_links_buttons.labels`,
        ),
        "_blank",
      );
    }
  };

  return (
    <Card padding="400">
      <LegacyStack vertical>
        <Text as="h3" variant="headingMd">
          Dynamic link list
        </Text>
        <Text as="p" variant="bodyMd">
          Open product editor to add links and labels via metafields.
        </Text>
        <Text as="p" variant="bodyMd">
          You can set multiple urls <i>(blinks-url)</i> and labels{" "}
          <i>(blinks-labels)</i> for one product to display multiple links on
          the product page.
        </Text>
        <LegacyStack>
          <Button
            variant="primary"
            size="large"
            icon={EditMajor}
            onClick={handleEdit}
          >
            Bulk edit links & labels
          </Button>

          <Button
            onClick={() => handleAddAppBlock("blinks")}
            url="/appearance"
            size="large"
            icon={SettingsMinor}
          >
            Setup appearance
          </Button>
          <Button
            onClick={() => handleAddAppBlock("blinks")}
            disabled={isThemeLoading}
            size="large"
            icon={PlusMinor}
          >
            Add to theme
          </Button>
        </LegacyStack>
      </LegacyStack>
    </Card>
  );
};
