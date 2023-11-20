import { Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

import BreadcrumbsBlock from "../../components/BreadcrumbsBlock";
import Header from "../../components/Header";
import MovieInfo from "../../components/MovieInfo";
import MoviePoster from "../../components/MoviePoster";
import MovieWidget from "../../components/MovieWidget";
import { useAppSelector } from "../../hooks/reduxHooks";
import { normalizeTitlePath } from "../../utils/pathTitle";
import styles from "./FilmPage.module.scss";

export const FilmPage = () => {
  const { id } = useParams();
  const { allMovies } = useAppSelector((state) => state.movies);

  const titleForPath = normalizeTitlePath(id as string);

  const currentMovie = allMovies.find(
    (movie) => movie.title_en.toLowerCase() === titleForPath,
  );

  console.log(currentMovie);

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
    </>
  );
};
