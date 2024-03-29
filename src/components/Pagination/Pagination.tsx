import { Box } from "@mui/material";
import Paginate from "@mui/material/Pagination";
import cn from "classnames";
import React from "react";

import { useFilters } from "../../hooks/useFilters";
import styles from "./Pagination.module.scss";

type Props = {
  totalMovies: number;
};

export const Pagination: React.FC<Props> = ({ totalMovies }) => {
  const { currentPage, handleChangePage } = useFilters();

  const pageCount = Math.ceil(totalMovies / 6);

  return (
    <Box
      className={cn({
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
