import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onToggleExpireModal } from "../../store/slices/commonSlice";
import styles from "./ExpireDialog.module.scss";

export const ExpireDialog = () => {
  const { isExpireBooking } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleCloseDialog = () => {
    dispatch(onToggleExpireModal(false));
    navigate("/");
  };

  return (
    <Dialog open={isExpireBooking}>
      <DialogTitle textAlign="center">OOOPS!</DialogTitle>
      <DialogContent>
        <Typography variant="h6" textAlign="center" mb={4}>
          Your session time has expired!! Please come back to main page and try
          one more time
        </Typography>

        <Box className={styles.ExpireBtnWrapper}>
          <Button variant="contained" onClick={onHandleCloseDialog}>
            Back to main page
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
