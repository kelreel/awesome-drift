import { SharedConfig, WidgetBootstrap, WidgetPlatform } from "@blinks/shared";
import { render } from "preact";

import { App } from "./components/App";

const IS_DEV = import.meta.env.DEV;

export const LIB_KEY = SharedConfig.windowRuntimeKey;

// @ts-ignore
window[LIB_KEY] = (el: HTMLElement, bootstrap?: WidgetBootstrap) => {
  render(<App bootstrap={bootstrap} />, el);
};

if (IS_DEV) {
  // @ts-ignore
  window[LIB_KEY](
    document.getElementById("app") as HTMLElement,
    { platform: WidgetPlatform.Demo } as WidgetBootstrap,
  );
}
