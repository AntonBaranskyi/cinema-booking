import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { localStorageKeys } from "../../constants/LocalStorageKeys";
import { Language } from "../../types/langType";

const initialState = {
  currentLanguage: (localStorage.getItem("lang") || "en") as Language,
  isOpenBooking: false,
  isExpireBooking: false,
  currentMovieId: localStorage.getItem(localStorageKeys.currentMovie) as string,
  currentSession: localStorage.getItem(
    localStorageKeys.currentSession,
  ) as string,
};

const langSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    onChangeLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    },

    onToggleWidget: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
        movieId: string;
        session: string;
      }>,
    ) => {
      state.isOpenBooking = action.payload.isOpen;
      state.currentMovieId = action.payload.movieId;
      state.currentSession = action.payload.session;
    },

    onToggleExpireModal: (state, action: PayloadAction<boolean>) => {
      state.isExpireBooking = action.payload;
    },

    onChangeCurrentMovie: (state, action: PayloadAction<string>) => {
      state.currentMovieId = action.payload;
    },

    onChangeCurrentSession: (state, action: PayloadAction<string>) => {
      state.currentSession = action.payload;
    },
  },
});

export const {
  onChangeLanguage,
  onToggleWidget,
  onToggleExpireModal,
  onChangeCurrentMovie,
  onChangeCurrentSession,
} = langSlice.actions;
export default langSlice.reducer;
