import { Session } from "@shopify/shopify-api";

import { shopify } from "../shopify";

const QUERY = `query {
    currentAppInstallation {
      id
    }
}`;

interface CurrentAppInstallationResult {
  id: string;
}

export const getAppInstallationId = async (
  session: Session,
): Promise<string> => {
  const client = new shopify.api.clients.Graphql({ session });

  return (
    (
      await client.query<any>({
        data: {
          query: QUERY,
        },
      })
    ).body.data.currentAppInstallation as CurrentAppInstallationResult
  ).id;
};
