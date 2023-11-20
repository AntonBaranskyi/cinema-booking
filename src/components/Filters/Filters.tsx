import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { FILTERS_OPTIONS } from "../../constants/FiltersOptions";
import { SORT_OPTIONS } from "../../constants/SortOptions";
import { translatePath } from "../../constants/i18nPath";
import { useFilters } from "../../hooks/useFilters";
import { FILTERS } from "../../types/filterEnum";
import SearchLink from "../SearchLink";
import styles from "./Filters.module.scss";

export const Filters = () => {
  const { t } = useTranslation();

  const { filter, query, sortState, handleChangeQuery, handleSortChange } =
    useFilters();

  return (
    <Box className={styles.filterWrapper}>
      <Box className={styles.filtersFormats}>
        <Typography color="gray" fontSize={20} className={styles.filterTitle}>
          {`${t(`${translatePath.filters}.movie_format`)}:`}
        </Typography>
        <ToggleButtonGroup
          value={filter}
          exclusive
          className={styles.filterBtnGroup}
        >
          {FILTERS_OPTIONS.map((option) => (
            <SearchLink
              key={option}
              params={{
                filter: option === FILTERS.ALL ? null : option,
                page: "1",
              }}
            >
              <ToggleButton
                className={`${option === filter ? styles.filterActiveBtn : ""}`}
                value={option}
              >
                {option === FILTERS.ALL
                  ? t(`${translatePath.filters}.movie_all`)
                  : option}
              </ToggleButton>
            </SearchLink>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box className={styles.filterSortWrapper}>
        <FormControl fullWidth>
          <InputLabel>{t(`${translatePath.filters}.sort_by`)}</InputLabel>

          <Select
            variant="outlined"
            value={sortState}
            onChange={handleSortChange}
            className={styles.filterSelect}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.title} value={option.value}>
                {t(`${translatePath.filters}.${option.title}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className={styles.filterSearchWrapper}>
        <TextField
          className={styles.filterSearch}
          inputProps={{
            sx: {
              "&::placeholder": {
                color: "white",
                opacity: 1,
              },
            },
          }}
          sx={{
            "& .MuiInputBase-root": {
              height: 50,
            },

            "& .MuiInputBase-input input": {
              "&::placeholder": {
                color: "white",
              },
            },
          }}
          type="search"
          placeholder={t(`${translatePath.filters}.search_placeholder`)}
          value={query}
          onChange={handleChangeQuery}
        />
      </Box>
    </Box>
  );
};
