export type WidgetButtonPreset = "default" | "amazon" | "ebay" | "etsy";

export type IconPresetVariant =
  | "amazon"
  | "ebay"
  | "etsy"
  | "star"
  | "link"
  | "file";

export type Animation = "none" | "shake";

export type IconType = "disabled" | "preset" | "url";

export type MetafieldOwnerType = "PRODUCT" | "PRODUCTVARIANT";

export type ButtonDataSourceType = "static" | "metafield";

export type MetafieldValueType =
  | "json"
  | "url"
  | "single_line_text_field"
  | "list.url"
  | "list.single_line_text_field";

export type ButtonDataSourceMetafield = {
  ownerType: MetafieldOwnerType;
  namespace: string;
  key: string;
  id: string;
};

export type ButtonDataSource = {
  type: ButtonDataSourceType;
  static: string;
  metafield: ButtonDataSourceMetafield | null;
};

export interface ButtonConfig {
  id: string;
  enabled: boolean; // show/hide globally setting
  data: {
    label: ButtonDataSource;
    url: ButtonDataSource;
  };
  appearance: {
    className: string;
    align: string;
    color: string;
    hoverColor: string;
    background: string;
    backgroundHover: string;
    truncate: boolean;
    capitalize: boolean;
    animation: Animation;
    borderWidth: string;
    borderColor: string;
    borderRadius: string;
    height: string;
    fontSize: string;
    fontWeight: string;
    paddingX: string;
    paddingY: string;
  };
  settings: {
    targetBlank: boolean;
    breakpoint: string;
    showIfNoData: boolean;
    hideMobile: boolean;
    hideDesktop: boolean;
    updateOnVariantChange: boolean;
  };
  icon: {
    type: IconType;
    variant: IconPresetVariant;
    src: string | null;
    size: string;
    gap: string;
  };
}
