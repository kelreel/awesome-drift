import { useMemo } from "preact/hooks";

import { useWidgetSettings } from "../providers/SettingsProvider";
import {
  getButtonStyles,
  mapSettingsToStyles,
} from "../utils/mapSettingsToStyles";
import baseStyle from "./styles.scss?inline";

export const Style = () => {
  const { settings } = useWidgetSettings();
  const configStyle = useMemo(() => mapSettingsToStyles(settings), [settings]);
  const buttonStyles = settings.buttons.map(getButtonStyles).join("\n");

  return (
    <>
      <style>{configStyle}</style>
      <style>{buttonStyles}</style>
      <style>{baseStyle}</style>
      <style>{settings.userCss}</style>
    </>
  );
};
