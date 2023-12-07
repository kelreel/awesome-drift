import { WIDGET_DEFAULT_SETTINGS, WidgetSettings } from "@blinks/shared";
import { Session } from "@shopify/shopify-api";

import { METAFIELD_KEY, METAFIELD_NAMESPACE } from "../../constants";
import { getAppMetafield } from "../metafield";
import {
  AppMetafieldResult,
  setAppMetafield,
} from "../metafield/app-metafield";

// This fn not re-write existed metafield value
export const initWidgetSettingsMetafield = async (
  session: Session,
): Promise<AppMetafieldResult> => {
  const metafield = await getAppMetafield(
    session,
    METAFIELD_NAMESPACE.widget,
    METAFIELD_KEY.settings,
  );

  if (!metafield) {
    return await setWidgetSettingsMetafield(session, WIDGET_DEFAULT_SETTINGS);
  }

  return metafield;
};

export const setWidgetSettingsMetafield = async (
  session: Session,
  data: WidgetSettings,
) => {
  return setAppMetafield(
    session,
    METAFIELD_NAMESPACE.widget,
    METAFIELD_KEY.settings,
    "json",
    JSON.stringify(data),
  );
};
