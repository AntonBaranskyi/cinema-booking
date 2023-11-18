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
      switch (lang) {
        case "en":
          return a.title_en
            .toLowerCase()
            .localeCompare(b.title_en.toLowerCase());

        case "ua":
          return a.title_ua
            .toLowerCase()
            .localeCompare(b.title_ua.toLowerCase());
      }
    });
  }

  if (sort === SORT.DESC) {
    return movieCopy.reverse();
  }

  return movieCopy;
};
