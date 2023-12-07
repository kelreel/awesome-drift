import { WidgetSettings } from "@blinks/shared";
import {
  BlockStack,
  Checkbox,
  Divider,
  FormLayout,
  RadioButton,
  RangeSlider,
  Text,
} from "@shopify/polaris";
import React from "react";
import styled from "styled-components";

import { ColorInput, PaddingEditor, StyleSizeInput } from "../index";

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
`;

interface Props {
  settings: WidgetSettings;
  onChange: (value: WidgetSettings) => void;
}

export const BlockSettings = ({ settings, onChange }: Props): JSX.Element => {
  const { block } = settings;
  const handleChange = (data: Partial<WidgetSettings["block"]>) => {
    onChange({ ...settings, block: { ...block, ...data } });
  };

  return (
    <FormLayout>
      <BlockStack gap="300">
        {/* MaxWidth */}
        <div style={{ width: "230px" }}>
          <StyleSizeInput
            label="Max width"
            value={block.maxWidth}
            onChange={(value) => handleChange({ maxWidth: value })}
          />
        </div>

        <Row>
          <RadioButton
            label="Column"
            checked={block.direction === "column"}
            onChange={() => handleChange({ direction: "column" })}
          />
          <RadioButton
            label="Row"
            checked={block.direction === "row"}
            onChange={() => handleChange({ direction: "row" })}
          />
        </Row>
        <ColorInput
          label="Background"
          color={block.background}
          onChange={(color) => handleChange({ background: color })}
        />
        <RangeSlider
          label="Border radius"
          min={0}
          max={60}
          value={parseInt(block.borderRadius)}
          suffix={block.borderRadius}
          onChange={(value) => handleChange({ borderRadius: `${value}px` })}
        />

        <RangeSlider
          label="Buttons gap"
          min={4}
          max={32}
          value={parseInt(block.gap)}
          suffix={block.gap}
          onChange={(value) => handleChange({ gap: `${value}px` })}
        />

        {/* Margin */}
        <Checkbox
          label="Default margins (outer offset)"
          checked={!block.margin}
          onChange={(value) =>
            handleChange({
              margin: value ? null : {},
            })
          }
        />
        {block.margin && (
          <PaddingEditor
            padding={block.margin}
            onChange={(margin) => handleChange({ margin })}
          />
        )}
        {/* Padding */}
        <Checkbox
          label="Default paddings (inner offset)"
          checked={!block.padding}
          onChange={(value) =>
            handleChange({
              padding: value ? null : {},
            })
          }
        />
        {block.padding && (
          <PaddingEditor
            padding={block.padding}
            onChange={(padding) => handleChange({ padding })}
          />
        )}
      </BlockStack>
    </FormLayout>
  );
};
