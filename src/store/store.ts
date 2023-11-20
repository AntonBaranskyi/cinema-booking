import { configureStore } from "@reduxjs/toolkit";

import language from "./slices/LangSilce";
import movies from "./slices/MoviesSlice";

export const store = configureStore({
  reducer: {
    movies,
    language,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
