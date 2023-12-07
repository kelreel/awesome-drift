import {
  ButtonDataSourceMetafield,
  MetafieldOwnerType,
  MetafieldValueType,
} from "@blinks/shared";
import { Loading } from "@shopify/app-bridge-react";
import {
  BlockStack,
  Box,
  Button,
  Divider,
  Icon,
  InlineStack,
  Link,
  Modal,
  Tag,
  Text,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import {
  AppsMajor,
  HideMinor,
  InsertDynamicSourceMajor,
  LinkMinor,
  RiskMinor,
  TypeMinor,
} from "@shopify/polaris-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

import { useApi } from "../../../../../hooks";
import { useBulkEdit } from "../../../../../hooks/useBulkEdit";
import { CreateMetafieldForm } from "./create-metafield";

interface MetafieldDefinition {
  id: string;
  name: string;
  description: string;
  key: string;
  namespace: string;
  type: {
    name: MetafieldValueType;
  };
  ownerType: MetafieldOwnerType;
  visibleToStorefrontApi: boolean;
  pinnedPosition: number;
}

const MetafieldIcons: Partial<Record<MetafieldValueType, typeof LinkMinor>> = {
  single_line_text_field: TypeMinor,
  url: LinkMinor,
};

const isValidDefinition = (mf: MetafieldDefinition) =>
  mf.visibleToStorefrontApi &&
  (mf.type.name === "url" || mf.type.name === "single_line_text_field");

interface Props {
  value: MetafieldDefinition | ButtonDataSourceMetafield | null;
  onSelect: (mf: MetafieldDefinition | null) => void;
  canCreate?: boolean;
}

export const MetafieldSelect = ({
  value,
  onSelect,
  canCreate = true,
}: Props) => {
  const [open, setOpen] = useState(false);
  const api = useApi();

  const bulkEdit = useBulkEdit();

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);

  const { data: metafields, isFetching } = useQuery(
    ["metafield/find", debouncedSearch],
    () =>
      api
        .get(`metafield/find?search=${debouncedSearch}`, {})
        .json<MetafieldDefinition[]>(),
  );

  return (
    <>
      <InlineStack gap="500">
        <InlineStack gap="200">
          {value && (
            <Tag onRemove={() => onSelect(null)}>
              <Box padding="100">
                <Text as="span">
                  {"{{ "}
                  {value.namespace}.{value.key}
                  {" }}"}
                </Text>
              </Box>
            </Tag>
          )}
          <Button icon={InsertDynamicSourceMajor} onClick={() => setOpen(true)}>
            {value ? undefined : "Select metafield"}
          </Button>
        </InlineStack>
        {value && (
          <Button onClick={() => bulkEdit([value])} variant="plain">
            Bulk edit
          </Button>
        )}
      </InlineStack>

      <Modal title="Metafields" open={open} onClose={() => setOpen(false)}>
        {isFetching && <Loading />}
        <Box
          paddingBlockStart="400"
          paddingInlineStart="400"
          paddingInlineEnd="400"
        >
          <TextField
            type="search"
            value={search}
            onChange={setSearch}
            autoComplete="off"
            label="Search"
            placeholder="Enter metafield key, namespace or name"
          />
        </Box>
        <Modal.Section>
          <BlockStack gap="400">
            <BlockStack gap="200">
              {metafields?.map((mf) => (
                <Box
                  key={mf.id}
                  borderRadius="200"
                  borderColor="border-brand"
                  borderWidth="050"
                  padding="150"
                  {...(!isValidDefinition(mf) && {
                    background: "bg-fill-disabled",
                  })}
                >
                  <InlineStack align="space-between" blockAlign="center">
                    <InlineStack gap="300">
                      <Tooltip content={mf.type.name}>
                        <div style={{ width: "20px" }}>
                          <Icon
                            source={MetafieldIcons[mf.type.name] ?? AppsMajor}
                          />
                        </div>
                      </Tooltip>
                      <Text as="p">{mf.name}</Text>
                      <Text tone="subdued" as="p">
                        {mf.namespace}.{mf.key}
                      </Text>
                    </InlineStack>
                    <InlineStack gap="150" wrap={false}>
                      {!mf.visibleToStorefrontApi && (
                        <Tooltip
                          content={
                            <Text as="p">
                              Metafield should have Storefront access (
                              <Link
                                url="https://help.shopify.com/en/manual/custom-data/access-options"
                                target="_blank"
                                external
                              >
                                Info
                              </Link>
                              )
                            </Text>
                          }
                        >
                          <Icon tone="warning" source={HideMinor} />
                        </Tooltip>
                      )}
                      {mf.type.name !== "url" &&
                        mf.type.name !== "single_line_text_field" && (
                          <Tooltip
                            content={
                              <Text as="p">
                                Metafield type should be "url" or "single line
                                text field"
                              </Text>
                            }
                          >
                            <Icon tone="warning" source={RiskMinor} />
                          </Tooltip>
                        )}
                      {isValidDefinition(mf) && (
                        <Button
                          onClick={() => {
                            onSelect(mf);
                            setOpen(false);
                          }}
                          size="micro"
                        >
                          Select
                        </Button>
                      )}
                    </InlineStack>
                  </InlineStack>
                </Box>
              ))}
            </BlockStack>
            <Divider borderWidth="025" borderColor="border-tertiary" />
            {canCreate && (
              <BlockStack gap="200">
                <Text as="p" variant="headingSm">
                  Create new string metafield for Product
                </Text>
                <CreateMetafieldForm />
              </BlockStack>
            )}
          </BlockStack>
        </Modal.Section>
      </Modal>
    </>
  );
};
