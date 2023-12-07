import { useDataContext } from "../providers/DataProvider";
import { useWidgetSettings } from "../providers/SettingsProvider";
import { paddingToString } from "../utils/paddingToString";
import { Button } from "./Button";
import { Style } from "./Style";

export const Widget = () => {
  const {
    settings: { block, title, buttons },
    isDemo,
  } = useWidgetSettings();

  const { isLoading, fetchedMetafields } = useDataContext();

  const hasData =
    isDemo ||
    buttons.some((btn) => {
      let hasLabel = false;
      let hasUrl = false;

      if (btn.data.label.type === "static") {
        if (btn.data.label.static) {
          hasLabel = true;
        }
      } else {
        if (
          fetchedMetafields.has(
            `${btn.data.label.metafield?.namespace}.${btn.data.label.metafield?.key}`,
          )
        ) {
          hasLabel = true;
        }
      }

      if (btn.data.url.type === "static") {
        if (btn.data.url.static) {
          hasUrl = true;
        }
      } else {
        if (
          fetchedMetafields.has(
            `${btn.data.url.metafield?.namespace}.${btn.data.url.metafield?.key}`,
          )
        ) {
          hasUrl = true;
        }
      }

      return hasUrl && hasLabel;
    });

  if (window.Shopify?.designMode && !isLoading && !hasData) {
    return (
      <div style="margin: 2px;">
        <div style="border: 2px dashed red; padding: 5px">
          Widget will be hidden for this product (No data)
        </div>
      </div>
    );
  }

  if (!hasData) {
    return null;
  }

  return (
    <>
      <Style />
      <div
        className="blinks-app-block"
        style={{
          margin: paddingToString(block.margin),
          padding: paddingToString(block.padding),
        }}
      >
        {title.show && (
          <div
            className="blinks-app__title"
            style={{ margin: paddingToString(title.margin) }}
          >
            {title.value}
          </div>
        )}
        <div className="blinks-app__list">
          {buttons.map((config) => (
            <Button config={config} key={config.id} />
          ))}
        </div>
      </div>
    </>
  );
};
