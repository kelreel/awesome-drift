import {
  ButtonConfig,
  IconPresetVariant,
  WIDGET_DEFAULT_BUTTON_SETTINGS,
} from "@blinks/shared";

export type ButtonPreset = "custom" | "amazon" | "ebay" | "etsy";

const btn = WIDGET_DEFAULT_BUTTON_SETTINGS;

export const getPreset = (preset: ButtonPreset): Omit<ButtonConfig, "id"> => {
  switch (preset) {
    case "amazon":
      return {
        ...btn,
        data: {
          ...btn.data,
          label: { ...btn.data.label, static: "Buy on Amazon" },
        },
        icon: { ...btn.icon, type: "preset", variant: "amazon" },
      };
    case "ebay":
      return {
        ...btn,
        data: {
          ...btn.data,
          label: { ...btn.data.label, static: "Buy on Ebay" },
        },
        icon: { ...btn.icon, type: "preset", variant: "ebay" },
      };

    default:
      return btn;
  }
};
