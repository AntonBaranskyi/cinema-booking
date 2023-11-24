import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { SEATS_DATA_REGULAR } from "../../constants/SeatsData";
import { translatePath } from "../../constants/i18nPath";
import { useTicketsData } from "../../hooks/useTicketsData";
import styles from "./BookingList.module.scss";

export const BookingList = () => {
  const rows = new Set(SEATS_DATA_REGULAR.map((seat) => seat.row));

  const { handleChooseTicket, ticketsForCurrentMovie } = useTicketsData();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography variant="h1" textAlign="center" mb={5}>
        {t(`${translatePath.widget_main}.screen`)}
      </Typography>
      {[...rows].map((row) => (
        <Grid
          container
          spacing={1}
          key={`row-${row}`}
          sx={{ justifyContent: "center", marginBottom: 1 }}
        >
          {SEATS_DATA_REGULAR.filter((seat) => seat.row === row).map((seat) => (
            <Grid item key={seat.id} spacing={1}>
              <Tooltip
                arrow
                className={styles.check}
                title={
                  <Typography>
                    {t(`${translatePath.widget_main}.ticket_row`)} : {seat.row},
                    {t(`${translatePath.widget_main}.ticket_place`)} :
                    {seat.seat} {t(`${translatePath.widget_main}.ticket_price`)}
                    :{seat.price}
                  </Typography>
                }
              >
                <Button
                  onClick={() => handleChooseTicket(seat)}
                  size="large"
                  variant={
                    ticketsForCurrentMovie.some(
                      (ticket) => ticket.id === seat.id,
                    )
                      ? "contained"
                      : "outlined"
                  }
                  className={styles.WidgetPlace}
                  color={
                    ticketsForCurrentMovie.some(
                      (ticket) => ticket.id === seat.id,
                    )
                      ? "warning"
                      : "primary"
                  }
                >
                  {seat.seat}
                </Button>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      ))}
    </Box>
  );
};
