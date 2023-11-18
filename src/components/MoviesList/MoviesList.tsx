import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { onFilterMovies } from "../../store/slices/MoviesSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { FILTERS } from "../../types/filterEnum";
import { SORT } from "../../types/sortEnum";
import { filterMovies } from "../../utils/filterFilms";
import MovieCard from "../MovieCard";

export const MoviesList = () => {
  const { filteredMovies, allMovies, moviesPerPage } = useSelector(
    (state: RootState) => state.movies,
  );
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = (pageParam ? +pageParam : 1) as number;

  const filter = (searchParams.get("filter") || FILTERS.ALL) as FILTERS;
  const sort = searchParams.get("order") as SORT;

  useEffect(() => {
    const visibleMovies = filterMovies({
      movies: allMovies,
      filter,
      sort,
      lang: currentLanguage,
    });
    dispatch(onFilterMovies(visibleMovies));
  }, [dispatch, sort, filter, allMovies, currentLanguage]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  return (
    <Grid justifyContent="center" container columnGap={2} rowGap={4}>
      {currentMovies.map((movie) => (
        <Grid item sm={12} md="auto" xl="auto" key={movie.title_en}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};
