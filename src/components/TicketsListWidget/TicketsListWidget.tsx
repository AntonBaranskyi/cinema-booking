import { Box, Typography } from "@mui/material";

import { useTicketsData } from "../../hooks/useTicketsData";
import TicketCard from "../TicketCard";
import styles from "./TicketsListWidget.module.scss";

export const TicketsListWidget = () => {
  const { ticketsForCurrentMovie, totalTicketsCount, totalTicketsPrice } =
    useTicketsData();

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
