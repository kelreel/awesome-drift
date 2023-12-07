import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { Button, Card, LegacyStack, Text } from "@shopify/polaris";
import { PlusMinor } from "@shopify/polaris-icons";
import React from "react";

import { useThemeData } from "../hooks/useThemeData";

export const ButtonCard = () => {
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

  return (
    <Card padding="400">
      <LegacyStack vertical>
        <Text as="h3" variant="headingMd">
          Button Link
        </Text>
        <Text as="p" variant="bodyMd">
          You can create one or more buttons with custom styles in the theme
          editor in the desired sections.
        </Text>
        <Text as="p" variant="bodyMd">
          Use "Insert dynamic source" with metafields for automatic url and
          label replacement.
        </Text>
        <LegacyStack>
          <Button
            size="large"
            icon={PlusMinor}
            onClick={() => handleAddAppBlock("button")}
            disabled={isThemeLoading}
          >
            Add to theme
          </Button>
        </LegacyStack>
      </LegacyStack>
    </Card>
  );
};
