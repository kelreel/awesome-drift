import React from 'react';
import { Card, EmptyState, Page } from "@shopify/polaris";
import { notFoundImage } from "../assets";

export default function NotFound() {
  return (
    <Page>
      <Card>
        <Card.Section>
          <EmptyState heading="Not found" image={notFoundImage} />
        </Card.Section>
      </Card>
    </Page>
  );
}
