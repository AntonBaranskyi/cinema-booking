import { FILTERS } from "../types/filterEnum";
import { Language } from "../types/langType";
import { IMovie } from "../types/movie";
import { SORT } from "../types/sortEnum";

interface IParams {
  movies: IMovie[];
  filter: FILTERS;
  sort: SORT;
  lang: Language;
  query: string | null;
}

export const filterMovies = ({
  movies,
  filter,
  sort,
  lang,
  query,
}: IParams): IMovie[] => {
  let movieCopy = [...movies];

  if (filter !== FILTERS.ALL) {
    movieCopy = movieCopy.filter((movie) => movie.format === filter);
  }

  if (query) {
    const normalizeQuery = query.toLowerCase().trim();
    movieCopy = movieCopy.filter((movie) => {
      const titleLang = (lang === "en" ? "title_en" : "title_ua")
        .toLowerCase()
        .trim() as keyof IMovie;

      const movieTitle = movie[titleLang] as string;

      return movieTitle.toLowerCase().includes(normalizeQuery);
    });
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
