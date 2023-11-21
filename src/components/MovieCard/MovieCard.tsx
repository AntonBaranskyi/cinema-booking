import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import poster from "../../assets/movie_poster.jpg";
import { SESSIONS } from "../../constants/Sesions";
import { useAppSelector } from "../../hooks/useAppSelector";
import { IMovie } from "../../types/movie";
import { prepareTitle } from "../../utils/normalizeTitle";
import { getTitleLang } from "../../utils/prepareTitle";
import styles from "./MovieCard.module.scss";

type Props = {
  movie: IMovie;
};

export const MovieCard: React.FC<Props> = ({ movie }) => {
  const { currentLanguage } = useAppSelector((state) => state.common);
  const navigate = useNavigate();

  const langTitle = getTitleLang(currentLanguage) as keyof IMovie;

  const normalizeTitle = prepareTitle(movie[langTitle] as string);

  const handleNavigate = () => {
    navigate(`/film/${normalizeTitle.toLowerCase().replace(" ", "_")}`);
  };

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
            onClick={handleNavigate}
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
