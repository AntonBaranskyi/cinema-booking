import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";

import styles from "./WidgetMain.module.scss";

const seatsData = [
  { id: 1, row: 1, seat: 1, price: 10 },
  { id: 2, row: 1, seat: 2, price: 10 },
  { id: 3, row: 1, seat: 3, price: 10 },
  { id: 4, row: 1, seat: 4, price: 10 },
  { id: 5, row: 1, seat: 5, price: 10 },
  { id: 6, row: 1, seat: 6, price: 10 },

  { id: 1, row: 2, seat: 1, price: 10 },
  { id: 2, row: 2, seat: 2, price: 10 },
  { id: 3, row: 2, seat: 3, price: 10 },
  { id: 4, row: 2, seat: 4, price: 10 },
  { id: 5, row: 2, seat: 5, price: 10 },
  { id: 6, row: 2, seat: 6, price: 10 },

  { id: 1, row: 3, seat: 1, price: 10 },
  { id: 2, row: 3, seat: 2, price: 10 },
  { id: 3, row: 3, seat: 3, price: 10 },
  { id: 4, row: 3, seat: 4, price: 10 },
  { id: 5, row: 3, seat: 5, price: 10 },
  { id: 6, row: 3, seat: 6, price: 10 },

  { id: 1, row: 4, seat: 1, price: 10 },
  { id: 2, row: 4, seat: 2, price: 10 },
  { id: 3, row: 4, seat: 3, price: 10 },
  { id: 4, row: 4, seat: 4, price: 10 },
  { id: 5, row: 4, seat: 5, price: 10 },
  { id: 6, row: 4, seat: 6, price: 10 },
];

export const WidgetMain = () => {
  const rows = new Set(seatsData.map((seat) => seat.row));

  return (
    <Box className={styles.WidgetMain}>
      <Container maxWidth="xl">
        <Box>
          <Typography variant="h1" textAlign="center" mb={5}>
            ЕКРАН
          </Typography>
          {[...rows].map((row) => (
            <Grid container spacing={1} key={`row-${row}`}>
              {seatsData
                .filter((seat) => seat.row === row)
                .map((seat) => (
                  <Grid item key={seat.id}>
                    <Tooltip
                      arrow
                      className={styles.TicketModal}
                      title={
                        <Typography>
                          {`Ряд: ${seat.row}, Місце: ${seat.seat}, Ціна: 
                        ${seat.price}`}
                        </Typography>
                      }
                    >
                      <Button
                        size="large"
                        variant="outlined"
                        className={styles.WidgetPlace}
                      >
                        {seat.seat}
                      </Button>
                    </Tooltip>
                  </Grid>
                ))}
            </Grid>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
