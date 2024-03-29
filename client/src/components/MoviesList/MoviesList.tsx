import { Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import { IMovieServer } from "../../types/movieServer";
import MovieCard from "../MovieCard";

type Props = {
  movieData: IMovieServer[];
};

export const MoviesList: React.FC<Props> = ({ movieData }) => {
  const { t } = useTranslation();

  return (
    <Grid justifyContent="center" container columnGap={2} rowGap={4}>
      {movieData.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          {t(`${translatePath.info}.no_movie`)}
        </Typography>
      ) : (
        movieData.map((movie) => (
          <Grid item sm={12} md="auto" xl="auto" key={movie.title}>
            <MovieCard movie={movie} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
