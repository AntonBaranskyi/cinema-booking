import { Box, Container } from "@mui/material";
import { PuffLoader } from "react-spinners";

import BookingWidget from "../../components/BookingWidget";
import DividerBlock from "../../components/DividerBlock";
import ExpireDialog from "../../components/ExpireDialog";
import Filters from "../../components/Filters";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import Pagination from "../../components/Pagination";
import PaymentWidget from "../../components/PaymentWidget";
import { ThanksModal } from "../../components/ThanksModal";
import { useFilters } from "../../hooks/useFilters";
import { useGetMoviesQuery } from "../../services/moviesService";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const { currentPage, debouncedValue, sort, filter } = useFilters();
  const { data, isLoading } = useGetMoviesQuery({
    page: currentPage,
    query: debouncedValue,
    sort,
    filter,
  });

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Filters />
        <DividerBlock />

        <Box className={styles.movieListWrapper}>
          {isLoading || !data ? (
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
    </>
  );
};
