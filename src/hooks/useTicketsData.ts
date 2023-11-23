import { onToggleWidget } from "../store/slices/CommonSilce";
import { onAddTicket, onDeleteTicket } from "../store/slices/TicketsSlice";
import { ISeatData } from "../types/seatsDataType";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useTicketsData = () => {
  const dispatch = useAppDispatch();
  const { currentMovieId, currentSession } = useAppSelector(
    (state) => state.common,
  );

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
    if (ticketsForCurrentMovie?.includes(place)) {
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

  return {
    ticketsForCurrentMovie,
    totalTicketsPrice,
    totalTicketsCount,
    handleCloseTicketWidget,
    handleChooseTicket,
    handleDeleteTicket,
  };
};
