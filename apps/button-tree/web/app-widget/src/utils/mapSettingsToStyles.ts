import { ButtonConfig, WidgetSettings } from "@blinks/shared";

export const mapSettingsToStyles = (settings: WidgetSettings): string => {
  const { block, title } = settings;

  const inheritTitleStyle = title.inheritStyle;

  return `
    .blinks-app-block {
      --blinks-root-max-width: ${block.maxWidth};
      --blinks-root-font-family: ${block.fontFamily};
      --blinks-root-bg: ${block.background};
      --blinks-root-border-radius: ${block.borderRadius};

      --blinks-title-align: ${title.align};
      --blinks-title-font-size: ${
        inheritTitleStyle ? "inherit" : title.fontSize
      };
      --blinks-title-font-family: ${
        inheritTitleStyle ? "inherit" : title.fontSize
      };
      --blinks-title-font-weight: ${
        inheritTitleStyle ? "inherit" : title.fontWeight
      };
      --blinks-title-color: ${inheritTitleStyle ? "inherit" : title.color};


      --blinks-list-direction: ${block.direction};
      --blinks-list-wrap: ${block.direction === "column" ? "nowrap" : "wrap"};
      --blinks-list-gap: ${block.gap};
    }
  `;
};

export const getButtonStyles = (config: ButtonConfig): string => {
  const { appearance, icon } = config;

  return `
    .blinks-app__btn_${config.id} {
      --blinks-btn-height: ${appearance.height};
      --blinks-btn-content-align: ${appearance.align};

      --blinks-btn-padding-x: ${appearance.paddingX};
      --blinks-btn-padding-y: ${appearance.paddingY};

      --blinks-btn-font-family: inherit;
      --blinks-btn-font-size: ${appearance.fontSize};
      --blinks-btn-font-weight: ${appearance.fontWeight};

      --blinks-btn-color: ${appearance.color};
      --blinks-btn-color-hover: ${appearance.hoverColor};
      --blinks-btn-bg: ${appearance.background};
      --blinks-btn-bg-hover: ${appearance.backgroundHover};

      --blinks-btn-border-width: ${appearance.borderWidth};
      --blinks-btn-border-color: ${appearance.borderColor};
      --blinks-btn-border-radius: ${appearance.borderRadius};

      --blinks-btn-icon-gap: ${icon.gap};
      --blinks-btn-icon-size: ${icon.size};
    }
  `;
};
