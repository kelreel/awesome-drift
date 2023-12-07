import { NavigationMenu } from "@shopify/app-bridge-react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import {
  AppBridgeProvider,
  BillingRedirectProvider,
  PolarisProvider,
  QueryProvider,
  // ApolloProvider,
} from "./providers";
import Routes from "./Routes";

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
            {/* <ApolloProvider> */}
            <BillingRedirectProvider>
              <NavigationMenu
                navigationLinks={
                  [
                    // {
                    //   label: "Link list appearance",
                    //   destination: "/appearance",
                    // },
                    // {
                    //   label: "Billing",
                    //   destination: "/billing",
                    // },
                  ]
                }
              />
              {/* @ts-ignore */}
              <Routes pages={pages} />
            </BillingRedirectProvider>
            {/* </ApolloProvider> */}
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
