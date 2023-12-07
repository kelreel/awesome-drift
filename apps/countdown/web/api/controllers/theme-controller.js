// @ts-check
import { Router } from 'express';
import { shopify } from '../shopify.js'
import { findAppBlock } from '../utils/findAppBlock.js'
import { CONFIG } from '../config.js';
import { loadOfflineSession } from '../utils/load-offline-session.js';

const router = Router();

const APP_BLOCK_TEMPLATES = ["product", "cart", "index"];

router.get('/check', async (req, res) => {
    const session = await loadOfflineSession(res.locals.shopify?.session?.shop || req.query.shop);

    if (!session) {
        throw `Session not found for shop "${req.query.shop}" while checking theme blocks`
    }
    try {
        const client = new shopify.api.clients.Rest({ session });

        // Use `client.get` to request a list of themes on the shop
        const {
            body: { themes },
        } = await client.get({
            path: "themes",
        });

        // Find the published theme
        const publishedTheme = themes.find((theme) => theme.role === "main");

        // Retrieve a list of assets in the published theme
        const {
            body: { assets },
        } = await client.get({
            path: `themes/${publishedTheme.id}/assets`,
        });

        // Check if JSON template files exist for the template specified in APP_BLOCK_TEMPLATES
        const templateJSONFiles = assets.filter((file) => {
            return APP_BLOCK_TEMPLATES.some(
                (template) => file.key === `templates/${template}.json`
            );
        });

        // Get bodies of template JSONs
        const templateJSONAssetContents = await Promise.all(
            templateJSONFiles.map(async (file) => {
                const {
                    body: { asset },
                } = await client.get({
                    path: `themes/${publishedTheme.id}/assets`,
                    query: { "asset[key]": file.key },
                });

                return asset;
            })
        );

        // Retrieve the body of JSON templates and find what section is set as `main`
        const templateMainSections = (
            await Promise.all(
                templateJSONFiles.map(async (file, index) => {
                    const {
                        body: { asset },
                    } = await client.get({
                        path: `themes/${publishedTheme.id}/assets`,
                        query: { "asset[key]": file.key },
                    });

                    const json = JSON.parse(asset.value);
                    const main = Object.entries(json.sections).find(
                        ([id, section]) => id === "main" || section.type.startsWith("main-")
                    );
                    if (main) {
                        return assets.find(
                            (file) => file.key === `sections/${main[1].type}.liquid`
                        );
                    }
                })
            )
        ).filter((value) => value);

        // Request the content of each section and check if it has a schema that contains a
        // block of type '@app'
        const sectionsWithAppBlock = (
            await Promise.all(
                templateMainSections.map(async (file, index) => {
                    let acceptsAppBlock = false;
                    const {
                        body: { asset },
                    } = await client.get({
                        path: `themes/${publishedTheme.id}/assets`,
                        query: { "asset[key]": file.key },
                    });

                    const match = asset.value.match(
                        /\{\%\s+schema\s+\%\}([\s\S]*?)\{\%\s+endschema\s+\%\}/m
                    );

                    let schema = null;

                    try {
                        schema = JSON.parse(match[1]);
                    } catch (error) {
                        // empty
                    }

                    if (schema && schema.blocks) {
                        acceptsAppBlock = schema.blocks.some((b) => b.type === "@app");
                    }

                    return acceptsAppBlock ? file : null;
                })
            )
        ).filter((value) => value);

        /**
         * This is where we check if the theme supports apps blocks.
         * To do so, we check if the main-product section supports blocks of type @app
         */
        const supportsSections = templateJSONFiles.length > 0;
        const supportsAppBlocks =
            supportsSections && sectionsWithAppBlock.length > 0;


        let blockCount = 0;
        templateJSONAssetContents.forEach((content) => {
            blockCount += findAppBlock(content.value, CONFIG.SHOPIFY_TIMER_BLOCK_ID);
        })

        res.status(200).send({
            blockCount,
            theme: publishedTheme,
            supportsSections,
            supportsAppBlocks,
            themes,
            text: templateJSONAssetContents
        });
    } catch (e) {
        console.log("[Theme-Controller]: Theme settings check error", e, e?.response?.errors);
        res.status(400).send({ errors: ["Theme settings check error"] });
    }
});

export const ThemeController = router;
