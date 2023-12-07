// @ts-nocheck
import { Router } from "express";

import { CONFIG } from "../config";
import { findAppBlock } from "../helpers/find-app-block";
import { loadOfflineSession } from "../helpers/load-offline-session";
import { shopify } from "../shopify";

const router = Router();

// Specify the name of the template the app will integrate with
const APP_BLOCK_TEMPLATES = ["product"];

router.get("/check", async (req, res) => {
  try {
    const session = await loadOfflineSession({ res });

    const client = new shopify.api.clients.Rest({ session });

    // Use `client.get` to request a list of themes on the shop
    const {
      // @ts-ignore
      body: { themes },
    } = await client.get({
      path: "themes",
    });

    // Find the published theme
    // @ts-ignore
    const publishedTheme = themes.find((theme) => theme.role === "main");

    // Retrieve a list of assets in the published theme
    const {
      // @ts-ignore
      body: { assets },
    } = await client.get({
      path: `themes/${publishedTheme.id}/assets`,
    });

    // Check if JSON template files exist for the template specified in APP_BLOCK_TEMPLATES
    // @ts-ignore
    const templateJSONFiles = assets.filter((file) => {
      return APP_BLOCK_TEMPLATES.some(
        (template) => file.key === `templates/${template}.json`,
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
      }),
    );

    // Retrieve the body of JSON templates and find what section is set as `main`
    const templateMainSections = (
      await Promise.all(
        templateJSONFiles.map(async (file, index) => {
          const acceptsAppBlock = false;
          const {
            body: { asset },
          } = await client.get({
            path: `themes/${publishedTheme.id}/assets`,
            query: { "asset[key]": file.key },
          });

          const json = JSON.parse(asset.value);
          const main = Object.entries(json.sections).find(
            ([id, section]) =>
              id === "main" || section.type.startsWith("main-"),
          );
          if (main) {
            return assets.find(
              (file) => file.key === `sections/${main[1].type}.liquid`,
            );
          }
        }),
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
            // eslint-disable-next-line no-useless-escape
            /\{\%\s+schema\s+\%\}([\s\S]*?)\{\%\s+endschema\s+\%\}/m,
          );
          let schema = null;

          try {
            schema = JSON.parse(match[1]);
          } catch (e) {
            // empty
          }

          if (schema && schema.blocks) {
            acceptsAppBlock = schema.blocks.some((b) => b.type === "@app");
          }

          return acceptsAppBlock ? file : null;
        }),
      )
    ).filter((value) => value);

    // Check script tag

    /**
     * This is where we check if the theme supports apps blocks.
     * To do so, we check if the main-product section supports blocks of type @app
     */
    const supportsSections = templateJSONFiles.length > 0;
    const supportsAppBlocks =
      supportsSections && sectionsWithAppBlock.length > 0;

    const appBlocks = findAppBlock(
      templateJSONAssetContents[0]?.value,
      CONFIG.SHOPIFY_BLOCK_ID,
    );

    // console.log(appBlocks, process.env.CONFIG.SHOPIFY_BLOCK_ID);

    res.status(200).send({
      theme: publishedTheme,
      supportsSections,
      supportsAppBlocks,
      appBlocks,
      appBlockId: CONFIG.SHOPIFY_BLOCK_ID,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send({ errors: ["Cannot check theme settings"] });
  }
});

export const ShopifyThemeController = router;
