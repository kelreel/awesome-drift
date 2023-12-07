import React, { ReactNode, createContext, useContext, useEffect } from "react";
import { useNavigate } from "@shopify/app-bridge-react";
import { useShopData, usePlanCharge } from "../../hooks";

type ShopDataContextValue = {
    shop: string;
    appBlockId: string;
    hasPayment: boolean;
    metafieldsReady: boolean;
} | undefined

type Props = {
    children: ReactNode;
};

export const ShopDataContext = createContext<ShopDataContextValue>(undefined);

export const useWidgetProvider = (): ShopDataContextValue =>
    useContext(ShopDataContext);

export function ShopDataProvider({ children }: Props) {
    const { data } = useShopData()
    const { mutate: getRedirectUrl } = usePlanCharge();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && !data.hasPayment) {
            getRedirectUrl(undefined, { onSuccess: (data) => navigate(data.confirmationUrl) })
        }
    }, [data])

    return (
        <ShopDataContext.Provider value={data}>
            {children}
        </ShopDataContext.Provider>
    );
}
