export const normalizeDate = (date: string) => {
  return date.split("-").reverse().join(".");
};
