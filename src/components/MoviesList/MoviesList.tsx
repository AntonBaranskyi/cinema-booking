import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import { usePrepareMovie } from "../../hooks/usePrepareMovie";
import MovieCard from "../MovieCard";

export const MoviesList = () => {
  const { t } = useTranslation();
  const { currentMovies, noMoviesFound } = usePrepareMovie();

  return (
    <Grid justifyContent="center" container columnGap={2} rowGap={4}>
      {noMoviesFound ? (
        <Typography variant="h6" color="textSecondary">
          {t(`${translatePath.info}.no_movie`)}
        </Typography>
      ) : (
        currentMovies.map((movie) => (
          <Grid item sm={12} md="auto" xl="auto" key={movie.title_en}>
            <MovieCard movie={movie} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
