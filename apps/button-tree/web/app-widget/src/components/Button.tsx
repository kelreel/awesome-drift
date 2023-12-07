import { ButtonConfig } from "@blinks/shared";

import { useDataContext } from "../providers/DataProvider";
import { useWidgetSettings } from "../providers/SettingsProvider";
import { ButtonIcon } from "./ButtonIcon";

interface Props {
  config: ButtonConfig;
}

const truncateStyle = `
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;`;

const asAbsoluteURL = (url: string, base = location) => {
  let absoluteURL;

  if (!url) {
    return "#";
  }

  try {
    absoluteURL = new URL(url);
  } catch {
    absoluteURL = new URL(`//${url}`, base as unknown as string);
  }

  return absoluteURL;
};

export const Button = ({ config }: Props) => {
  const { fetchedMetafields } = useDataContext();
  const {
    isDemo,
    bootstrap: { editButtonId, onButtonEdit },
  } = useWidgetSettings();

  const isEditing = isDemo && config.id === editButtonId;

  const { url, label } = config.data;

  const getLabel = () => {
    if (label.type === "static") {
      return label.static;
    }

    if (label.type === "metafield" && !!label.metafield) {
      return fetchedMetafields.get(
        `${label.metafield.namespace}.${label.metafield.key}`,
      )?.value as string;
    }
  };

  const getUrl = () => {
    if (url.type === "static") {
      return asAbsoluteURL(url.static);
    }

    if (url.type === "metafield" && !!url.metafield) {
      return asAbsoluteURL(
        fetchedMetafields.get(`${url.metafield.namespace}.${url.metafield.key}`)
          ?.value as string,
      );
    }
  };

  if (!isDemo && !getUrl()) {
    return null;
  }

  return (
    <a
      className={`blinks-app__btn blinks-app__btn_${config.id} ${
        isEditing ? "blinks-app__btn--editing" : ""
      }`}
      target={config.settings.targetBlank ? "_blank" : "_self"}
      onClick={(e) => {
        if (isDemo) {
          e.preventDefault();
          onButtonEdit?.(config.id);
        }
      }}
      href={getUrl()?.toString()}
    >
      <ButtonIcon config={config} />
      {config.enabled && !!getLabel() && (
        <span
          className="blinks-app__btn-link-text"
          {...(config.appearance.truncate && { style: truncateStyle })}
        >
          {config.appearance.capitalize
            ? getLabel()?.toUpperCase()
            : getLabel()}
        </span>
      )}
    </a>
  );
};
