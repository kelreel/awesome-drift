import { ButtonDataSourceMetafield, WidgetSettings } from "@blinks/shared";

import { useShopData } from "./shop";

export const normalizeMetafields = (config: WidgetSettings) =>
  config.buttons.flatMap(({ data: { label, url } }) => {
    const res: ButtonDataSourceMetafield[] = [];
    if (url.type === "metafield" && !!url.metafield) {
      res.push(url.metafield);
    }
    if (label.type === "metafield" && !!label.metafield) {
      res.push(label.metafield);
    }
    return res;
  });

export const useBulkEdit = () => {
  const { data: shopData } = useShopData();

  const shop = shopData?.shop.shop.split(".")[0] ?? "";

  return (metafields: Array<{ namespace: string; key: string }>) => {
    window.open(
      encodeURI(
        `https://admin.shopify.com/store/${shop}/bulk?resource_name=Product&edit=status,${metafields
          .map((mf) => `metafields.${mf.namespace}.${mf.key}`)
          .join(",")}`,
      ),
      "_blank",
    );
  };
};
