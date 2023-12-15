import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import { useTicketsData } from "../../hooks/useTicketsData";
import TicketCard from "../TicketCard";
import styles from "./TicketsListWidget.module.scss";

export const TicketsListWidget = () => {
  const { notSellTickets, totalTicketsCount, totalTicketsPrice } =
    useTicketsData();

  const { t } = useTranslation();

  return (
    <Box className={styles.TiketsWrapper}>
      <Typography variant="h5" textAlign="center">
        {t(`${translatePath.widget_main}.tickets_list`)}
      </Typography>

      <Box className={styles.TicketsInfo}>
        <Typography variant="h6" textAlign="center">
          {t(`${translatePath.widget_main}.total_tickets`)}: {totalTicketsCount}
        </Typography>
        <Typography variant="h6" textAlign="center">
          {t(`${translatePath.widget_main}.total_amount`)}: {totalTicketsPrice}$
        </Typography>
      </Box>

      <Box className={styles.TicketsBox}>
        {notSellTickets.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.id} />
        ))}
      </Box>
    </Box>
  );
};
