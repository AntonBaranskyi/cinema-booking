import { TRANSLATE_ITEM } from "../types/TranslateItemsEnum";
import { IMovie } from "../types/movie";
import { getItemLang } from "../utils/prepareDescr";
import { useAppSelector } from "./useAppSelector";

export const useMovieInfoTranslations = () => {
  const { currentLanguage } = useAppSelector((state) => state.common);

  const langDescr = getItemLang(
    TRANSLATE_ITEM.DESCR,
    currentLanguage,
  ) as keyof IMovie;

  const genreDescr = getItemLang(
    TRANSLATE_ITEM.GENRE,
    currentLanguage,
  ) as keyof IMovie;

  const langTitle = getItemLang(
    TRANSLATE_ITEM.TITLE,
    currentLanguage,
  ) as keyof IMovie;

  return {
    langDescr,
    genreDescr,
    langTitle,
  };
};
