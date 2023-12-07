// @ts-check
import { Router } from 'express';
import { CONFIG } from '../config.js';
import { loadOfflineSession } from '../utils/load-offline-session.js';
import { createSubscription, hasSubscription } from '../billing/subscription.js';

const router = Router();

router.get('/data', async (req, res) => {
    const session = await loadOfflineSession(res.locals.shopify?.session?.shop || req.query.shop);
    if (!session) {
        throw `[Shop-Controller]: Session not found for shop "${req.query.shop}" while getting profile data`
    }

    let hasPayment = await hasSubscription(session)

    res.status(200).send({
        shop: session.shop,
        appBlockId: CONFIG.SHOPIFY_TIMER_BLOCK_ID || null,
        hasPayment,
    })
});

router.post('/charge', async (req, res) => {
    const session = await loadOfflineSession(res.locals.shopify?.session?.shop || req.query.shop);
    if (!session) {
        throw `[Shop-Controller]: Session not found for shop "${req.query.shop}" while charging`
    }

    try {
        const confirmationUrl = await createSubscription(session)

        res.status(200).send({ confirmationUrl });
    } catch (e) {
        console.log(`[Shop-Controller]: Create subscription error,`, e?.response?.errors);
        res.status(400).send({ errors: ['Error while requesting billing', e?.response?.errors] });
    }
});

export const ShopController = router;
