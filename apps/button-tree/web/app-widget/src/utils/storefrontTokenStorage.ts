const STORAGE_KEY = "blinks-app-token";

export interface StorefrontTokenData {
  id: number;
  title: string;
  access_scope: string;
  access_token: string;
  admin_graphql_api_id: string;
  created_at: string;
}

export abstract class StorefrontTokenStorage {
  private static parseTokenData(
    data: string | null,
  ): StorefrontTokenData | null {
    if (!data) {
      return null;
    }

    try {
      const obj = JSON.parse(data);
      if (
        typeof obj["access_token"] !== "string" ||
        obj["access_token"].length === 0
      ) {
        throw "invalid token";
      }
      return obj;
    } catch (error) {
      return null;
    }
  }

  public static saveTokenData(data: StorefrontTokenData): void {
    try {
      localStorage.setItem(`${STORAGE_KEY}`, JSON.stringify(data));
    } catch (e) {
      // empty
    }
  }

  public static getToken(): StorefrontTokenData | null {
    try {
      return this.parseTokenData(localStorage.getItem(`${STORAGE_KEY}`));
    } catch (e) {
      return null;
    }
  }

  public static fetchStorefrontToken =
    async (): Promise<StorefrontTokenData> => {
      return fetch(
        // @ts-ignore
        `/apps/blinks-app-proxy/storefront-token?shop=${window.Shopify.shop}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => {
        return res.json() as Promise<StorefrontTokenData>;
      });
    };
}
