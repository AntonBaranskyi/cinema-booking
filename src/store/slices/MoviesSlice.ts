import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import moviesFromServer from "../../assets/films.json";
import { Movie } from "../../types/movie";

interface IState {
  allMovies: Movie[];
  filteredMovies: Movie[];
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
    onFilterMovies: (state, action: PayloadAction<Movie[]>) => {
      state.filteredMovies = action.payload;
      state.currentPage = 1;
    },

    onPageChange: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { onFilterMovies, onPageChange } = moviesSlice.actions;
export default moviesSlice.reducer;
