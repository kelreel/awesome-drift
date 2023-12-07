import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge, useToast } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import ky from "ky";

const jsonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

interface ErrorBody {
  error?: string; // deprecated;
  errors?: string[];
}

export const useApi = () => {
  const app = useAppBridge();
  const fetchFunction = authenticatedFetch(app);
  const { show } = useToast();

  const api = ky.create({
    prefixUrl: "/api",
    fetch: (input, init) =>
      fetchFunction(input, { ...init, headers: jsonHeaders }),
    hooks: {
      afterResponse: [
        (_request, _options, response) => {
          const { headers } = response;
          if (
            headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
          ) {
            const authUrlHeader =
              headers.get("X-Shopify-API-Request-Failure-Reauthorize-Url") ||
              `/api/auth`;

            const redirect = Redirect.create(app);
            redirect.dispatch(
              Redirect.Action.REMOTE,
              authUrlHeader.startsWith("/")
                ? `https://${window.location.host}${authUrlHeader}`
                : authUrlHeader,
            );
          }
        },
      ],
      beforeError: [
        async (error) => {
          try {
            const data = (await error.response.json()) as ErrorBody;
            console.error(data);
            if (data?.errors) {
              show(`Error(s): ${data.errors?.join(", ")}`);
            }
            if (data?.error) {
              show(`Error: ${data.error}`);
            }
            return error;
          } catch {
            if (
              error.response.headers.get(
                "X-Shopify-API-Request-Failure-Reauthorize",
              ) !== "1"
            ) {
              show(`Error: ${error.message}`);
            }
            return error;
          }
        },
      ],
    },
  });

  return api;
};
