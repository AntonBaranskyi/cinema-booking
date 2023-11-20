import { Box, Select, Typography } from "@mui/material";
import React from "react";

import { SESSIONS } from "../../constants/Sesions";
import styles from "./MovieWidget.module.scss";

export const MovieWidget = () => {
  return (
    <Box className={styles.widgetWrapper}>
      <Box className={styles.widgetTop}>
        <Typography>Timetable of sessions</Typography>
        <Select fullWidth></Select>
      </Box>
      <Box className={styles.widgetMain}>
        <Typography>Your cinema</Typography>
        <Box className={styles.widgetSessions}>
          {SESSIONS.map((hour) => (
            <Box key={hour} className={styles.widgetSessionsItem}>
              <Typography>{hour}</Typography>
              <Typography className={styles.itemFormat}>3D</Typography>
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
