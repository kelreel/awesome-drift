import { WidgetPadding } from "@blinks/shared";

export const paddingToString = (padding: WidgetPadding | null): string => {
  return `${padding?.top ?? "0"} ${padding?.right ?? "0"} ${
    padding?.bottom ?? "0"
  } ${padding?.left ?? "0"}`;
};
