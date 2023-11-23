import { AppBar, Box, Button, Container } from "@mui/material";

import { useTicketsData } from "../../hooks/useTicketsData";
import styles from "./WidgetFooter.module.scss";

export const WidgetFooter = () => {
  const { handleCloseTicketWidget, ticketsForCurrentMovie } = useTicketsData();

  return (
    <AppBar
      position="static"
      sx={{ position: "fixed" }}
      className={styles.Footer}
    >
      <Container>
        <Box className={styles.FooterBtns}>
          <Button
            size="large"
            variant="contained"
            onClick={handleCloseTicketWidget}
          >
            Назад
          </Button>

          <Button
            disabled={ticketsForCurrentMovie.length === 0}
            size="large"
            variant="contained"
            // onClick={}
          >
            Продовжити
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
};
