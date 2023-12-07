import {
  ButtonDataSourceMetafield,
  generateShopifyProductGid,
  randomString,
  WidgetBootstrap,
  WidgetPlatform,
} from "@blinks/shared";
import { ComponentChildren, createContext } from "preact";
import { useContext, useMemo } from "preact/hooks";
import { gql, useQuery } from "urql";

import { useWidgetSettings } from "./SettingsProvider";

type Props = {
  children: ComponentChildren;
  bootstrap?: WidgetBootstrap;
};

type StorefrontMetafieldValue = {
  id: string; //! warn: this gid != MetafieldDefinition gid
  type: string;
  key: string;
  namespace: string;
  value: unknown;
  parentResource: {
    __typename: string;
  };
};

interface DataContextValue {
  fetchedMetafields: Map<string, StorefrontMetafieldValue>;
  isLoading: boolean;
}

// @ts-ignore
export const DataContext = createContext<DataContextValue>(undefined);

export const useDataContext = (): DataContextValue => useContext(DataContext);

interface MetafieldsResponse {
  product: {
    id: string;
    handle: string;
    metafields: Array<StorefrontMetafieldValue | null>;
  };
}

const query = gql<MetafieldsResponse>`
  query ($id: ID!, $identifiers: [HasMetafieldsIdentifier!]!) {
    product(id: $id) {
      id
      handle
      metafields(identifiers: $identifiers) {
        id
        value
        key
        namespace
        parentResource {
          __typename
        }
      }
    }
  }
`;

export const DataProvider = ({ children, bootstrap }: Props) => {
  const {
    settings: { buttons },
  } = useWidgetSettings();

  const productGid = generateShopifyProductGid(
    bootstrap?.productId?.toString() ?? "",
  );

  const sourceMetafields = buttons.flatMap((btn) =>
    [btn.data.label.metafield, btn.data.url.metafield].filter(Boolean),
  ) as ButtonDataSourceMetafield[];

  const [{ fetching, data }] = useQuery({
    query,
    variables: {
      id: productGid,
      identifiers: sourceMetafields.map(({ namespace, key }) => ({
        namespace,
        key,
      })),
    },
    pause: bootstrap?.platform === WidgetPlatform.Demo,
  });

  const contextValue: DataContextValue = useMemo(() => {
    const fetchedMetafields: DataContextValue["fetchedMetafields"] = new Map();

    if (bootstrap?.platform === WidgetPlatform.Demo) {
      buttons.forEach((btn) => {
        if (btn.data.label.metafield) {
          const mf = btn.data.label.metafield;
          fetchedMetafields.set(`${mf.namespace}.${mf.key}`, {
            id: randomString(),
            key: mf.key,
            namespace: mf.namespace,
            type: "",
            value: `{{ ${mf.namespace}.${mf.key} }}`,
            parentResource: { __typename: "Product" },
          });
        }
      });
    } else {
      data?.product.metafields
        .filter((mf): mf is StorefrontMetafieldValue => !!mf)
        .forEach((mf) => {
          fetchedMetafields.set(`${mf.namespace}.${mf.key}`, mf);
        });
    }

    return {
      isLoading: fetching,
      fetchedMetafields,
    };
  }, [bootstrap?.platform, fetching, buttons, data?.product.metafields]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
