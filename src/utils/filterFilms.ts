import { FILTERS } from "../types/filterEnum";
import { Language } from "../types/langType";
import { IMovie } from "../types/movie";
import { SORT } from "../types/sortEnum";

interface IParams {
  movies: IMovie[];
  filter: FILTERS;
  sort: SORT;
  lang: Language;
}

export const filterMovies = ({
  movies,
  filter,
  sort,
  lang,
}: IParams): IMovie[] => {
  let movieCopy = [...movies];

  if (filter !== FILTERS.ALL) {
    movieCopy = movieCopy.filter((movie) => movie.format === filter);
  }

  if (sort) {
    movieCopy.sort((a, b) => {
      const titleA = lang === "en" ? a.title_en : a.title_ua;
      const titleB = lang === "en" ? b.title_en : b.title_ua;

      return titleA.toLowerCase().localeCompare(titleB.toLowerCase());
    });
  }

  if (sort === SORT.DESC) {
    return movieCopy.reverse();
  }

  return movieCopy;
};
