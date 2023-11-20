import { Box, List, ListItem, Typography } from "@mui/material";
import React from "react";

import { IMovie } from "../../types/movie";
import styles from "./MovieInfo.module.scss";

type Props = {
  currentMovie: IMovie;
};

const normalizeDate = (date: string) => {
  return date.split("-").reverse().join(".");
};

export const MovieInfo: React.FC<Props> = ({ currentMovie }) => {
  const normalizedStart = normalizeDate(currentMovie.startDate);
  const normalizedEnd = normalizeDate(currentMovie.endDate);

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
        {currentMovie.title_en}
      </Typography>

      <List disablePadding className={styles.movieInfoList}>
        {renderListItem("Age", `${currentMovie.ageRestriction} +`)}
        {renderListItem("Year", currentMovie.startDate.slice(0, 4))}
        {renderListItem("Original name", currentMovie.title_en)}
        {renderListItem("Genre", currentMovie.genre)}
        {renderListItem("Format", currentMovie.format)}
        {renderListItem("Period", `${normalizedStart} - ${normalizedEnd}`)}
      </List>

      <Typography paragraph color="white" letterSpacing={1.2}>
        {currentMovie.description}
      </Typography>
    </Box>
  );
};
