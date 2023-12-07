import { authExchange } from "@urql/exchange-auth";
import { ComponentChildren } from "preact";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";

import { StorefrontTokenStorage } from "../utils/storefrontTokenStorage";

type Props = {
  children: ComponentChildren;
};

const client = new Client({
  url: `${window.location.origin}/api/2023-07/graphql.json`,
  exchanges: [
    cacheExchange,
    authExchange(async (utils) => {
      let token = await StorefrontTokenStorage.getToken();

      return {
        addAuthToOperation: (operation) => {
          if (!token) {
            return operation;
          }
          return utils.appendHeaders(operation, {
            "X-Shopify-Storefront-Access-Token": token.access_token,
          });
        },
        didAuthError: (error, _operation) => {
          const status = error.response?.status;
          return status === 401 || status === 403;
        },
        refreshAuth: async () => {
          const newToken = await StorefrontTokenStorage.fetchStorefrontToken();
          StorefrontTokenStorage.saveTokenData(newToken);
          token = newToken;
        },
        willAuthError: (_operation) => {
          if (!token) {
            return true;
          }
          return false;
        },
      };
    }),
    fetchExchange,
  ],
});

export const StorefrontGqlProvider = ({ children }: Props) => (
  // @ts-expect-error
  <Provider value={client}>{children}</Provider>
);
