import { Container } from "@mui/material";

import DividerBlock from "../../components/DividerBlock";
import Filters from "../../components/Filters";
import Header from "../../components/Header";
import MoviesList from "../../components/MoviesList";
import Pagination from "../../components/Pagination";

export const HomePage = () => (
  <>
    <Header />
    <Container maxWidth="lg">
      <Filters />
      <DividerBlock />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
        className="div"
      >
        <MoviesList />
      </div>

      <Pagination />
    </Container>
  </>
);
