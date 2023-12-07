export const findAppBlock = (
  templateJSONAssetContent: string,
  themeAppExtensionUuid: string,
): {
  isInstalled: boolean;
  count: number;
  disabledCount: number;
} => {
  const regExp = new RegExp(
    // eslint-disable-next-line no-useless-escape
    `shopify:\/\/apps\/.*\/blocks\/.*\/${themeAppExtensionUuid}`,
  );

  let parsedContent: any = undefined;

  try {
    parsedContent = JSON.parse(templateJSONAssetContent);
  } catch (err) {
    console.error(err);
  }

  /**
   * Retrieves all blocks belonging to template sections
   */
  const sections = Object.values(parsedContent?.sections || {}) as any[];
  const blocks = sections
    //@ts-ignore
    .map(({ blocks = {} }) => Object.values(blocks))
    .flat() as { type: string; disabled: boolean; settings: any }[];

  const appBlocks = blocks.filter((block) => regExp.test(block.type));
  const disabled = appBlocks.filter((b) => b.disabled);

  return {
    isInstalled: !!appBlocks.length,
    count: appBlocks.length,
    disabledCount: disabled.length,
  };
};
