import { Container, Grid } from "@mui/material";

import BookingWidget from "../../components/BookingWidget";
import BreadcrumbsBlock from "../../components/BreadcrumbsBlock";
import ExpireDialog from "../../components/ExpireDialog";
import Header from "../../components/Header";
import MovieInfo from "../../components/MovieInfo";
import MoviePoster from "../../components/MoviePoster";
import MovieWidget from "../../components/MovieWidget";
import { useMoviePageData } from "../../hooks/useMoviePageData";
import styles from "./FilmPage.module.scss";

export const FilmPage = () => {
  const { currentMovie } = useMoviePageData();

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <BreadcrumbsBlock />

        <Grid container>
          <Grid item lg={3} sm={12} className={styles.poster}>
            <MoviePoster />
          </Grid>

          <Grid item lg={6} sm={12}>
            {currentMovie && <MovieInfo currentMovie={currentMovie} />}
          </Grid>

          <Grid item lg={3} sm={12} className={styles.widget}>
            <MovieWidget />
          </Grid>
        </Grid>
      </Container>
      <BookingWidget />
      <ExpireDialog />
    </>
  );
};
