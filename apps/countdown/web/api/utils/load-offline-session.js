// @ts-check
import { shopify } from '../shopify.js'

export const loadOfflineSession = async (shop) => {
    const id = shopify.api.session.getOfflineId(shop);
    const session = await shopify.config.sessionStorage.loadSession(id);
    return session
}