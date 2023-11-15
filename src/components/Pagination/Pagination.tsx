import { Box } from "@mui/material";
import Paginate from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { RootState } from "../../store/store";
import { SearchParams, getSearchWith } from "../../utils/searchHelper";

export const Pagination = () => {
  const { filteredMovies, moviesPerPage } = useSelector(
    (state: RootState) => state.movies,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPage = (pageParam ? +pageParam : 1) as number;

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const pageCount = Math.ceil(filteredMovies.length / moviesPerPage);

  const handleChange = (_: React.ChangeEvent<unknown>, page: string) => {
    setSearchWith({ page: page === "1" ? null : page });
  };
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", marginBottom: "70px" }}
    >
      <Paginate
        size="large"
        count={pageCount}
        page={currentPage}
        variant="outlined"
        onChange={(_, page) => handleChange(_, page.toString())}
      />
    </Box>
  );
};
