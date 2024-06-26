import { configureStore } from "@reduxjs/toolkit";

import { movieAPI } from "../services/moviesService";
import cards from "./slices/cardSlice";
import common from "./slices/commonSlice";
import movies from "./slices/moviesSlice";
import tickets from "./slices/ticketsSlice";

export const store = configureStore({
  reducer: {
    movies,
    common,
    tickets,
    cards,
    [movieAPI.reducerPath]: movieAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
