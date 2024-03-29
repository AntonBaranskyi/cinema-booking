import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { FILTERS } from "../types/filterEnum";
import { IMovieServer, IMovieServerData } from "../types/movieServer";
import { SORT } from "../types/sortEnum";

export const movieAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    headers: {
      Accept: "application/json",
    },
  }),
  reducerPath: "Movies",
  endpoints: (build) => ({
    getMovies: build.query<
      IMovieServerData,
      {
        page: number;
        query: string;
        sort: SORT;
        filter: FILTERS;
      }
    >({
      query: ({ page, query, sort, filter }) => ({
        url: `/movies?${page ? `page=${page}` : ""}${
          query ? `&query=${query}` : ""
        }${sort ? `&sort=${sort}` : ""}${
          filter !== FILTERS.ALL ? `&filter=${filter}` : ""
        }`,
      }),
    }),

    getSingleMovie: build.query<IMovieServer, { id: string; name?: string }>({
      query: ({ id, name }) => ({
        url: `/movies/${id}${name ? `&name=${name}` : ""}`,
      }),
    }),

    getUpcomingMovies: build.query<IMovieServer[], void>({
      query: () => ({
        url: "movies/upcoming",
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetSingleMovieQuery,
  useGetUpcomingMoviesQuery,
} = movieAPI;
