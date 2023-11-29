import { Box, Button } from "@mui/material";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onTogglePaymentModal } from "../../store/slices/commonSilce";
import styles from "./FormNavigation.module.scss";

type Props = {
  currentStep: number;
  handleContinue: () => void;
  handleBack: () => void;
  onSubmit: () => void;
};

export const FormNavigation: React.FC<Props> = ({
  currentStep,
  handleBack,
  handleContinue,
  onSubmit,
}) => {
  const { selectedCard } = useAppSelector((state) => state.cards);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { isValid, validateForm } = useFormikContext();

  useEffect(() => {
    validateForm();
  }, [currentStep, validateForm, selectedCard]);

  const handlePrev = () => {
    dispatch(onTogglePaymentModal(false));
  };

  return (
    <Box className={styles.NavigationWrapper}>
      {currentStep === 0 ? (
        <>
          <Button variant="text" onClick={handlePrev}>
            {t(`${translatePath.widget_signUp}.back`)}
          </Button>

          <Button
            variant="contained"
            disabled={!isValid}
            onClick={handleContinue}
          >
            {t(`${translatePath.widget_signUp}.continue`)}
          </Button>
        </>
      ) : (
        <>
          <Button variant="text" onClick={handleBack}>
            {t(`${translatePath.widget_card}.back`)}
          </Button>

          <Button
            variant="contained"
            disabled={!isValid && !selectedCard}
            onClick={onSubmit}
            type="submit"
          >
            {t(`${translatePath.widget_card}.buy`)}
          </Button>
        </>
      )}
    </Box>
  );
};
