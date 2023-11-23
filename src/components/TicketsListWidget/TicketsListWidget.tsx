import { Box, Typography } from "@mui/material";

import { useAppSelector } from "../../hooks/useAppSelector";
import TicketCard from "../TicketCard";
import styles from "./TicketsListWidget.module.scss";

export const TicketsListWidget = () => {
  const { ticketsByMovie, movieStats } = useAppSelector(
    (state) => state.tickets,
  );

  const { currentMovieId } = useAppSelector((state) => state.common);

  const ticketsForCurrentMovie = ticketsByMovie[currentMovieId] || [];

  const totalTicketsPrice = movieStats[currentMovieId]?.ticketsMoviePrice || 0;
  const totalTicketsCount = movieStats[currentMovieId]?.ticketsMovieCount || 0;

  return (
    <Box className={styles.TiketsWrapper}>
      <Typography variant="h5" textAlign="center">
        Tickets List
      </Typography>

      <Box className={styles.TicketsInfo}>
        <Typography variant="h6" textAlign="center">
          Total Tickets: {totalTicketsCount}
        </Typography>
        <Typography variant="h6" textAlign="center">
          Total Amount: {totalTicketsPrice}$
        </Typography>
      </Box>

      {ticketsForCurrentMovie.map((ticket) => (
        <TicketCard ticket={ticket} key={ticket.id} />
      ))}
    </Box>
  );
};
