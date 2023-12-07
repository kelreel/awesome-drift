import { useMutation, useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';

interface Data {
    confirmationUrl: string;
}

export const usePlanCharge = () => {
    const api = useApi();
    return useMutation({
        mutationFn: async () => api.post(`shop/charge`).json<Data>()
    })
};
