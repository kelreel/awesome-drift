import { Loading, useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  Button,
  Card,
  Layout,
  LegacyStack,
  Page,
  Text,
} from "@shopify/polaris";
import { ResetMinor } from "@shopify/polaris-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { useApi, useShopData } from "../../hooks";

interface AllMetafieldResponse {
  widgetSettingMetafield: any;
  billingMetafield: any;
  productMetafields: any;
}

export default function Storefront() {
  const api = useApi();
  const { data: shopData } = useShopData();

  const queryClient = useQueryClient();

  const { show } = useToast();

  const { mutate: initMetafields, isLoading: metafieldsIsCreating } =
    useMutation({
      mutationFn: () => api.post("metafield/app-init").json<any>(),
      onSuccess: () => {
        show("App-related metafields initialized");
        queryClient.invalidateQueries(["shop-profile"]);
        queryClient.invalidateQueries(["metafield/app-all"]);
      },
    });

  const { data: metafields, isFetching: metafieldsIsFetching } = useQuery(
    ["metafield/app-all"],
    async () => api.get("metafield/app-all").json<AllMetafieldResponse>(),
  );

  return (
    <Page title="Metafields & Dev data">
      {(metafieldsIsFetching || metafieldsIsCreating) && <Loading />}
      <Layout>
        <Layout.Section>
          <LegacyStack vertical>
            <Banner>
              Debug information. Here you can recreate application metafields
              (this will not affect the data already created in these and other
              metafields)
            </Banner>
            <Button
              onClick={initMetafields}
              icon={ResetMinor}
              loading={metafieldsIsCreating}
              disabled={metafieldsIsFetching}
              size="large"
            >
              Init app-related metafields
            </Button>
            {metafields && (
              <LegacyStack vertical>
                <Card padding="500">
                  <Text as="h5" variant="headingMd">
                    Widget settings metafield
                  </Text>
                  <pre>
                    {JSON.stringify(metafields.widgetSettingMetafield, null, 2)}
                  </pre>
                </Card>

                <Card padding="500">
                  <Text as="h5" variant="headingMd">
                    Product app-related metafield definitions
                  </Text>
                  <pre>
                    {JSON.stringify(metafields.productMetafields, null, 2)}
                  </pre>
                </Card>

                <Card padding="500">
                  <Text as="h5" variant="headingMd">
                    Billing metafield
                  </Text>
                  <pre>
                    {JSON.stringify(metafields.billingMetafield, null, 2)}
                  </pre>
                </Card>

                {shopData && (
                  <Card padding="500">
                    <Text as="h5" variant="headingMd">
                      Shop data
                    </Text>
                    <pre>{JSON.stringify(shopData, null, 2)}</pre>
                  </Card>
                )}
              </LegacyStack>
            )}
          </LegacyStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
