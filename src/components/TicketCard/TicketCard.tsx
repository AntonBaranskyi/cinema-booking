import CloseIcon from "@mui/icons-material/Close";
import { Card, Typography } from "@mui/material";
import React from "react";

import { useTicketsData } from "../../hooks/useTicketsData";
import { ISeatData } from "../../types/seatsDataType";
import styles from "./TicketCard.module.scss";

type Props = {
  ticket: ISeatData;
};

export const TicketCard: React.FC<Props> = ({ ticket }) => {
  const { handleDeleteTicket } = useTicketsData();

  const onDeleteTicket = () => {
    handleDeleteTicket(ticket.id);
  };

  return (
    <Card className={styles.TicketCard}>
      <Typography>{ticket.row} ряд</Typography>
      <Typography>{ticket.seat} місце</Typography>
      <Typography> {ticket.price} грн</Typography>

      <CloseIcon className={styles.TicketIcon} onClick={onDeleteTicket} />
    </Card>
  );
};
