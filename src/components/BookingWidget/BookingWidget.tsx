import { Box, Dialog } from "@mui/material";

import { useAppSelector } from "../../hooks/useAppSelector";
import WidgetFooter from "../WidgetFooter";
import WidgetHeader from "../WidgetHeader";
import WidgetMain from "../WidgetMain";
import styles from "./BookingWidget.module.scss";

export const BookingWidget = () => {
  const { isOpenBooking } = useAppSelector((state) => state.common);

  return (
    <Dialog fullScreen open={isOpenBooking}>
      <Box className={styles.WidgetContainer}>
        <WidgetHeader />
        <WidgetMain />
        <WidgetFooter />
      </Box>
    </Dialog>
  );
};
