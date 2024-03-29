import { SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { FILTERS } from "../types/filterEnum";
import { SORT } from "../types/sortEnum";
import { SearchParams, getSearchWith } from "../utils/searchHelper";
import { useDebounce } from "./useDebounce";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortState, setSortState] = useState<SORT>(SORT.DEFAULT);

  const filter = (searchParams.get("filter") || FILTERS.ALL) as FILTERS;

  const query = searchParams.get("query") as string;
  const pageParam = searchParams.get("page");
  const sort = searchParams.get("order") as SORT;

  const { debouncedValue } = useDebounce(query || "", 300);

  const currentPage = (pageParam ? +pageParam : 1) as number;

  const handleSortChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as SORT;

    setSortState(selectedValue);
    setSearchWith({
      order: selectedValue !== SORT.DEFAULT ? selectedValue : null,
    });
  };

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);
    setSearchParams(search);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const sanitizedValue = inputValue.replace(/\s+/g, " ");

    setSearchWith({ query: sanitizedValue || null });
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    setSearchWith({ page: page === 1 ? null : page.toString() });
  };

  const handleClearAllFilters = () => {
    setSearchWith({
      page: null,
      query: null,
      order: null,
      filter: null,
    });

    setSortState(SORT.DEFAULT);
  };

  return {
    filter,
    debouncedValue,
    query,
    sort,
    sortState,
    handleChangeQuery,
    handleSortChange,
    currentPage,
    handleChangePage,
    handleClearAllFilters,
    filterExist: Boolean(filter !== FILTERS.ALL || query || sort),
  };
};
