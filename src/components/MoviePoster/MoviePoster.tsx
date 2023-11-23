import { Box } from "@mui/material";

import poster from "../../assets/movie_poster.jpg";
import styles from "./MoviePoster.module.scss";

export const MoviePoster = () => {
  return (
    <Box className={styles.posterWrapper}>
      <img src={poster} alt="poster" className={styles.poster} />
    </Box>
  );
};
