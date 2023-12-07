import { WidgetSettings } from "@blinks/shared";
import {
  BlockStack,
  Checkbox,
  Divider,
  FormLayout,
  RangeSlider,
  Text,
  TextField,
} from "@shopify/polaris";
import React from "react";

import { AlignInput } from "../controls";
import { ColorInput } from "../controls/color-input";
import { PaddingEditor } from "../controls/padding-editor";

interface EditorTitleProps {
  settings: WidgetSettings;
  onChange: (value: WidgetSettings) => void;
}

export const EditorTitle = ({
  settings,
  onChange,
}: EditorTitleProps): JSX.Element => {
  const { title } = settings;

  const inheritStyle = title.inheritStyle;

  const handleChange = (data: Partial<WidgetSettings["title"]>) => {
    onChange({ ...settings, title: { ...title, ...data } });
  };

  return (
    <FormLayout>
      <BlockStack gap="300">
        {/* Title text */}
        <TextField
          type="text"
          label="Text"
          autoComplete="off"
          maxLength={60}
          showCharacterCount
          value={title.value}
          helpText="Leave blank to hide heading"
          onChange={(value) => handleChange({ value })}
        />
        <Text as="p">Alignment</Text>
        <AlignInput
          align={title.align}
          onChange={(align) => handleChange({ align })}
        />
        <Checkbox
          label="Inherit style"
          checked={title.inheritStyle}
          onChange={(value) => handleChange({ inheritStyle: value })}
        />
        {!inheritStyle && (
          <>
            <RangeSlider
              label="Font size"
              min={8}
              max={72}
              value={parseInt(title.fontSize)}
              suffix={title.fontSize}
              onChange={(value) => handleChange({ fontSize: `${value}px` })}
            />
            <RangeSlider
              label="Font weight"
              min={300}
              max={900}
              step={100}
              value={parseInt(title.fontWeight)}
              suffix={title.fontWeight}
              onChange={(value) =>
                handleChange({ fontWeight: value.toString() })
              }
            />
            <ColorInput
              label="Title color"
              color={title.color}
              onChange={(color) => handleChange({ color })}
            />
          </>
        )}
        {/* Offset */}
        <Checkbox
          label="Default offsets"
          checked={!title.margin}
          onChange={(value) => handleChange({ margin: value ? null : {} })}
        />
        {title.margin && (
          <PaddingEditor
            padding={title.margin}
            onChange={(margin) => handleChange({ margin })}
          />
        )}
      </BlockStack>
    </FormLayout>
  );
};
