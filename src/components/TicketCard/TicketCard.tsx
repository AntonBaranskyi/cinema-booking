import CloseIcon from "@mui/icons-material/Close";
import { Card, Typography } from "@mui/material";
import React from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onDeleteTicket } from "../../store/slices/TicketsSlice";
import { ISeatData } from "../../types/seatsDataType";
import styles from "./TicketCard.module.scss";

type Props = {
  ticket: ISeatData;
};

export const TicketCard: React.FC<Props> = ({ ticket }) => {
  const dispatch = useAppDispatch();
  const { currentMovieId, currentSession } = useAppSelector(
    (state) => state.common,
  );

  const handleDeleteTicket = () => {
    dispatch(
      onDeleteTicket({
        movieId: currentMovieId,
        ticketId: ticket.id,
        sessionTime: currentSession,
      }),
    );
  };

  return (
    <Card className={styles.TicketCard}>
      <Typography>{ticket.row} ряд</Typography>
      <Typography>{ticket.seat} місце</Typography>
      <Typography> {ticket.price} грн</Typography>

      <CloseIcon className={styles.TicketIcon} onClick={handleDeleteTicket} />
    </Card>
  );
};
