import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import moviesFromServer from "../../assets/films.json";
import { IMovie } from "../../types/movie";

interface IState {
  allMovies: IMovie[];
  filteredMovies: IMovie[];
  currentPage: number;
  moviesPerPage: number;
}

const initialState: IState = {
  allMovies: moviesFromServer,
  filteredMovies: moviesFromServer,
  currentPage: 1,
  moviesPerPage: 5,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    onFilterMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.filteredMovies = action.payload;
      state.currentPage = 1;
    },
  },
});

export const { onFilterMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
