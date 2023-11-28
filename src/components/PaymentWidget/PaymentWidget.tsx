import { Dialog, DialogContent, FormGroup } from "@mui/material";
import { Formik, FormikProps, FormikValues } from "formik";
import { useState } from "react";

import { useAppSelector } from "../../hooks/useAppSelector";
import {
  generateInitialValues,
  generateSteps,
  getStepChema,
} from "../../utils/stepsForm";
import FormNavigation from "../FormNavigation";
import styles from "./PaymentWidget.module.scss";

export const PaymentWidget = () => {
  const { isOpenPayment } = useAppSelector((state) => state.common);
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

  return (
    <Dialog fullScreen open={isOpenPayment}>
      <DialogContent>
        <FormGroup className={styles.PaymentFormWrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={getStepChema(currentIndex, steps)}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {(formikProps: FormikProps<FormikValues>) => (
              <form
                onSubmit={formikProps.handleSubmit}
                className={styles.PaymentForm}
              >
                {renderCurrentStep(formikProps)}
                <FormNavigation
                  currentStep={currentIndex}
                  handleContinue={handleContinue}
                  handleBack={handleBack}
                  maxSteps={steps.length}
                />
              </form>
            )}
          </Formik>
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
};
