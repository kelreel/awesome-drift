import { ButtonConfig } from "./button-config";
import { WidgetSettings } from "./types";

export const WIDGET_DEFAULT_SETTINGS: WidgetSettings = {
  buttons: [],
  block: {
    maxWidth: "100%",
    fontFamily: "inherit",
    gap: "8px",
    direction: "column",
    background: "transparent",
    borderRadius: "0px",
    margin: null,
    padding: null,
  },
  title: {
    show: true,
    align: "left",
    inheritStyle: true,
    value: "Title",
    color: "#000000",
    fontFamily: "inherit",
    fontSize: "18px",
    fontWeight: "500",
    margin: {
      bottom: "12px",
    },
  },
  list: {
    align: "full",
    gap: "12px",
  },
  hideElements: {
    enable: false,
    rules: [],
  },
  userCss: "",
};

export const WIDGET_DEFAULT_BUTTON_SETTINGS: Omit<ButtonConfig, "id"> = {
  enabled: true,
  data: {
    label: { type: "static", metafield: null, static: "Button label" },
    url: { type: "static", metafield: null, static: "" },
  },
  settings: {
    hideDesktop: false,
    hideMobile: false,
    breakpoint: "728px",
    showIfNoData: false,
    targetBlank: true,
    updateOnVariantChange: false,
  },
  appearance: {
    className: "",
    animation: "none",
    color: "#270000",
    hoverColor: "#3E3E3E",
    background: "#DDDDDD",
    backgroundHover: "#DDDDDD",
    borderRadius: "12px",
    borderWidth: "2px",
    borderColor: "#01000C",
    align: "center",
    fontSize: "14px",
    fontWeight: "500",
    height: "40px",
    paddingX: "12px",
    paddingY: "0",
    truncate: true,
    capitalize: false,
  },
  icon: {
    type: "disabled",
    size: "20px",
    gap: "12px",
    src: null,
    variant: "star",
  },
};
