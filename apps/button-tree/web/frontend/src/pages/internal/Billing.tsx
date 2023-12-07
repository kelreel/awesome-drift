import { Loading } from "@shopify/app-bridge-react";
import {
  Button,
  Card,
  FooterHelp,
  Grid,
  Icon,
  LegacyStack,
  Page,
  Text,
} from "@shopify/polaris";
import {
  ButtonMinor,
  RiskMinor,
  SettingsMinor,
  TickMinor,
} from "@shopify/polaris-icons";
import React from "react";

import { useShopData } from "../../hooks/shop/useShopData";
import { useBilling } from "../../hooks/useBilling";

const ListItem = ({
  children,
  icon,
  iconColor,
}: {
  children: string;
  icon?: any;
  iconColor?: string;
}) => (
  <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
    {/* @ts-ignore */}
    {icon && <Icon tone={iconColor} source={icon} />}
    <div style={{ flex: 1 }}>
      <Text as="span" variant="bodyMd">
        {children}
      </Text>
    </div>
  </div>
);

export default function Billing() {
  const { data: shopData, isFetching: isShopDataLoading } = useShopData();
  const {
    applyFreePlan,
    applyProPlan,
    applyFreePlanLoading,
    applyProPlanLoading,
  } = useBilling();

  return (
    <Page title="Billing" backAction={{ url: "/" }} narrowWidth>
      {(isShopDataLoading || applyFreePlanLoading || applyProPlanLoading) && (
        <Loading />
      )}
      <Grid>
        {/* FREE */}
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <Card padding="400">
            <LegacyStack vertical>
              <LegacyStack vertical alignment="center">
                <Text alignment="center" variant="heading2xl" as="h2">
                  Free
                </Text>
                {shopData && (
                  <>
                    {!shopData.hasSubscription ? (
                      <Text variant="headingMd" tone="success" as="h4">
                        Current plan
                      </Text>
                    ) : (
                      <Button
                        disabled={applyFreePlanLoading}
                        loading={applyFreePlanLoading}
                        onClick={applyFreePlan}
                      >
                        Choose plan
                      </Button>
                    )}
                  </>
                )}
              </LegacyStack>
              <LegacyStack vertical alignment="baseline" spacing="none">
                <ListItem icon={RiskMinor} iconColor="warning">
                  Only one link is visible per product
                </ListItem>
                <ListItem icon={RiskMinor} iconColor="warning">
                  Limited widget customization
                </ListItem>
                <ListItem icon={RiskMinor} iconColor="warning">
                  Plain links appearance only
                </ListItem>
              </LegacyStack>
            </LegacyStack>
          </Card>
        </Grid.Cell>

        {/* PRO */}
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <Card padding="400">
            <LegacyStack vertical>
              <LegacyStack vertical alignment="center">
                <Text alignment="center" variant="heading2xl" as="h2">
                  Pro
                </Text>
                <div>
                  <Text variant="heading3xl" as="span">
                    $6.99
                  </Text>
                  <Text variant="bodyMd" tone="subdued" as="span">
                    /mo
                  </Text>
                </div>
                {shopData && (
                  <>
                    {shopData.hasSubscription ? (
                      <Text variant="headingMd" tone="success" as="p">
                        Current plan
                      </Text>
                    ) : (
                      <Button
                        disabled={applyProPlanLoading}
                        loading={applyProPlanLoading}
                        onClick={applyProPlan}
                        variant="primary"
                      >
                        Choose plan
                      </Button>
                    )}
                  </>
                )}
              </LegacyStack>
              <LegacyStack vertical alignment="baseline" spacing="none">
                <ListItem icon={TickMinor} iconColor="magic">
                  3 days trial
                </ListItem>
                <ListItem icon={TickMinor} iconColor="primary">
                  Unlimited links per product
                </ListItem>
                <ListItem icon={SettingsMinor} iconColor="primary">
                  Full widget customization
                </ListItem>
                <ListItem icon={ButtonMinor} iconColor="primary">
                  Custom button links
                </ListItem>
              </LegacyStack>
            </LegacyStack>
          </Card>
        </Grid.Cell>
      </Grid>
      <FooterHelp />
    </Page>
  );
}
