import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import poster from "../../assets/movie_poster.jpg";
import { SESSIONS } from "../../constants/Sesions";
import { RootState } from "../../store/store";
import { IMovie } from "../../types/movie";
import { prepareTitle } from "../../utils/normalizeTitle";
import { getTitleLang } from "../../utils/prepareTitle";
import styles from "./MovieCard.module.scss";

type Props = {
  movie: IMovie;
};

export const MovieCard: React.FC<Props> = ({ movie }) => {
  const { currentLanguage } = useSelector((state: RootState) => state.language);

  const langTitle = getTitleLang(currentLanguage) as keyof IMovie;

  const normalizeTitle = prepareTitle(movie[langTitle] as string);
  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <img src={poster} alt="poster" className={styles.poster} />

        <Box className={styles.cardInfo}>
          <Typography
            textAlign="center"
            component="h4"
            variant="h5"
            className={styles.cardTitle}
          >
            {`${movie.ageRestriction}+ ${normalizeTitle}`}
          </Typography>

          <Box className={styles.cardSessions}>
            {SESSIONS.map((hour) => (
              <Box key={hour} className={styles.cardSessionsItem}>
                <Typography>{hour}</Typography>

                {movie.format === "3D" && (
                  <Typography className={styles.itemFormat}>3D</Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
