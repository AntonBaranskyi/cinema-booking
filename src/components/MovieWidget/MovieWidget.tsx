import { Box, Typography } from "@mui/material";
import React from "react";

import { SESSIONS } from "../../constants/Sesions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { onToggleWidget } from "../../store/slices/CommonSilce";
import { IMovie } from "../../types/movie";
import styles from "./MovieWidget.module.scss";

type Props = {
  currentMovie: IMovie;
};

export const MovieWidget: React.FC<Props> = ({ currentMovie }) => {
  const dispatch = useAppDispatch();

  const handleHourClick = (hour: string) => {
    dispatch(
      onToggleWidget({
        isOpen: true,
        movieId: currentMovie.title_en,
        session: hour,
      }),
    );
  };

  return (
    <Box className={styles.widgetWrapper}>
      <Box className={styles.widgetTop}>
        <Typography variant="h5" textAlign="center">
          Timetable of sessions
        </Typography>
      </Box>
      <Box className={styles.widgetMain}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Your cinema
        </Typography>
        <Box className={styles.widgetSessions}>
          {SESSIONS.map((hour) => (
            <Box
              key={hour}
              className={styles.widgetSessionsItem}
              onClick={() => handleHourClick(hour)}
            >
              <Typography variant="button">{hour}</Typography>
              {currentMovie.format === "3D" && (
                <Typography className={styles.itemFormat}>3D</Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box className={styles.widgetBottom}>
        <Typography>SDH</Typography>
        <Typography>VIP</Typography>
      </Box>
    </Box>
  );
};
