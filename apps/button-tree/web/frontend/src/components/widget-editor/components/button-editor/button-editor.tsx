import { ButtonConfig, WidgetSettings } from "@blinks/shared";
import { BlockStack } from "@shopify/polaris";
import React from "react";

import { ButtonAdvancedSettings } from "./button-advanced-settings";
import { ButtonAppearanceSettings } from "./button-appearance-settings";
import { ButtonData } from "./button-data";
import { ButtonIconSettings } from "./button-icon-settings";

interface Props {
  buttonId: string | null;
  settings: WidgetSettings;
  onChange: (settings: WidgetSettings) => void;
}

export const ButtonEditor = ({ settings, buttonId, onChange }: Props) => {
  const config = settings.buttons.find((btn) => btn.id === buttonId);

  const handleChange = (data: ButtonConfig) => {
    onChange({
      ...settings,
      buttons: settings.buttons.map((btn) =>
        btn.id === buttonId ? data : btn,
      ),
    });
  };

  if (!buttonId || !config) {
    return null;
  }

  return (
    <BlockStack gap="300">
      <ButtonData config={config} onChange={handleChange} />
      <ButtonAppearanceSettings config={config} onChange={handleChange} />
      <ButtonIconSettings config={config} onChange={handleChange} />
      <ButtonAdvancedSettings config={config} onChange={handleChange} />
    </BlockStack>
  );
};
