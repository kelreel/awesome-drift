import {
  SharedConfig,
  WIDGET_DEFAULT_SETTINGS,
  WidgetBootstrap,
  WidgetPlatform,
  WidgetSettings,
} from "@blinks/shared";
import { ComponentChildren, createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

interface ContextValue {
  settings: WidgetSettings;
  isDemo: boolean;
  bootstrap: Omit<WidgetBootstrap, "platform" | "settings">;
}

type Props = {
  children: ComponentChildren;
  bootstrap?: WidgetBootstrap;
};

// @ts-ignore
const WidgetSettingsContext = createContext<ContextValue>(undefined);

export const useWidgetSettings = (): ContextValue =>
  useContext(WidgetSettingsContext);

const parseSettings = (data: any): WidgetSettings => {
  if (typeof data === "object" && "block" in data) {
    return data as WidgetSettings;
  }

  try {
    const result = JSON.parse(data);
    if (typeof result === "object" && "block" in result) {
      return result as WidgetSettings;
    }
  } catch {
    // empty
  }

  return WIDGET_DEFAULT_SETTINGS;
};

export const WidgetProvider = ({ children, bootstrap }: Props) => {
  const [settings, setSettings] = useState(() =>
    parseSettings(bootstrap?.settings),
  );

  const contextValue: ContextValue = {
    settings: settings ?? WIDGET_DEFAULT_SETTINGS,
    isDemo: bootstrap?.platform === WidgetPlatform.Demo,
    bootstrap: bootstrap || ({} as WidgetBootstrap),
  };

  useEffect(() => {
    setSettings(parseSettings(bootstrap?.settings));
  }, [bootstrap]);

  useEffect(() => {
    let settings;

    try {
      if (typeof bootstrap?.settings === "string") {
        settings = JSON.parse(bootstrap.settings);
      }
    } catch (error) {
      settings = null;
    }

    // Widget logger
    if (bootstrap?.platform === WidgetPlatform.Demo) {
      console.log(SharedConfig.appName, settings);
    } else {
      const bootstrapForLog = { ...bootstrap, settings };
      console.log(SharedConfig.appName, bootstrapForLog);
    }
  }, [bootstrap]);

  return (
    <WidgetSettingsContext.Provider value={contextValue}>
      {children}
    </WidgetSettingsContext.Provider>
  );
};
