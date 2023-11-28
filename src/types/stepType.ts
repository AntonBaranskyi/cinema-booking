/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Yup from "yup";

type SignUpNamesType = {
  fullName: string;
  email: string;
  phone: string;
};

type CardDataNameTypes = {
  fullName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

export type Step = {
  name: SignUpNamesType | CardDataNameTypes;
  component: React.ElementType;
  validationSchema: Yup.Schema<any>;
};
