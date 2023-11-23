import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";

import { SEATS_DATA_REGULAR } from "../../constants/SeatsData";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onAddTicket, onDeleteTicket } from "../../store/slices/TicketsSlice";
import { ISeatData } from "../../types/seatsDataType";
import styles from "./BookingList.module.scss";

export const BookingList = () => {
  const rows = new Set(SEATS_DATA_REGULAR.map((seat) => seat.row));

  const dispatch = useAppDispatch();
  const { ticketsByMovie } = useAppSelector((state) => state.tickets);

  const { currentMovieId } = useAppSelector((state) => state.common);

  const ticketsForCurrentMovie = ticketsByMovie[currentMovieId] || [];

  const handleSeatClick = (seat: ISeatData) => {
    const currentMovieTickets = ticketsByMovie[currentMovieId];

    if (currentMovieTickets?.includes(seat)) {
      dispatch(onDeleteTicket({ movieId: currentMovieId, ticketId: seat.id }));
    } else {
      dispatch(onAddTicket({ movieId: currentMovieId, ticket: seat }));
    }
  };

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
                  onClick={() => handleSeatClick(seat)}
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
