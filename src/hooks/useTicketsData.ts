import { useEffect } from "react";

import { localStorageKeys } from "../constants/localStorageKeys";
import { onToggleWidget } from "../store/slices/commonSilce";
import { onAddTicket, onDeleteTicket } from "../store/slices/ticketsSlice";
import { ISeatData } from "../types/seatsDataType";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { useLocalStorage } from "./useLocalStorage";

export const useTicketsData = () => {
  const dispatch = useAppDispatch();
  const { currentMovieId, currentSession } = useLocalStorage();

  const { ticketsByMovie, movieStats } = useAppSelector(
    (state) => state.tickets,
  );

  const ticketsForCurrentMovie =
    ticketsByMovie[currentMovieId]?.[currentSession] || [];

  const totalTicketsPrice =
    movieStats[currentMovieId]?.sessions?.[currentSession]?.ticketsMoviePrice ||
    0;
  const totalTicketsCount =
    movieStats[currentMovieId]?.sessions?.[currentSession]?.ticketsMovieCount ||
    0;

  const handleChooseTicket = (place: ISeatData) => {
    const existingTicketIndex = ticketsForCurrentMovie.findIndex(
      (ticket) => ticket.id === place.id,
    );

    if (existingTicketIndex !== -1) {
      dispatch(
        onDeleteTicket({
          movieId: currentMovieId,
          ticketId: place.id,
          sessionTime: currentSession,
        }),
      );
    } else {
      dispatch(
        onAddTicket({
          movieId: currentMovieId,
          ticket: place,
          sessionTime: currentSession,
        }),
      );
    }
  };

  const handleDeleteTicket = (ticketId: number) => {
    dispatch(
      onDeleteTicket({
        movieId: currentMovieId,
        ticketId: ticketId,
        sessionTime: currentSession,
      }),
    );
  };

  const handleCloseTicketWidget = () => {
    dispatch(onToggleWidget({ isOpen: false, movieId: "", session: "" }));
  };

  useEffect(() => {
    localStorage.setItem(localStorageKeys.currentSession, currentSession);
  }, [currentSession]);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.currentMovie, currentMovieId);
  }, [currentMovieId]);

  return {
    ticketsForCurrentMovie,
    totalTicketsPrice,
    totalTicketsCount,
    handleCloseTicketWidget,
    handleChooseTicket,
    handleDeleteTicket,
  };
};
