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
  const { filter, sort, debouncedValue, currentPage } = useFilters();

  useEffect(() => {
    console.log("remount");

    const visibleMovies = filterMovies({
      movies: allMovies,
      filter,
      sort,
      lang: currentLanguage,
      query: debouncedValue,
    });

    dispatch(onFilterMovies(visibleMovies));
  }, [allMovies, currentLanguage, debouncedValue, dispatch, filter, sort]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  return { currentMovies, noMoviesFound: currentMovies.length === 0 };
};
