import { TRANSLATE_ITEM } from "../types/TranslateItemsEnum";
import { Language } from "../types/langType";

export const getItemLang = (item: TRANSLATE_ITEM, lang: Language) => {
  return `${item}_${lang}`;
};
