import { Box, Dialog, DialogContent, FormGroup } from "@mui/material";
import { Formik, FormikProps, FormikValues } from "formik";
import { useState } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useTicketsData } from "../../hooks/useTicketsData";
import {
  onTogglePaymentModal,
  onToggleThanksModal,
  onToggleWidget,
} from "../../store/slices/commonSlice";
import { onPurchaseTickets } from "../../store/slices/ticketsSlice";
import {
  generateInitialValues,
  generateSteps,
  getStepChema,
} from "../../utils/stepsForm";
import FormNavigation from "../FormNavigation";
import styles from "./PaymentWidget.module.scss";

export const PaymentWidget = () => {
  const dispatch = useAppDispatch();
  const { currentMovieId, currentSession, isOpenPayment } = useAppSelector(
    (state) => state.common,
  );

  const { ticketsForCurrentMovie } = useTicketsData();
  const [steps] = useState(generateSteps());

  const [initialValues] = useState(generateInitialValues(steps));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBack = () => {
    setCurrentIndex((oldIndex) => oldIndex - 1);
  };

  const handleContinue = () => {
    setCurrentIndex((oldIndex) => oldIndex + 1);
  };

  const renderCurrentStep = (formikProps: FormikProps<FormikValues>) => {
    const step = steps[currentIndex];

    const commonProps = {
      name: step.name,
      form: formikProps,
    };

    const StepComponent = step.component;

    return <StepComponent {...commonProps} />;
  };

  const onHandleSubmit = () => {
    const currentIds = ticketsForCurrentMovie.map((ticket) => ticket.id);

    dispatch(
      onPurchaseTickets({
        movieId: currentMovieId,
        sessionTime: currentSession,
        ticketsIds: currentIds,
      }),
    );

    dispatch(onToggleThanksModal(true));
    dispatch(onToggleWidget({ isOpen: false, movieId: "", session: "" }));
    dispatch(onTogglePaymentModal(false));
  };

  return (
    <Dialog fullScreen open={isOpenPayment}>
      <DialogContent>
        <FormGroup className={styles.PaymentFormWrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={getStepChema(currentIndex, steps)}
            onSubmit={onHandleSubmit}
            validateOnMount
          >
            {(formikProps: FormikProps<FormikValues>) => (
              <>
                <Box className={styles.PaymentForm}>
                  {renderCurrentStep(formikProps)}
                  <FormNavigation
                    currentStep={currentIndex}
                    handleContinue={handleContinue}
                    handleBack={handleBack}
                    onSubmit={onHandleSubmit}
                  />
                </Box>
              </>
            )}
          </Formik>
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
};
