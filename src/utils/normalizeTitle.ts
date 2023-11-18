export const prepareTitle = (title: string): string => {
  const normalizeTitle = title.length > 20 ? title.slice(0, 21) + "..." : title;

  return normalizeTitle;
};
