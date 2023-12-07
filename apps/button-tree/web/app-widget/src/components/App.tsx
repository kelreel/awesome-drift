import { WidgetBootstrap } from "@blinks/shared";

import { DataProvider } from "../providers/DataProvider";
import { WidgetProvider } from "../providers/SettingsProvider";
import { StorefrontGqlProvider } from "../providers/StorefrontGqlProvider";
import { Widget } from "./Widget";

interface Props {
  bootstrap?: WidgetBootstrap;
}

export const App = ({ bootstrap }: Props) => (
  <WidgetProvider bootstrap={bootstrap}>
    <StorefrontGqlProvider>
      <DataProvider bootstrap={bootstrap}>
        <Widget />
      </DataProvider>
    </StorefrontGqlProvider>
  </WidgetProvider>
);
