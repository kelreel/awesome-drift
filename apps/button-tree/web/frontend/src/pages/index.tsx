import { Loading } from "@shopify/app-bridge-react";
import { Layout, Page } from "@shopify/polaris";
import React from "react";

import { AppBlockBanner } from "../components/app-block-banner";
import { FooterFaq } from "../components/footer-faq";
import { CreateWidget, WidgetList } from "../components/widget-list";
import { useShopData } from "../hooks";

export default function IndexPage() {
  const { isLoading: isShopDataLoading } = useShopData();

  return (
    <Page
      title="Widgets"
      secondaryActions={<CreateWidget isButton size="medium" />}
    >
      {isShopDataLoading && <Loading />}
      <Layout>
        <Layout.Section>
          <WidgetList />
        </Layout.Section>
        <Layout.Section>
          <AppBlockBanner />
        </Layout.Section>
        {/* <Layout.Section>
          <DynamicLinkListCard />
        </Layout.Section>
        <Layout.Section>
          <ButtonCard />
        </Layout.Section> */}
      </Layout>
      <FooterFaq />
    </Page>
  );
}
