import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { FILTERS } from "../../types/filterEnum";
import { SORT } from "../../types/sortEnum";
import SearchLink from "../SearchLink";

const filterOptions = [FILTERS.ALL, FILTERS.TWO_D, FILTERS.THREE_D];
const sortOptions = [
  { title: "Title A - Z", value: SORT.ASC },
  { title: "Title Z - A", value: SORT.DESC },
];

export const Filters = () => {
  const [searchParams] = useSearchParams();
  const [sortState, setSortState] = useState<SORT | null>(null);

  const filter = (searchParams.get("filter") || FILTERS.ALL) as FILTERS;
  const sort = searchParams.get("order") as SORT;

  useEffect(() => {
    setSortState(sort);
  }, [sort]);

  const curentSortOptionTitle = useMemo(() => {
    return sortOptions.find((item) => item.value === sortState)?.title;
  }, [sortState]);

  return (
    <Box sx={{ display: "flex", gap: 5, marginBottom: "40px" }}>
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
          <InputLabel>{curentSortOptionTitle}</InputLabel>
          <Select variant="standard" value={curentSortOptionTitle}>
            {sortOptions.map((option) => (
              <SearchLink
                key={option.title}
                params={{ order: option.value, page: "1" }}
              >
                <MenuItem selected={sort === option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              </SearchLink>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
