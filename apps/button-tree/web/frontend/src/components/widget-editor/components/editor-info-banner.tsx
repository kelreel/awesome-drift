import { Banner, BlockStack, Text } from "@shopify/polaris";
import React, { useState } from "react";

export const EditorInfoBanner = () => {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <Banner
      title="Styles inheritance"
      tone="info"
      onDismiss={() => setShow(false)}
    >
      <BlockStack>
        <Text as="p" variant="bodyMd">
          Block inherit the styles of your theme (sizes, margins, colors, etc.).
          The preview does not display the final view on the page in your store.
        </Text>
        <Text as="p" variant="bodyMd">
          Please check appearance in the Online Store after saving.
        </Text>
      </BlockStack>
    </Banner>
  );
};
