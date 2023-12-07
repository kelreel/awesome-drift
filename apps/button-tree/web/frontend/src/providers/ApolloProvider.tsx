import {
  ApolloClient,
  ApolloProvider as ApolloProviderBase,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import React, { ReactNode, useMemo } from "react";

import { useAuthenticatedFetch } from "../hooks";

interface Props {
  children: ReactNode;
}

export const ApolloProvider = ({ children }: Props) => {
  const fetch = useAuthenticatedFetch();

  const link = useMemo(
    () =>
      new HttpLink({
        uri: "api/graphql",
        credentials: "include",
        fetch,
      }),
    [fetch],
  );

  const client = useMemo(
    () => new ApolloClient({ link, cache: new InMemoryCache() }),
    [link],
  );

  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>;
};
