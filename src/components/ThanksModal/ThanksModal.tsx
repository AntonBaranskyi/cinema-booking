import { Box, Modal, Typography } from "@mui/material";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onToggleThanksModal } from "../../store/slices/commonSilce";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ThanksModal = () => {
  const { isOpenThanks } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(onToggleThanksModal(false));
  };

  return (
    <Modal open={isOpenThanks} onClose={handleClose}>
      <Box sx={style}>
        <Typography color="white" variant="h4" textAlign="center">
          Your payment was succesfull.
        </Typography>
      </Box>
    </Modal>
  );
};
