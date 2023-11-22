import { Box } from "@mui/material";
import Paginate from "@mui/material/Pagination";
import cn from "classnames";
import { useSelector } from "react-redux";

import { useFilters } from "../../hooks/useFilters";
import { usePrepareMovie } from "../../hooks/usePrepareMovie";
import { RootState } from "../../store/store";
import styles from "./Pagination.module.scss";

export const Pagination = () => {
  const { filteredMovies, moviesPerPage } = useSelector(
    (state: RootState) => state.movies,
  );

  const { noMoviesFound } = usePrepareMovie();

  const { currentPage, handleChangePage } = useFilters();

  const pageCount = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <Box
      className={cn({
        [styles.paginationHide]: noMoviesFound,
        [styles.paginationWrapper]: true,
      })}
    >
      <Paginate
        size="large"
        count={pageCount}
        page={currentPage}
        variant="outlined"
        onChange={handleChangePage}
      />
    </Box>
  );
};
