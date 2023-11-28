import { AppBar, Box, Button, Container } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTicketsData } from "../../hooks/useTicketsData";
import { onTogglePaymentModal } from "../../store/slices/commonSilce";
import styles from "./WidgetFooter.module.scss";

export const WidgetFooter = () => {
  const { handleCloseTicketWidget, ticketsForCurrentMovie } = useTicketsData();

  const dispatch = useAppDispatch();

  const handleContinue = () => {
    dispatch(onTogglePaymentModal(true));
  };

  const { t } = useTranslation();

  return (
    <AppBar position="static" className={styles.Footer}>
      <Container>
        <Box className={styles.FooterBtns}>
          <Button
            size="large"
            variant="contained"
            onClick={handleCloseTicketWidget}
          >
            {t(`${translatePath.widget_footer}.back`)}
          </Button>

          <Button
            disabled={ticketsForCurrentMovie.length === 0}
            size="large"
            variant="contained"
            onClick={handleContinue}
          >
            {t(`${translatePath.widget_footer}.continue`)}
          </Button>
        </Box>
      </Container>
    </AppBar>
  );
};
