import { ButtonConfig } from "@blinks/shared";
import { Banner, BlockStack, Card, Text } from "@shopify/polaris";
import React from "react";

import { DataSource } from "./data-source";

interface Props {
  config: ButtonConfig;
  onChange: (config: ButtonConfig) => void;
}

export const ButtonData = ({ config, onChange }: Props): JSX.Element => {
  const handleChange = (data: Partial<ButtonConfig["data"]>) =>
    onChange({ ...config, data: { ...config.data, ...data } });

  const url = config.data.url;
  const hasWarn = url.type === "static" ? !url.static : !url.metafield;

  return (
    <>
      <BlockStack gap="300">
        <Text as="h6" variant="headingSm">
          Button label
        </Text>
        <DataSource
          value={config.data.label}
          onChange={(label) => handleChange({ label })}
          placeholder="Button label"
        />
      </BlockStack>
      <BlockStack gap="300">
        <Text as="h6" variant="headingSm">
          Button URL
        </Text>
        <DataSource
          value={config.data.url}
          onChange={(url) => handleChange({ url })}
          placeholder="https://example.com"
          type="url"
        />
        <BlockStack>
          {hasWarn && (
            <Card padding="0">
              <Banner tone="critical">
                <p>This button will be always hidden. URL value is required.</p>
              </Banner>
            </Card>
          )}
          {config.data.url.type === "metafield" && (
            <Banner tone="info">
              <p>
                The button will be hidden for the product if the metafield value
                for this product is empty. This also helps to apply different
                URLs for different products.
              </p>
            </Banner>
          )}
        </BlockStack>
      </BlockStack>
    </>
  );
};
