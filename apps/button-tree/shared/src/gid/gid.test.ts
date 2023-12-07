import { describe, expect, it } from "vitest";

import {
  extractIdFromGid,
  generateShopifyGid,
  generateShopifyProductGid,
} from "./gid";

describe("GID", () => {
  it("extractIdFromId", () => {
    expect(extractIdFromGid("gid://shopify/Product/123")).toBe("123");
    expect(extractIdFromGid("gid://shopify/Product/3215312867312")).toBe(
      "3215312867312",
    );
    expect(extractIdFromGid("")).toBeNull();
    expect(extractIdFromGid("123456")).toBeNull();
  });

  it("generateShopifyGid", () => {
    expect(generateShopifyGid("Product", "123")).toBe(
      "gid://shopify/Product/123",
    );
    expect(generateShopifyGid("Item", 456)).toBe("gid://shopify/Item/456");
  });

  it("generateShopifyProductGid", () => {
    expect(generateShopifyProductGid("123")).toBe("gid://shopify/Product/123");
    expect(generateShopifyProductGid(456)).toBe("gid://shopify/Product/456");
  });
});
