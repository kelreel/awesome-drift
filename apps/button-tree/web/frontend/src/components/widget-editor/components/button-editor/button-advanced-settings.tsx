import { ButtonConfig } from "@blinks/shared";
import { BlockStack, Checkbox, Text } from "@shopify/polaris";
import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 12px;
  width: 100%;
`;

interface Props {
  config: ButtonConfig;
  onChange: (config: ButtonConfig) => void;
}

export const ButtonAdvancedSettings = ({
  config,
  onChange,
}: Props): JSX.Element => {
  const handleChange = (data: Partial<ButtonConfig["settings"]>) =>
    onChange({ ...config, icon: { ...config.icon, ...data } });

  const { settings } = config;

  return (
    <BlockStack gap="400">
      <Text as="h6" variant="headingSm">
        Advanced settings
      </Text>
      <Grid>
        <Checkbox
          label="Open in new tab"
          checked={settings.targetBlank}
          onChange={(value) => handleChange({ targetBlank: !value })}
        />
      </Grid>
    </BlockStack>
  );
};
