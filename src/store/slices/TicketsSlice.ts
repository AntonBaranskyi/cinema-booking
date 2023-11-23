import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ISeatData } from "../../types/seatsDataType";

type State = {
  ticketsByMovie: Record<string, Record<string, ISeatData[]>>;
  movieStats: Record<
    string,
    {
      sessions: Record<
        string,
        { ticketsMoviePrice: number; ticketsMovieCount: number }
      >;
    }
  >;
};

const initialState: State = {
  ticketsByMovie: {},
  movieStats: {},
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
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

      const ticketIndex = state.ticketsByMovie[movieId]?.[
        sessionTime
      ].findIndex((ticket) => ticket.id === ticketId);

      state.ticketsByMovie[movieId][sessionTime].splice(ticketIndex, 1);

      state.movieStats[movieId].sessions[sessionTime].ticketsMoviePrice =
        Object.values(state.ticketsByMovie[movieId]).reduce((acc, tickets) => {
          return (
            acc +
            tickets.reduce((accTicket, current) => {
              return (accTicket += current.price);
            }, 0)
          );
        }, 0);

      state.movieStats[movieId].sessions[sessionTime].ticketsMovieCount =
        Object.values(state.ticketsByMovie[movieId]).reduce((acc, tickets) => {
          return (acc += tickets.length);
        }, 0);
    },
  },
});

export const { onAddTicket, onDeleteTicket } = ticketsSlice.actions;

export default ticketsSlice.reducer;