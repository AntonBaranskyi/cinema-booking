import { Box } from "@mui/material";
import Paginate from "@mui/material/Pagination";
import { useSelector } from "react-redux";

import { useFilters } from "../../hooks/useFilters";
import { RootState } from "../../store/store";
import styles from "./Pagination.module.scss";

export const Pagination = () => {
  const { filteredMovies, moviesPerPage } = useSelector(
    (state: RootState) => state.movies,
  );

  const { currentPage, handleChangePage } = useFilters();

  const pageCount = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <Box className={styles.paginationWrapper}>
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
