import { Box, Container } from "@mui/material";

import DividerBlock from "../../components/DividerBlock";
import Filters from "../../components/Filters";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import Pagination from "../../components/Pagination";
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
  </>
);
