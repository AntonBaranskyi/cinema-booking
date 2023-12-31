import { useEffect } from "react";

import { localStorageKeys } from "../constants/localStorageKeys";
import {
  onChangeCurrentMovie,
  onChangeCurrentSession,
} from "../store/slices/commonSlice";
import { onLoadMovieStats, onLoadTickets } from "../store/slices/ticketsSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useLocalStorage = () => {
  const dispatch = useAppDispatch();
  const { currentSession, currentMovieId } = useAppSelector(
    (state) => state.common,
  );

  const { ticketsByMovie, movieStats } = useAppSelector(
    (state) => state.tickets,
  );

  const { cards, selectedCard } = useAppSelector((state) => state.cards);

  useEffect(() => {
    const storedMovieStats = localStorage.getItem(localStorageKeys.movieStats);

    if (storedMovieStats) {
      dispatch(onLoadMovieStats(JSON.parse(storedMovieStats)));
    }
  }, [dispatch]);

  useEffect(() => {
    const storedTickets = localStorage.getItem(localStorageKeys.ticketsKey);

    if (storedTickets) {
      dispatch(onLoadTickets(JSON.parse(storedTickets)));
    }
  }, [dispatch]);

  useEffect(() => {
    const storedMovieId = localStorage.getItem(localStorageKeys.currentMovie);

    if (storedMovieId) {
      dispatch(onChangeCurrentMovie(storedMovieId));
    }
  }, [dispatch]);

  useEffect(() => {
    const storedMovieSession = localStorage.getItem(
      localStorageKeys.currentSession,
    );

    if (storedMovieSession) {
      dispatch(onChangeCurrentSession(currentSession));
    }
  }, [currentSession, dispatch]);

  useEffect(() => {
    localStorage.setItem(
      localStorageKeys.ticketsKey,
      JSON.stringify(ticketsByMovie),
    );
  }, [ticketsByMovie]);

  useEffect(() => {
    localStorage.setItem(
      localStorageKeys.movieStats,
      JSON.stringify(movieStats),
    );
  }, [movieStats]);

  useEffect(() => {
    localStorage.setItem(localStorageKeys.cards, JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem(
      localStorageKeys.selectedCard,
      JSON.stringify(selectedCard),
    );
  }, [selectedCard]);

  return { currentSession, currentMovieId, cards, selectedCard };
};
