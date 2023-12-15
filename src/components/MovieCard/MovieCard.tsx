import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import poster from "../../assets/movie_poster.jpg";
import { SESSIONS } from "../../constants/sesions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useMovieInfoTranslations } from "../../hooks/useMovieTranslations";
import { onToggleWidget } from "../../store/slices/commonSlice";
import { IMovie } from "../../types/movie";
import { prepareTitle } from "../../utils/normalizeTitle";
import styles from "./MovieCard.module.scss";

type Props = {
  movie: IMovie;
};

export const MovieCard: React.FC<Props> = ({ movie }) => {
  const navigate = useNavigate();
  const { langTitle } = useMovieInfoTranslations();
  const dispatch = useAppDispatch();

  const normalizeTitle = prepareTitle(movie[langTitle] as string);

  const handleNavigate = () => {
    const normalizeEngTitle = movie.title_en.toLowerCase().replace(/ /g, "_");

    navigate(`/film/${normalizeEngTitle}`);
  };

  const handleHourClick = (hour: string) => {
    dispatch(
      onToggleWidget({
        isOpen: true,
        movieId: movie.title_en,
        session: hour,
      }),
    );
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
              <Box
                key={hour}
                className={styles.cardSessionsItem}
                onClick={() => handleHourClick(hour)}
              >
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
