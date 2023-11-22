import { Language } from "../types/langType";

export const getTitleLang = (lang: Language) => {
  return `title_${lang}`;
};
