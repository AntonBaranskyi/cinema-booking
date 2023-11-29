/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps, FormikValues, getIn } from "formik";

import PaymentForm from "../components/PaymentForm";
import SignUpForm from "../components/SignUpForm";
import { CardDataNameTypes, SignUpNamesType, Step } from "../types/stepType";
import { paymentSchema, validationSignUpSchema } from "./validationsSchemas";

export const baseSteps: Step[] = [
  {
    name: {
      fullName: "fullName",
      email: "email",
      phone: "phone",
    },
    component: SignUpForm,
    validationSchema: validationSignUpSchema,
  },

  {
    name: {
      fullName: "fullName",
      expiryDate: "expiryDate",
      cardNumber: "cardNumber",
      cvv: "cvv",
    },
    component: PaymentForm,
    validationSchema: paymentSchema,
  },
];

export const generateSteps = () => {
  return baseSteps;
};

export const generateInitialValues = (filteredSteps: Step[]) => {
  const initialValues: { [key: string]: any } = {};

  filteredSteps.forEach((step) => {
    if (step.name) {
      if ("fullName" in step.name) {
        const signUpNames = step.name as SignUpNamesType;
        Object.keys(signUpNames).forEach((key) => {
          initialValues[key] = "";
        });
      } else if ("cardNumber" in step.name) {
        const cardDataNames = step.name as CardDataNameTypes;
        Object.keys(cardDataNames).forEach((key) => {
          initialValues[key] = "";
        });
      }
    }
  });

  return initialValues;
};

export const getStepChema = (currentIndex: number, steps: Step[]) => {
  return steps[currentIndex].validationSchema;
};

export const getInputProps = (
  name: string,
  formik: FormikProps<FormikValues>,
) => {
  const value = getIn(formik.values, name);
  const error = getIn(formik.errors, name) && getIn(formik.touched, name);

  const props = {
    id: name,
    name,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    value: value || "",
    error,
  };

  return props;
};
