import { ButtonConfig, IconPresetVariant } from "@blinks/shared";
import {
  BlockStack,
  RadioButton,
  RangeSlider,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 12px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
`;

const ICON_VARIANTS: { label: string; value: IconPresetVariant }[] = [
  { label: "External link", value: "link" },
  { label: "File", value: "file" },
  { label: "Amazon", value: "amazon" },
  { label: "Ebay", value: "ebay" },
  { label: "Etsy", value: "etsy" },
  { label: "Star", value: "star" },
];

interface Props {
  config: ButtonConfig;
  onChange: (config: ButtonConfig) => void;
}

export const ButtonIconSettings = ({
  config,
  onChange,
}: Props): JSX.Element => {
  const handleChange = (data: Partial<ButtonConfig["icon"]>) =>
    onChange({ ...config, icon: { ...config.icon, ...data } });

  const { icon } = config;

  return (
    <BlockStack gap="400">
      <Text as="h6" variant="headingSm">
        Button Icon
      </Text>

      <Row>
        <RadioButton
          label="Disabled"
          checked={icon.type === "disabled"}
          onChange={() => handleChange({ type: "disabled" })}
        />
        <RadioButton
          label="Preset"
          checked={icon.type === "preset"}
          onChange={() => handleChange({ type: "preset" })}
        />
        <RadioButton
          label="URL"
          checked={icon.type === "url"}
          onChange={() => handleChange({ type: "url" })}
        />
      </Row>
      {icon.type === "preset" && (
        <Select
          label="Icon variant"
          options={ICON_VARIANTS}
          value={icon.variant}
          onChange={(value) =>
            handleChange({ variant: value as IconPresetVariant })
          }
        />
      )}
      {icon.type === "url" && (
        <TextField
          label="Icon URL"
          type="url"
          value={icon.src!}
          placeholder="https://my-store.com/kitty-cat.png"
          autoComplete="off"
          onChange={(value) => handleChange({ src: value })}
        />
      )}
      {icon.type !== "disabled" && (
        <>
          <RangeSlider
            label="Icon size"
            min={12}
            max={120}
            value={parseInt(icon.size)}
            suffix={icon.size}
            onChange={(value) => handleChange({ size: `${value}px` })}
          />
          <RangeSlider
            label="Icon gap"
            min={8}
            max={32}
            value={parseInt(icon.gap)}
            suffix={icon.gap}
            onChange={(value) => handleChange({ gap: `${value}px` })}
          />
        </>
      )}
    </BlockStack>
  );
};
