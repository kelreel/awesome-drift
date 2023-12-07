// @ts-check
import { setBillingMetafield } from '../metafields/billingMetafield.js'
import { loadOfflineSession } from '../utils/load-offline-session.js'
import { BILLING_BASE_PLAN } from './constants.js'
import { createSubscription, hasSubscription } from './subscription.js'

export const ensureBilling = async (req, res, next) => {
    const session = await loadOfflineSession(res.locals.shopify?.session?.shop || req.query.shop);

    if (!session) {
        throw `Session not found for shop "${req.query.shop}" while ensure billing`
    }

    const hasPayment = await hasSubscription(session);

    if (hasPayment) {
        await setBillingMetafield(session, BILLING_BASE_PLAN, 'ensureBilling');
    }

    if (!!session && hasPayment) {
        next();
    } else {
        try {
            res.redirect(await createSubscription(session))
        } catch (e) {
            console.log(e, e?.response?.errors);
            next();
        }
    }
}