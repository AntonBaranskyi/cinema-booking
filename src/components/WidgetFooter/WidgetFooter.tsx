import { AppBar, Box, Button, Container } from "@mui/material";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onToggleWidget } from "../../store/slices/CommonSilce";
import styles from "./WidgetFooter.module.scss";

export const WidgetFooter = () => {
  const dispatch = useAppDispatch();
  const { currentMovieId, currentSession } = useAppSelector(
    (state) => state.common,
  );
  const { ticketsByMovie } = useAppSelector((state) => state.tickets);

  const ticketsForCurrentMovie =
    ticketsByMovie[currentMovieId]?.[currentSession] || [];

  const handleCloseModal = () => {
    dispatch(onToggleWidget({ isOpen: false, movieId: "", session: "" }));
  };

  return (
    <AppBar
      position="static"
      sx={{ position: "fixed" }}
      className={styles.Footer}
    >
      <Container>
        <Box className={styles.FooterBtns}>
          <Button size="large" variant="contained" onClick={handleCloseModal}>
            Назад
          </Button>

          <Button
            disabled={ticketsForCurrentMovie.length === 0}
            size="large"
            variant="contained"
            onClick={handleCloseModal}
          >
            Продовжити
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
};
