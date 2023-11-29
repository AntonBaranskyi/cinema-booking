import { Box, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onToggleThanksModal } from "../../store/slices/commonSilce";
import styles from "./ThanksModal.module.scss";

export const ThanksModal = () => {
  const { isOpenThanks } = useAppSelector((state) => state.common);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(onToggleThanksModal(false));
  };

  return (
    <Modal open={isOpenThanks} onClose={handleClose}>
      <Box className={styles.ThanksText}>
        <Typography color="white" variant="h4" textAlign="center">
          {t(`${translatePath.widget_card}.success`)}
        </Typography>
      </Box>
    </Modal>
  );
};
