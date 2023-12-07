import React, { ReactNode } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryProvider = ({ children }: Props) =>
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
