import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';

interface Data {
    shop: string;
    appBlockId: string;
    hasPayment: boolean;
    metafieldsReady: boolean;
}

export const useShopData = () => {
    const api = useApi();
    return useQuery(['shop-data'], async () => api.get(`shop/data`).json<Data>());
};
