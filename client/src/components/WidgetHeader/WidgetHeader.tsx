import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import poster from "../../assets/movie_poster.jpg";
import { translatePath } from "../../constants/i18nPath";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useMovieInfoTranslations } from "../../hooks/useMovieTranslations";
import { useUpdateTime } from "../../hooks/useUpdateTime";
import styles from "./WidgetHeader.module.scss";

export const WidgetHeader = () => {
  const { timer, formatedTimer } = useUpdateTime();
  const { langTitle } = useMovieInfoTranslations();

  const { t } = useTranslation();

  const { currentMovieId, currentSession } = useAppSelector(
    (state) => state.common,
  );
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
              <Typography variant="h4">{currentMovie?.[langTitle]}</Typography>
              <Typography paragraph>
                {new Date().getDate()} листопада {currentSession} ·{" "}
                {t(`${translatePath.widget_header}.main_hall`)}·{" "}
                {t(`${translatePath.widget_header}.start`)}
              </Typography>
              <Typography paragraph color="gray">
                {t(`${translatePath.widget_header}.location`)}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6">
            {t(`${translatePath.widget_header}.timer`)}: {formatedTimer(timer)}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
