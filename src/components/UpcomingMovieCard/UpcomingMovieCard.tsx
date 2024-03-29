import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { POSTER } from "../../constants/posterURL";
import { IMovieServer } from "../../types/movieServer";
import styles from "./UpcomingMovieCard.module.scss";

type Props = {
  upcomingMovie: IMovieServer;
};

export const UpcomingMovieCard: React.FC<Props> = ({ upcomingMovie }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/film/${upcomingMovie._id}`);
  };

  return (
    <Box className={styles.posterWrapper} onClick={handleNavigate}>
      <img
        src={`${POSTER}/${upcomingMovie.poster_path}`}
        alt="upcomingPoster"
        className={styles.poster}
      />

      <Typography
        textAlign="center"
        fontSize={16}
        lineHeight={"20px"}
        color="white"
        className={styles.title}
      >
        {upcomingMovie.title}
      </Typography>
    </Box>
  );
};
