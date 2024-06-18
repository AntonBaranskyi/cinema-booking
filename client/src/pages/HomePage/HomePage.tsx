import { Box, Container } from "@mui/material";
import { PuffLoader } from "react-spinners";

import BookingWidget from "../../components/BookingWidget";
import DividerBlock from "../../components/DividerBlock";
import ExpireDialog from "../../components/ExpireDialog";
import Filters from "../../components/Filters";
import Header from "../../components/Header";
import Main from "../../components/Main";
import MoviesList from "../../components/MoviesList";
import Pagination from "../../components/Pagination";
import PaymentWidget from "../../components/PaymentWidget";
import { ThanksModal } from "../../components/ThanksModal";
import YoutubeModal from "../../components/YoutubeModal";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useFilters } from "../../hooks/useFilters";
import {
  useGetMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "../../services/moviesService";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const { currentPage, debouncedValue, sort, filter } = useFilters();
  const { data, isLoading } = useGetMoviesQuery({
    page: currentPage,
    query: debouncedValue,
    sort,
    filter,
  });
  const { data: upcomingData, isLoading: upcomingLoading } =
    useGetUpcomingMoviesQuery();

  const { posterMovieKey } = useAppSelector((state) => state.common);

  if (upcomingLoading || isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PuffLoader size={64} color="#fff" />
      </Box>
    );
  }

  return (
    <>
      {upcomingData && <Main mainMovies={upcomingData.slice(0, 4)} />}
      <Container maxWidth="lg">
        <Filters />
        <DividerBlock />

        <Box className={styles.movieListWrapper}>
          {isLoading || upcomingLoading || !data ? (
            <PuffLoader size={64} color="#fff" />
          ) : (
            <MoviesList movieData={data.results} />
          )}
        </Box>

        {!isLoading && data?.totalItems && (
          <Pagination totalMovies={data.totalItems} />
        )}
      </Container>

      <BookingWidget />
      <ExpireDialog />
      <PaymentWidget />
      <ThanksModal />
      <YoutubeModal movieKey={posterMovieKey} />
    </>
  );
};
