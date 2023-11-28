import { configureStore } from "@reduxjs/toolkit";

import cards from "./slices/cardSlice";
import common from "./slices/commonSilce";
import movies from "./slices/moviesSlice";
import tickets from "./slices/ticketsSlice";

export const store = configureStore({
  reducer: {
    movies,
    common,
    tickets,
    cards,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
