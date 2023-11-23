import { Box, Container, Grid } from "@mui/material";

import BookingList from "../BookingList";
import TicketsListWidget from "../TicketsListWidget";
import styles from "./WidgetMain.module.scss";

export const WidgetMain = () => {
  return (
    <Box className={styles.WidgetMain}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xl={8} sm={12} justifyContent="center">
            <BookingList />
          </Grid>

          <Grid item xl={4} sm={12}>
            <TicketsListWidget />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
