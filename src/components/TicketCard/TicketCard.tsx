import CloseIcon from "@mui/icons-material/Close";
import { Card, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import { useTicketsData } from "../../hooks/useTicketsData";
import { ISeatData } from "../../types/seatsDataType";
import styles from "./TicketCard.module.scss";

type Props = {
  ticket: ISeatData;
};

export const TicketCard: React.FC<Props> = ({ ticket }) => {
  const { handleDeleteTicket } = useTicketsData();

  const { t } = useTranslation();

  const onDeleteTicket = () => {
    handleDeleteTicket(ticket.id);
  };

  return (
    <Card className={styles.TicketCard}>
      <Typography>
        {ticket.row} {t(`${translatePath.widget_main}.ticket_row`)}
      </Typography>
      <Typography>
        {ticket.seat} {t(`${translatePath.widget_main}.ticket_place`)}
      </Typography>
      <Typography>
        {ticket.price} {t(`${translatePath.widget_main}.ticket_price`)}
      </Typography>

      <CloseIcon className={styles.TicketIcon} onClick={onDeleteTicket} />
    </Card>
  );
};
