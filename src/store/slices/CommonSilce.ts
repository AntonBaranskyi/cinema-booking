import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Language } from "../../types/langType";

const initialState = {
  currentLanguage: (localStorage.getItem("lang") || "en") as Language,
};

const langSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    onChangeLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { onChangeLanguage } = langSlice.actions;
export default langSlice.reducer;
