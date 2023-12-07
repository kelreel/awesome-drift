import { Session } from "@shopify/shopify-api";
import { Request } from "express";

export const errorLogger = (req: Request, session: Session, err: any) => {
  console.log({
    url: req.url,
    rawError: err,
    shop: session?.shop,
    data: JSON.stringify(err?.response?.errors || err?.error || null),
  });
};
