import { Box, Container } from "@mui/material";

import BookingWidget from "../../components/BookingWidget";
import DividerBlock from "../../components/DividerBlock";
import ExpireDialog from "../../components/ExpireDialog";
import Filters from "../../components/Filters";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import Pagination from "../../components/Pagination";
import PaymentWidget from "../../components/PaymentWidget";
import { ThanksModal } from "../../components/ThanksModal";
import styles from "./HomePage.module.scss";

export const HomePage = () => (
  <>
    <Header />
    <Container maxWidth="lg">
      <Filters />
      <DividerBlock />

      <Box className={styles.movieListWrapper}>
        <MoviesList />
      </Box>

      <Pagination />
    </Container>
    <BookingWidget />
    <ExpireDialog />
    <PaymentWidget />
    <ThanksModal />
  </>
);
