import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";

import { SEATS_DATA_REGULAR } from "../../constants/SeatsData";
import { useTicketsData } from "../../hooks/useTicketsData";
import styles from "./BookingList.module.scss";

export const BookingList = () => {
  const rows = new Set(SEATS_DATA_REGULAR.map((seat) => seat.row));

  const { handleChooseTicket, ticketsForCurrentMovie } = useTicketsData();

  return (
    <Box>
      <Typography variant="h1" textAlign="center" mb={5}>
        ЕКРАН
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
                    {`Ряд: ${seat.row}, Місце: ${seat.seat}, Ціна: 
                        ${seat.price}`}
                  </Typography>
                }
              >
                <Button
                  onClick={() => handleChooseTicket(seat)}
                  size="large"
                  variant={
                    ticketsForCurrentMovie.includes(seat)
                      ? "contained"
                      : "outlined"
                  }
                  className={styles.WidgetPlace}
                  color={
                    ticketsForCurrentMovie.includes(seat)
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
