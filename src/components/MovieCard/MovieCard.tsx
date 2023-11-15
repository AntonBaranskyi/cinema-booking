import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

import poster from "../../assets/movie_poster.jpg";
import { Movie } from "../../types/movie";
import styles from "./MovieCard.module.scss";

type Props = {
  movie: Movie;
};

export const MovieCard: React.FC<Props> = ({ movie }) => {
  const sessionHours = ["10:00", "12:30", "15:00", "17:30", "20:00"];

  const normalizeTitle =
    movie.title.length > 20 ? movie.title.slice(0, 21) + "..." : movie.title;
  return (
    <Card
      className={styles.card}
      sx={{ width: "400px", backgroundColor: "none", height: "300px" }}
    >
      <CardContent sx={{ display: "flex", gap: 2 }}>
        <img src={poster} alt="poster" className={styles.poster} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            textAlign="center"
            component="h4"
            variant="h5"
            sx={{ marginBottom: 3 }}
          >
            {`${movie.ageRestriction}+ ${normalizeTitle}`}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {sessionHours.map((hour) => (
              <Box
                key={hour}
                sx={{
                  maxWidth: "50px",
                  width: "100%",
                  textAlign: "center",
                  margin: "0 4px 14px",
                  cursor: "pointer",
                }}
              >
                <Typography>{hour}</Typography>

                {movie.format === "3D" && (
                  <Typography sx={{ fontSize: 10 }}>3D</Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
