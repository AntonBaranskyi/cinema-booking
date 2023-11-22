import { AppBar, Box, Button, Container } from "@mui/material";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { onToggleWidget } from "../../store/slices/CommonSilce";
import styles from "./WidgetFooter.module.scss";

export const WidgetFooter = () => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(onToggleWidget(false));
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
            disabled
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
