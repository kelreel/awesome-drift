import React from 'react';
import {
  Layout,
  Page
} from "@shopify/polaris";

import { BlockTypeList } from '../components/BlockTypeList';
import { FaqCard } from "../components/FaqCard";
import { ThemeStatusBanner } from '../components/ThemeStatusBanner';

export default function HomePage() {
  return (
    <Page narrowWidth title="Getsitecontrol Countdown Timer" compactTitle>
      <Layout>
        <Layout.Section>
          <ThemeStatusBanner />
        </Layout.Section>
        <Layout.Section>
          <BlockTypeList />
        </Layout.Section>
        <Layout.Section>
          <FaqCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
