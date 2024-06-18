import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { POSTER } from "../../constants/posterURL";
import { SESSIONS } from "../../constants/sesions";
import { IMovieServer } from "../../types/movieServer";
import styles from "./MovieCard.module.scss";

type Props = {
  movie: IMovieServer;
};

export const MovieCard: React.FC<Props> = ({ movie }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/film/${movie._id}`);
  };

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <img
          src={`${POSTER}${movie.poster_path}`}
          alt="poster"
          className={styles.poster}
        />

        <Box className={styles.cardInfo}>
          <Typography
            textAlign="center"
            component="h4"
            variant="h5"
            className={styles.cardTitle}
            onClick={handleNavigate}
          >
            {/* {`${movie.ageRestriction}+ ${normalizeTitle}`} */}
            {movie.title}
          </Typography>

          <Box className={styles.cardSessions}>
            {SESSIONS.map((hour) => (
              <Box
                key={hour}
                className={styles.cardSessionsItem}
                // onClick={() => handleHourClick(hour)}
              >
                <Typography>{hour}</Typography>

                {/* {movie.format === "3D" && (
                  <Typography className={styles.itemFormat}>3D</Typography>
                )} */}
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
