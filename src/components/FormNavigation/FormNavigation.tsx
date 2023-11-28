import { Box, Button } from "@mui/material";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onTogglePaymentModal } from "../../store/slices/commonSilce";

type Props = {
  currentStep: number;
  handleContinue: () => void;
  handleBack: () => void;
  maxSteps: number;
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

  const { isValid, validateForm } = useFormikContext();

  useEffect(() => {
    // console.log("FormNavigation - useEffect", currentStep, selectedCard);
    validateForm();
  }, [currentStep, validateForm, selectedCard]);

  const handlePrev = () => {
    dispatch(onTogglePaymentModal(false));
  };

  // console.log("FormNavigation - Render", isValid, selectedCard);

  const handleFormSubmit = () => {
    console.log("submitting");

    onSubmit();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {currentStep === 0 ? (
        <>
          <Button variant="text" onClick={handlePrev}>
            Back to the tickets widget
          </Button>

          <Button
            variant="contained"
            disabled={!isValid}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </>
      ) : (
        <>
          <Button variant="text" onClick={handleBack}>
            Back to the auth form
          </Button>

          <Button
            variant="contained"
            disabled={!isValid && !selectedCard}
            onClick={handleFormSubmit}
            type="submit"
          >
            Buy
          </Button>
        </>
      )}
    </Box>
  );
};
