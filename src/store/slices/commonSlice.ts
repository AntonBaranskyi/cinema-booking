import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { localStorageKeys } from "../../constants/localStorageKeys";
import { Language } from "../../types/langType";

type State = {
  currentLanguage: Language;
  isOpenBooking: boolean;
  isExpireBooking: boolean;
  isOpenPayment: boolean;
  isOpenThanks: boolean;
  currentMovieId: string;
  currentSession: string;
  isOpenYoutubeModal: boolean;
};

const initialState: State = {
  currentLanguage: (localStorage.getItem("lang") || "en") as Language,
  isOpenBooking: false,
  isExpireBooking: false,
  isOpenPayment: false,
  currentMovieId: localStorage.getItem(localStorageKeys.currentMovie) as string,
  currentSession: localStorage.getItem(
    localStorageKeys.currentSession,
  ) as string,
  isOpenThanks: false,
  isOpenYoutubeModal: false,
};

const commonSlice = createSlice({
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

    onTogglePaymentModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenPayment = action.payload;
    },

    onToggleExpireModal: (state, action: PayloadAction<boolean>) => {
      state.isExpireBooking = action.payload;
    },

    onToggleThanksModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenThanks = action.payload;
    },

    onChangeCurrentMovie: (state, action: PayloadAction<string>) => {
      state.currentMovieId = action.payload;
    },

    onChangeCurrentSession: (state, action: PayloadAction<string>) => {
      state.currentSession = action.payload;
    },

    onToggleYoutubeModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenYoutubeModal = action.payload;
    },
  },
});

export const {
  onChangeLanguage,
  onToggleWidget,
  onToggleExpireModal,
  onChangeCurrentMovie,
  onChangeCurrentSession,
  onTogglePaymentModal,
  onToggleThanksModal,
  onToggleYoutubeModal,
} = commonSlice.actions;
export default commonSlice.reducer;
