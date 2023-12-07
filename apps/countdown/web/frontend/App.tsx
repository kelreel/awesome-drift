import React from 'react';
import { BrowserRouter } from "react-router-dom";
// import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
  ShopDataProvider
} from "./components/providers";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  // @ts-ignore
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <ShopDataProvider>
              {/* <NavigationMenu
                navigationLinks={[
                  {
                    label: "Blocks",
                    destination: "/block",
                  },
                  {
                    label: "Banners",
                    destination: "/banner",
                  },
                ]}
              /> */}
              <Routes pages={pages} />
            </ShopDataProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
