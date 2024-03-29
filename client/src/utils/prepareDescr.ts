import { Language } from "../types/langType";
import { TRANSLATE_ITEM } from "../types/translateItemsEnum";

export const getItemLang = (item: TRANSLATE_ITEM, lang: Language) => {
  return `${item}_${lang}`;
};
