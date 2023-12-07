import { Session } from "@shopify/shopify-api";

import { shopify } from "../../shopify";

const CREATE_METAFIELD_DEFINITION = `mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition {
      id
      name
      namespace
      key
      visibleToStorefrontApi
    }
    userErrors {
      field
      message
      code
    }
  }
}`;

export type MetafieldValueType =
  | "json"
  | "url"
  | "single_line_text_field"
  | "list.url"
  | "list.single_line_text_field";

export type MetafieldOwnerType = "PRODUCT" | "PRODUCTVARIANT";

interface Definition {
  name: string;
  namespace: string;
  key: string;
  description?: string;
  type: MetafieldValueType;
  ownerType: MetafieldOwnerType;
  visibleToStorefrontApi?: boolean;
  pin?: boolean;
}

interface CreateMetafieldDefinitionResult {
  id: string;
  name: string;
  namespace: string;
  key: string;
  visibleToStorefrontApi: boolean;
}

export const createMetafieldDefinition = async (
  session: Session,
  definition: Definition,
) => {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    const result = await client.query({
      data: {
        query: CREATE_METAFIELD_DEFINITION,
        variables: {
          definition,
        },
      },
    });

    if (
      (result.body as any).data.metafieldDefinitionCreate.userErrors?.length > 0
    ) {
      throw (result.body as any).data.metafieldDefinitionCreate.userErrors[0]
        ?.message;
    }

    return (result.body as any).data
      .metafieldDefinitionCreate as CreateMetafieldDefinitionResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
