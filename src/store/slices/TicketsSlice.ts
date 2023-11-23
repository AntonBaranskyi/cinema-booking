import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ISeatData } from "../../types/seatsDataType";

type State = {
  ticketsByMovie: Record<string, ISeatData[]>;
  movieStats: Record<
    string,
    { ticketsMoviePrice: number; ticketsMovieCount: number }
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
      action: PayloadAction<{ movieId: string; ticket: ISeatData }>,
    ) => {
      const { movieId, ticket } = action.payload;

      state.ticketsByMovie[movieId] = state.ticketsByMovie[movieId] || [];
      state.ticketsByMovie[movieId].push(ticket);

      state.movieStats[movieId] = {
        ticketsMoviePrice: 0,
        ticketsMovieCount: 0,
      };

      state.movieStats[movieId].ticketsMoviePrice = (
        state.ticketsByMovie[movieId] || []
      ).reduce((acc, current) => {
        return (acc += current.price);
      }, 0);

      state.movieStats[movieId].ticketsMovieCount = (
        state.ticketsByMovie[movieId] || []
      ).length;
    },

    onDeleteTicket: (
      state,
      action: PayloadAction<{ movieId: string; ticketId: number }>,
    ) => {
      const { movieId, ticketId } = action.payload;
      state.ticketsByMovie[movieId] = state.ticketsByMovie[movieId].filter(
        (ticket) => ticket.id !== ticketId,
      );

      state.movieStats[movieId].ticketsMoviePrice = state.ticketsByMovie[
        movieId
      ].reduce((acc, current) => {
        return (acc += current.price);
      }, 0);

      state.movieStats[movieId].ticketsMovieCount =
        state.ticketsByMovie[movieId].length;
    },
  },
});

export const { onAddTicket, onDeleteTicket } = ticketsSlice.actions;

export default ticketsSlice.reducer;
