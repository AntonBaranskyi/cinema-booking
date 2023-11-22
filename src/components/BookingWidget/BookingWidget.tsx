import { Dialog } from "@mui/material";

import { useAppSelector } from "../../hooks/useAppSelector";
import WidgetFooter from "../WidgetFooter";
import WidgetHeader from "../WidgetHeader";
import WidgetMain from "../WidgetMain";

export const BookingWidget = () => {
  const { isOpenBooking } = useAppSelector((state) => state.common);

  return (
    <Dialog fullScreen open={isOpenBooking}>
      <WidgetHeader />
      <WidgetMain />
      <WidgetFooter />
    </Dialog>
  );
};
