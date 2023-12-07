import { ButtonConfig, IconPresetVariant } from "@blinks/shared";

const PRESET_ICONS: Record<IconPresetVariant, string> = {
  amazon: "https://static.cdnlogo.com/logos/a/1/amazon-icon.svg",
  ebay: "https://static.cdnlogo.com/logos/e/96/ebay.png",
  etsy: "https://static.cdnlogo.com/logos/e/82/etsy.svg",
  star: "https://cdn0.iconfinder.com/data/icons/typicons-2/24/star-64.png",
  file: "https://cdn4.iconfinder.com/data/icons/48-bubbles/48/12.File-64.png",
  link: "https://cdn0.iconfinder.com/data/icons/evericons-16px/16/external-link-64.png",
};

interface Props {
  config: ButtonConfig;
}

export const ButtonIcon = ({ config: { icon } }: Props) => {
  if (icon.type === "disabled" || (icon.type === "url" && !icon.src)) {
    return null;
  }

  const src = icon.type === "preset" ? PRESET_ICONS[icon.variant] : icon.src!;

  return (
    <div className="blinks-app__btn-icon">
      <img src={src} />
    </div>
  );
};
