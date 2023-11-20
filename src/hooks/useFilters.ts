import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { FILTERS } from "../types/filterEnum";
import { SORT } from "../types/sortEnum";
import { SearchParams, getSearchWith } from "../utils/searchHelper";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortState, setSortState] = useState<SORT>(SORT.ASC);

  const filter = (searchParams.get("filter") || FILTERS.ALL) as FILTERS;

  const query = searchParams.get("query");
  const pageParam = searchParams.get("page");
  const sort = searchParams.get("order") as SORT;

  const currentPage = (pageParam ? +pageParam : 1) as number;

  const handleSortChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as SORT;

    setSortState(selectedValue);
    setSearchWith({ order: selectedValue });
  };

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);
    setSearchParams(search);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    setSearchWith({ page: page === 1 ? null : page.toString() });
  };

  return {
    filter,
    query,
    sort,
    sortState,
    handleChangeQuery,
    handleSortChange,
    currentPage,
    handleChangePage,
  };
};
