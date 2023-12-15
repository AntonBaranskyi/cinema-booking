/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Yup from "yup";

export type SignUpNamesType = {
  fullName: string;
  email: string;
  phone: string;
};

export type CardDataNameTypes = {
  fullName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

export type Step = {
  name: SignUpNamesType | CardDataNameTypes | null;
  component: React.ComponentType<any>;
  validationSchema: Yup.Schema<any>;
};
