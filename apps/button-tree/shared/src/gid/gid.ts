export const extractIdFromGid = (
  gid: string | null | undefined,
): string | null => {
  if (!gid || typeof gid !== "string") {
    return null;
  }

  const path = gid.split("/");
  return path.length > 1 ? (path.pop() as string) : null;
};

export const generateShopifyGid = (
  entityType: string,
  value: string | number,
) => {
  return `gid://shopify/${entityType}/${value}`;
};

export const generateShopifyProductGid = (value: string | number) => {
  return generateShopifyGid("Product", value);
};
