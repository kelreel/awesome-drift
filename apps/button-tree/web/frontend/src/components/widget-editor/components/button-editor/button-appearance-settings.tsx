import { ButtonConfig } from "@blinks/shared";
import { BlockStack, Checkbox, RangeSlider, Text } from "@shopify/polaris";
import React from "react";
import styled from "styled-components";

import { AlignInput, ColorInput } from "../controls";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 12px;
  width: 100%;
`;

const $ColorInput = styled(ColorInput)`
  flex: 1;
`;

const Spacer = styled.div`
  height: 0px;
`;

interface Props {
  config: ButtonConfig;
  onChange: (config: ButtonConfig) => void;
}

export const ButtonAppearanceSettings = ({
  config,
  onChange,
}: Props): JSX.Element => {
  const handleChange = (data: Partial<ButtonConfig["appearance"]>) =>
    onChange({ ...config, appearance: { ...config.appearance, ...data } });

  const { appearance } = config;

  return (
    <BlockStack gap="400">
      <Text as="h6" variant="headingSm">
        Button appearance
      </Text>

      <BlockStack gap="200">
        <Text as="h6" variant="bodySm">
          Alignment
        </Text>
        <AlignInput
          align={appearance.align}
          onChange={(align) => handleChange({ align })}
        />
      </BlockStack>
      <Spacer />
      <RangeSlider
        label="Button base height"
        min={8}
        max={120}
        value={parseInt(appearance.height)}
        suffix={appearance.height}
        onChange={(value) => handleChange({ height: `${value}px` })}
      />
      <RangeSlider
        label="Font size"
        min={8}
        max={72}
        value={parseInt(appearance.fontSize)}
        suffix={appearance.fontSize}
        onChange={(value) => handleChange({ fontSize: `${value}px` })}
      />
      <RangeSlider
        label="Border size"
        min={0}
        max={12}
        value={parseInt(appearance.borderWidth)}
        suffix={appearance.borderWidth}
        onChange={(value) => handleChange({ borderWidth: `${value}px` })}
      />
      <RangeSlider
        label="Border radius"
        min={0}
        max={60}
        value={parseInt(appearance.borderRadius)}
        suffix={appearance.borderRadius}
        onChange={(value) => handleChange({ borderRadius: `${value}px` })}
      />
      <RangeSlider
        label="Font weight"
        min={300}
        max={900}
        step={100}
        value={parseInt(appearance.fontWeight)}
        suffix={appearance.fontWeight}
        onChange={(value) => handleChange({ fontWeight: value.toString() })}
      />
      <Spacer />
      <RangeSlider
        label="Horizontal padding"
        min={0}
        max={40}
        value={parseInt(appearance.paddingX)}
        suffix={appearance.paddingX}
        onChange={(value) => handleChange({ paddingX: `${value}px` })}
      />
      <RangeSlider
        label="Vertical padding"
        min={0}
        max={40}
        value={parseInt(appearance.paddingY)}
        suffix={appearance.paddingY}
        onChange={(value) => handleChange({ paddingY: `${value}px` })}
      />
      <Spacer />
      <$ColorInput
        label="Text color"
        color={appearance.color}
        onChange={(color) => handleChange({ color })}
      />
      <$ColorInput
        label="Text color on hover"
        color={appearance.hoverColor}
        onChange={(color) => handleChange({ hoverColor: color })}
      />
      <$ColorInput
        label="Background color"
        color={appearance.background}
        onChange={(color) => handleChange({ background: color })}
      />
      <$ColorInput
        label="Background on hover"
        color={appearance.backgroundHover}
        onChange={(color) => handleChange({ backgroundHover: color })}
      />
      <$ColorInput
        label="Border color"
        color={appearance.borderColor}
        onChange={(color) => handleChange({ borderColor: color })}
      />
      <Spacer />
      <Grid>
        <Checkbox
          label="Truncate long text"
          checked={appearance.truncate}
          onChange={(value) => handleChange({ truncate: value })}
        />
        <Checkbox
          label="Capitalize text"
          checked={appearance.capitalize}
          onChange={(value) => handleChange({ capitalize: value })}
        />
      </Grid>
    </BlockStack>
  );
};
