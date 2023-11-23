import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import poster from "../../assets/movie_poster.jpg";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useUpdateTime } from "../../hooks/useUpdateTime";
import styles from "./WidgetHeader.module.scss";

export const WidgetHeader = () => {
  const { timer, formatedTimer } = useUpdateTime();

  const { currentMovieId } = useAppSelector((state) => state.common);
  const { allMovies } = useAppSelector((state) => state.movies);

  const currentMovie = allMovies.find(
    (movie) => movie.title_en === currentMovieId,
  );

  return (
    <AppBar position="sticky" className={styles.BookingAppBar}>
      <Container maxWidth="xl">
        <Toolbar className={styles.widgetToolbar}>
          <Box className={styles.AppBarInfo}>
            <img src={poster} alt="poster" className={styles.BookingPoster} />
            <Box>
              <Typography variant="h4">{currentMovie?.title_en}</Typography>
              <Typography paragraph>
                22 листопада 11:00 · Основний зал · Старт
              </Typography>
              <Typography paragraph color="gray">
                вулиця Івана Миколайчука, 15А, м.Київ
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6">
            Час на оплату: {formatedTimer(timer)}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
