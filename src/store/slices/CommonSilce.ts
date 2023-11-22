import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Language } from "../../types/langType";

const initialState = {
  currentLanguage: (localStorage.getItem("lang") || "en") as Language,
  isOpenBooking: true,
};

const langSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    onChangeLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    },

    onToggleWidget: (state, action: PayloadAction<boolean>) => {
      state.isOpenBooking = action.payload;
    },
  },
});

export const { onChangeLanguage, onToggleWidget } = langSlice.actions;
export default langSlice.reducer;
