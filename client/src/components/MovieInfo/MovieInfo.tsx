import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";

import { IMovieServer } from "../../types/movieServer";
import styles from "./MovieInfo.module.scss";

type Props = {
  currentMovie: IMovieServer;
};

export const MovieInfo: React.FC<Props> = ({ currentMovie }) => {
  console.log(currentMovie);

  const renderListItem = (label: string, value: React.ReactNode) => (
    <ListItem key={label}>
      <Typography className={styles.movieInfoKey} variant="h6">
        {label}:
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </ListItem>
  );

  return (
    <Box className={styles.movieInfoWrapper}>
      <Typography
        variant="h3"
        color="white"
        fontWeight={500}
        lineHeight={1.1}
        fontSize={40}
        gutterBottom
      >
        {currentMovie.title}
      </Typography>

      <List disablePadding className={styles.movieInfoList}>
        {renderListItem("Age", `${currentMovie.adult ? "18" : "12"} +`)}
        {renderListItem("Year", currentMovie.release_date.slice(0, 4))}
        {renderListItem("Original name", currentMovie.title)}
        {renderListItem(
          "Rating",
          currentMovie.vote_average !== 0
            ? currentMovie.vote_average.toFixed(1)
            : "Not avaible",
        )}
        {renderListItem("Format", currentMovie.is_3D ? "3D" : "2D")}
        {renderListItem(
          "Genres",
          currentMovie.genres.map((genre, i, array) => {
            if (i !== array.length - 1) {
              return ` ${genre},`;
            } else {
              return ` ${genre}`;
            }
          }),
        )}
      </List>

      <Typography paragraph color="white" letterSpacing={1.2}>
        {currentMovie.overview}
      </Typography>
    </Box>
  );
};
