import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";

import BookingWidget from "../../components/BookingWidget";
import BreadcrumbsBlock from "../../components/BreadcrumbsBlock";
import ExpireDialog from "../../components/ExpireDialog";
import MovieInfo from "../../components/MovieInfo";
import MoviePoster from "../../components/MoviePoster";
import MovieWidget from "../../components/MovieWidget";
import PaymentWidget from "../../components/PaymentWidget";
import { ThanksModal } from "../../components/ThanksModal";
import UpcomingMovies from "../../components/UpcomingMovies";
import UpcomingWidget from "../../components/UpcomingWidget";
import YoutubeModal from "../../components/YoutubeModal";
import {
  useGetSingleMovieQuery,
  useGetUpcomingMoviesQuery,
} from "../../services/moviesService";
import styles from "./FilmPage.module.scss";

export const FilmPage = () => {
  const { id } = useParams();

  const { data: currentMovie, isLoading } = useGetSingleMovieQuery({ id });

  const { data: uploadingData, isLoading: uploadingLoading } =
    useGetUpcomingMoviesQuery();

  if (uploadingLoading || isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PuffLoader color="#fff" size={64} />;
      </Box>
    );
  }

  return (
    <>
      <Container maxWidth="xl">
        {currentMovie && <BreadcrumbsBlock movieTitle={currentMovie.title} />}

        <Grid container>
          <Grid item lg={3} sm={12} className={styles.poster} mb={10}>
            {currentMovie && (
              <MoviePoster posterUrl={currentMovie.poster_path} />
            )}
          </Grid>

          <Grid item lg={6} sm={12}>
            {currentMovie && <MovieInfo currentMovie={currentMovie} />}
          </Grid>

          <Grid item lg={3} sm={12} className={styles.widget}>
            {currentMovie &&
            currentMovie.type === "upcoming" &&
            new Date(currentMovie.release_date) > new Date() ? (
              <UpcomingWidget upcomingMovie={currentMovie} />
            ) : (
              currentMovie && <MovieWidget currentMovie={currentMovie} />
            )}
          </Grid>

          <Grid item lg={12}>
            {uploadingData && uploadingData.length > 0 && (
              <UpcomingMovies upcomingMovies={uploadingData} />
            )}
          </Grid>
        </Grid>
      </Container>
      <BookingWidget />
      <ExpireDialog />
      <PaymentWidget />
      <ThanksModal />
      {currentMovie && <YoutubeModal movieKey={currentMovie.video.key} />}
    </>
  );
};
