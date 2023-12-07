//@ts-check
export const findAppBlock = (
  templateJSONAssetContent,
  themeAppExtensionUuid
) => {
  const regExp = new RegExp(
    `shopify:\/\/apps\/.*\/blocks\/.*\/${themeAppExtensionUuid}`
  );

  let parsedContent = undefined;

  try {
    parsedContent = JSON.parse(templateJSONAssetContent);
  } catch (err) {
    console.error(err);
  }

  /**
   * Retrieves all blocks belonging to template sections
   */
  const sections = Object.values(parsedContent?.sections || {});
  const blocks = sections
    .map(({ blocks = {} }) => Object.values(blocks))
    .flat()

  const appBlocks = blocks.filter((block) => regExp.test(block.type));
  // const disabled = appBlocks.filter((b) => b.disabled);

  return appBlocks.length
};
