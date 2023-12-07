import { Session } from "@shopify/shopify-api";

import { getNodesFromConnections } from "../../helpers/connections";
import { shopify } from "../../shopify";
import { MetafieldValueType } from "./metafield-definition";

const METAFIELDS_QUERY = `query ($ownerType: MetafieldOwnerType!, $query: String) {
  metafieldDefinitions (first: 50, ownerType: $ownerType, query: $query) {
    edges {
      node {
        id,
        namespace,
        key,
        name,
        description,
        ownerType,
        type {
          name
        }
        visibleToStorefrontApi,
        pinnedPosition
      }
    }
  }
}`;

interface MetafieldDefinition {
  id: string;
  name: string;
  description: string;
  key: string;
  namespace: string;
  type: {
    name: MetafieldValueType;
  };
  ownerType: string;
  visibleToStorefrontApi: boolean;
  pinnedPosition: number;
}

export const getMetafieldDefinitions = async (
  session: Session,
  ownerType: "PRODUCT" | "PRODUCTVARIANT",
  searchQuery?: string,
): Promise<any> => {
  const client = new shopify.api.clients.Graphql({ session });

  const edges = (
    await client.query<any>({
      data: {
        query: METAFIELDS_QUERY,
        variables: {
          ownerType,
          query: searchQuery,
        },
      },
    })
  ).body.data.metafieldDefinitions;

  return getNodesFromConnections(edges) as MetafieldDefinition[];
};
