import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';

type Theme = {
    id: number
    name: string;
    previewable: boolean;
    processing: boolean;
    theme_store_id: number | null;
    updated_at: string;
    created_at: string;
    admin_graphql_api_id: string;
}

interface Data {
    blockCount: number;
    supportsAppBlocks: boolean;
    supportsSections: boolean;
    theme: Theme;
    themes: Theme[];
}

export const useThemeData = () => {
    const api = useApi();
    return useQuery(['theme-data'], async () => api.get(`theme/check`).json<Data>());
};
