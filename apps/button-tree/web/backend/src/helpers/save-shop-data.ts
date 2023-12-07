import { Prisma } from "@prisma/client";
import { Session } from "@shopify/shopify-api";
import { Shop } from "@shopify/shopify-api/rest/admin/2023-07/shop";

import { prisma } from "../prisma";
import { shopify } from "../shopify";

export const ensureShopData = async (session: Session): Promise<Shop> => {
  try {
    const client = new shopify.api.clients.Rest({ session });

    const response = await client.get<Shop>({ path: "shop" });

    const shop = session.shop;

    console.log(`[Ensure-Shop-Data]: Save shop data for ${shop}`);

    await prisma.shop.upsert({
      where: {
        shop,
      },
      create: {
        shop,
        data: (response.body as any).shop as Prisma.JsonObject,
        installed: true,
      },
      update: {
        shop,
        data: (response.body as any).shop as Prisma.JsonObject,
        installed: true,
      },
    });

    return response.body;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
