import { IndexTable } from "@shopify/polaris";
import React from "react";

export const ProductEditor = (): JSX.Element => {
  const products = [];

  return <IndexTable itemCount={2} headings={[{ title: "Name" }]} />;
};
