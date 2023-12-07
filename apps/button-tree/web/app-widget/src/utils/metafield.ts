export const parseMetafieldMultiValue = (
  value: string | undefined | null,
): Array<string> => {
  try {
    const result = JSON.parse(value ?? "[]");
    return Array.isArray(result) ? result : [];
  } catch {
    console.log("Error with metafield data parsing: ", value);
    return [];
  }
};
