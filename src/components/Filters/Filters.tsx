import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { FILTERS } from "../../types/filterEnum";
import { SORT } from "../../types/sortEnum";
import { SearchParams, getSearchWith } from "../../utils/searchHelper";
import SearchLink from "../SearchLink";
import styles from "./Filters.module.scss";

const filterOptions = [FILTERS.ALL, FILTERS.TWO_D, FILTERS.THREE_D];
const sortOptions = [
  { title: "Title A - Z", value: SORT.ASC },
  { title: "Title Z - A", value: SORT.DESC },
];

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortState, setSortState] = useState<SORT>(SORT.ASC);

  const filter = (searchParams.get("filter") || FILTERS.ALL) as FILTERS;

  const handleSortChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as SORT;

    setSortState(selectedValue);
    setSearchWith({ order: selectedValue });
  };

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  return (
    <div className={styles.filtersWrapper}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          color="gray"
          fontSize={20}
          sx={{ textTransform: "uppercase" }}
        >
          Formats:
        </Typography>
        <ToggleButtonGroup value={filter} exclusive sx={{ marginLeft: 2 }}>
          {filterOptions.map((option) => (
            <SearchLink
              key={option}
              params={{
                filter: option === FILTERS.ALL ? null : option,
                page: "1",
              }}
            >
              <ToggleButton
                sx={{ backgroundColor: option === filter ? "red" : "initial" }}
                value={option}
              >
                {option}
              </ToggleButton>
            </SearchLink>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", minWidth: "150px" }}>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>

          <Select
            variant="outlined"
            value={sortState}
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.title} value={option.value}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};
