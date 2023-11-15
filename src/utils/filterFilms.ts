import { FILTERS } from "../types/filterEnum";
import { Movie } from "../types/movie";
import { SORT } from "../types/sortEnum";

interface Params {
  movies: Movie[];
  filter: FILTERS;
  sort: SORT;
}

export const filterMovies = ({ movies, filter, sort }: Params): Movie[] => {
  let movieCopy = [...movies];

  if (filter !== FILTERS.ALL) {
    movieCopy = movieCopy.filter((movie) => movie.format === filter);
  }

  if (sort) {
    movieCopy.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    );
  }

  if (sort === SORT.DESC) {
    return movieCopy.reverse();
  }

  return movieCopy;
};
