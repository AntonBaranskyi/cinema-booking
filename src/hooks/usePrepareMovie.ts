import { useEffect } from "react";

import { onFilterMovies } from "../store/slices/MoviesSlice";
import { filterMovies } from "../utils/filterFilms";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { useFilters } from "./useFilters";

export const usePrepareMovie = () => {
  const { filteredMovies, allMovies, moviesPerPage } = useAppSelector(
    (state) => state.movies,
  );

  const { currentLanguage } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const { filter, sort, query, currentPage } = useFilters();

  useEffect(() => {
    const visibleMovies = filterMovies({
      movies: allMovies,
      filter,
      sort,
      lang: currentLanguage,
      query,
    });

    dispatch(onFilterMovies(visibleMovies));
  }, [allMovies, currentLanguage, dispatch, filter, query, sort]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  return { currentMovies, noMoviesFound: currentMovies.length === 0 };
};
