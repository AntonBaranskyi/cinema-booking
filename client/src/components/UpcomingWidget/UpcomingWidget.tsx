import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

import { IMovieServer } from "../../types/movieServer";
import styles from "./UpcomingWidget.module.scss";

type Props = {
  upcomingMovie: IMovieServer;
};

export const UpcomingWidget: React.FC<Props> = ({ upcomingMovie }) => {
  return (
    <Box className={styles.upcomingWidget}>
      <Typography variant="h4" color="white" textAlign="center" mb={1.5}>
        {upcomingMovie.release_date.split("-").reverse().join(".")}
      </Typography>

      <Typography textAlign="center" color="white" variant="h6" mb={3}>
        Maybe this movie will be in OUR cinemas
      </Typography>

      <Typography color="white" variant="h4" textAlign="center" mb={3}>
        Notify me about the start of sales
      </Typography>

      <form className={styles.upcomingForm}>
        <Box className={styles.upcomingFormWrapper} mb={3}>
          <TextField variant="standard" label="Name" />
          <TextField variant="standard" label="Email" />
        </Box>

        <Button type="submit" variant="contained">
          Subscribe
        </Button>
      </form>
    </Box>
  );
};
