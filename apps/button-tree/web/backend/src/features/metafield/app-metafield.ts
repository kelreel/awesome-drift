import { Session } from "@shopify/shopify-api";

import { shopify } from "../../shopify";
import { getAppInstallationId } from "../app-installation-id";
import { MetafieldValueType } from "./metafield-definition";

const SET_APP_METAFIELD_MUTATION = `mutation SetAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafieldsSetInput) {
      metafields {
        id
        key
        namespace
        value
        updatedAt
      }
      userErrors {
        field
        message
      }
    }
  }`;

const GET_APP_METAFIELD_QUERY = `query GetAppDataMetafield ($namespace: String!, $key: String!) {
  currentAppInstallation {
    metafield (namespace: $namespace, key: $key) {
      id
      key
      namespace
      value
      updatedAt
    }
  }
}`;

export interface AppMetafieldResult {
  id: string;
  key: string;
  namespace: string;
  value: any;
  updatedAt: string;
}

export const setAppMetafield = async (
  session: Session,
  namespace: string,
  key: string,
  type: MetafieldValueType,
  value: any,
): Promise<AppMetafieldResult> => {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    const appInstallationId = await getAppInstallationId(session);

    const result = await client.query({
      data: {
        query: SET_APP_METAFIELD_MUTATION,
        variables: {
          metafieldsSetInput: [
            {
              namespace,
              key,
              type,
              value,
              ownerId: appInstallationId,
            },
          ],
        },
      },
    });

    return (result.body as any).data.metafieldsSet as AppMetafieldResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAppMetafield = async (
  session: Session,
  namespace: string,
  key: string,
): Promise<AppMetafieldResult | null> => {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    const result = await client.query({
      data: {
        query: GET_APP_METAFIELD_QUERY,
        variables: {
          namespace,
          key,
        },
      },
    });

    return (result.body as any).data.currentAppInstallation.metafield;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
