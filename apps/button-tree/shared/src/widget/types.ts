import { BillingPlan } from "../billing";
import { ButtonConfig } from "./button-config";

export enum WidgetPlatform {
  Shopify = "Shopify",
  Demo = "Demo",
}

export type Align = "full" | "left" | "center" | "right";

export type HideElementCondition =
  | "disable"
  | "one_btn_has_data"
  | "all_btn_has_data"
  | "always";

export type HideElementRule = {
  condition: HideElementCondition;
  selector: string;
};

export interface WidgetBootstrap {
  platform: WidgetPlatform;
  settings: string | WidgetSettings; // metafield raw string
  plan?: BillingPlan;
  productId?: string;
  variantId?: string;
  widgetId?: string;
  editButtonId?: string;
  onButtonEdit?: (id: string) => void;
}

export interface WidgetPadding {
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
}

export interface WidgetSettings {
  buttons: ButtonConfig[];
  block: {
    maxWidth: string;
    fontFamily: string;
    margin: WidgetPadding | null;
    padding: WidgetPadding | null;
    background: string;
    borderRadius: string;
    direction: "column" | "row";
    gap: string;
  };
  title: {
    show: boolean;
    value: string;
    inheritStyle: boolean;
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    color: string;
    margin: WidgetPadding | null;
    align: Align;
  };
  list: {
    align: Align;
    gap: string;
  };
  hideElements: {
    enable: boolean;
    rules: HideElementRule[];
  };
  userCss: string;
}
