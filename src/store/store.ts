import { configureStore } from "@reduxjs/toolkit";

import common from "./slices/CommonSilce";
import movies from "./slices/MoviesSlice";
import tickets from "./slices/TicketsSlice";

export const store = configureStore({
  reducer: {
    movies,
    common,
    tickets,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
