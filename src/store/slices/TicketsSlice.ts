import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { localStorageKeys } from "../../constants/LocalStorageKeys";
import { ISeatData } from "../../types/seatsDataType";

type Tickets = Record<string, Record<string, ISeatData[]>>;
type MovieStats = Record<
  string,
  {
    sessions: Record<
      string,
      { ticketsMoviePrice: number; ticketsMovieCount: number }
    >;
  }
>;

type State = {
  ticketsByMovie: Tickets;
  movieStats: MovieStats;
};

const storedTickets = localStorage.getItem(localStorageKeys.ticketsKey);
const storedMovieStats = localStorage.getItem(localStorageKeys.movieStats);

const initialState: State = {
  ticketsByMovie: storedTickets ? JSON.parse(storedTickets) : ({} as Tickets),
  movieStats: storedMovieStats
    ? JSON.parse(storedMovieStats)
    : ({} as MovieStats),
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    onLoadTickets: (state, action: PayloadAction<Tickets>) => {
      state.ticketsByMovie = action.payload;
    },
    onLoadMovieStats: (state, action: PayloadAction<MovieStats>) => {
      state.movieStats = action.payload;
    },
    onAddTicket: (
      state,
      action: PayloadAction<{
        movieId: string;
        ticket: ISeatData;
        sessionTime: string;
      }>,
    ) => {
      const { movieId, ticket, sessionTime } = action.payload;

      state.ticketsByMovie[movieId] = state.ticketsByMovie[movieId] ?? {};
      state.ticketsByMovie[movieId][sessionTime] =
        state.ticketsByMovie[movieId][sessionTime] ?? [];

      state.ticketsByMovie[movieId][sessionTime].push(ticket);

      state.movieStats[movieId] = state.movieStats[movieId] ?? { sessions: {} };

      state.movieStats[movieId].sessions[sessionTime] = {
        ticketsMoviePrice: 0,
        ticketsMovieCount: 0,
      };

      state.movieStats[movieId].sessions[sessionTime].ticketsMoviePrice =
        state.ticketsByMovie[movieId][sessionTime].reduce(
          (accTicket, current) => accTicket + current.price,
          0,
        );

      state.movieStats[movieId].sessions[sessionTime].ticketsMovieCount =
        state.ticketsByMovie[movieId][sessionTime].length;
    },

    onDeleteTicket: (
      state,
      action: PayloadAction<{
        movieId: string;
        sessionTime: string;
        ticketId: number;
      }>,
    ) => {
      const { movieId, sessionTime, ticketId } = action.payload;

      if (
        state.ticketsByMovie[movieId] &&
        state.ticketsByMovie[movieId][sessionTime]
      ) {
        const ticketToRemove = state.ticketsByMovie[movieId][sessionTime].find(
          (ticket) => ticket.id === ticketId,
        );

        if (ticketToRemove) {
          const prevTotalPrice =
            state.movieStats[movieId]?.sessions?.[sessionTime]
              ?.ticketsMoviePrice || 0;
          const prevTotalCount =
            state.movieStats[movieId]?.sessions?.[sessionTime]
              ?.ticketsMovieCount || 0;

          state.ticketsByMovie[movieId][sessionTime] = state.ticketsByMovie[
            movieId
          ][sessionTime].filter((ticket) => ticket.id !== ticketId);

          state.movieStats[movieId].sessions[sessionTime].ticketsMoviePrice =
            prevTotalPrice - ticketToRemove.price;
          state.movieStats[movieId].sessions[sessionTime].ticketsMovieCount =
            prevTotalCount - 1;

          if (state.ticketsByMovie[movieId][sessionTime].length === 0) {
            delete state.ticketsByMovie[movieId][sessionTime];
            delete state.movieStats[movieId].sessions[sessionTime];
          }
        }
      }
    },
  },
});

export const { onAddTicket, onDeleteTicket, onLoadTickets, onLoadMovieStats } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
