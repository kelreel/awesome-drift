import { json, Router, urlencoded } from "express";

import { loadOfflineSession } from "../helpers/load-offline-session";
import { shopify } from "../shopify";

const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/storefront-token", async (req, res) => {
  const session = await loadOfflineSession({ res });

  const existedTokens = await shopify.api.rest.StorefrontAccessToken.all({
    session: session,
  });

  if (!existedTokens || !existedTokens.data.length) {
    const storefront_access_token = new shopify.api.rest.StorefrontAccessToken({
      session: session,
    });
    storefront_access_token.title = "Blinks app token";
    await storefront_access_token.save({
      update: true,
    });

    res.send(storefront_access_token);
  } else {
    res.send(existedTokens.data[0]);
  }
});

export const ClientController = router;
