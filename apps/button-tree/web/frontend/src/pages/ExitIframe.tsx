import { Redirect } from "@shopify/app-bridge/actions";
import { Loading, useAppBridge } from "@shopify/app-bridge-react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ExitIframe() {
  const app = useAppBridge();
  const { search } = useLocation();

  useEffect(() => {
    if (!!app && !!search) {
      const params = new URLSearchParams(search);
      const redirectUri = params.get("redirectUri");
      const url = new URL(decodeURIComponent(redirectUri!));

      if (url.hostname === location.hostname) {
        const redirect = Redirect.create(app);
        redirect.dispatch(
          Redirect.Action.REMOTE,
          decodeURIComponent(redirectUri!),
        );
      }
    }
  }, [app, search]);

  return <Loading />;
}
