import React from 'react';
import { Banner, Link } from '@shopify/polaris';
import { useThemeData } from '../hooks';

const HelpLink = () => <Link url="https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/apps#app-blocks">Learn how to manage app blocks in Shopify</Link>

export const ThemeStatusBanner = () => {
    const { data, isFetching } = useThemeData();

    if (isFetching || !data) {
        return null
    }

    return data?.blockCount > 0 ? <Banner title='App blocks added to published theme' status='success'><HelpLink /></Banner> : <Banner
        title="App blocks not yet added to published theme"
        status="warning"
    >
        <HelpLink />
    </Banner>
}