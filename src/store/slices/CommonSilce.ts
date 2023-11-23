import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Language } from "../../types/langType";

const initialState = {
  currentLanguage: (localStorage.getItem("lang") || "en") as Language,
  isOpenBooking: false,
  isExpireBooking: false,
  currentMovieId: "",
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
      action: PayloadAction<{ isOpen: boolean; movieId: string }>,
    ) => {
      state.isOpenBooking = action.payload.isOpen;
      state.currentMovieId = action.payload.movieId;
    },

    onToggleExpireModal: (state, action: PayloadAction<boolean>) => {
      state.isExpireBooking = action.payload;
    },
  },
});

export const { onChangeLanguage, onToggleWidget, onToggleExpireModal } =
  langSlice.actions;
export default langSlice.reducer;
