import "graphiql/graphiql.css";

import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import React from "react";
import { createRoot } from "react-dom/client";

const fetcher = createGraphiQLFetcher({
  url: "https://shopify.xpiper.com/api/admin-graphql",
  headers: {
    shop: "xpiper-store-1.myshopify.com",
    password: "xxx",
  },
});

const root = createRoot(document.getElementById("app")!);
root.render(<GraphiQL fetcher={fetcher} />);
