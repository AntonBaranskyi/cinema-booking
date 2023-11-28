import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { ErrorMessage, FormikProps, FormikValues } from "formik";
import React from "react";

import { getInputProps } from "../../utils/stepsForm";
import styles from "./SignUpForm.module.scss";

type Props = {
  form: FormikProps<FormikValues>;
  name: {
    fullName: string;
    email: string;
    phone: string;
  };
};

export const SignUpForm: React.FC<Props> = ({ form, name }) => {
  return (
    <>
      <Typography variant="h3" textAlign="center" mb={2}>
        Sign up user
      </Typography>

      <Box className={styles.FormContainer}>
        <Box className={styles.FormBoxItem}>
          <InputLabel>Full name *</InputLabel>
          <TextField
            placeholder="Write your name"
            type="text"
            className={styles.FormInputItem}
            {...getInputProps(name.fullName, form)}
          />
          <ErrorMessage name={name.fullName} />
        </Box>

        <Box className={styles.FormBoxItem}>
          <InputLabel>Email *</InputLabel>
          <TextField
            type="email"
            placeholder="Write your email"
            className={styles.FormInputItem}
            {...getInputProps(name.email, form)}
          />
          <ErrorMessage name={name.email} />
        </Box>

        <Box className={styles.FormBoxItem}>
          <InputLabel>Phone number</InputLabel>
          <TextField
            type="tel"
            placeholder="Write your phone number"
            className={styles.FormInputItem}
            {...getInputProps(name.phone, form)}
          />

          <ErrorMessage name={name.phone} />
        </Box>
      </Box>
    </>
  );
};
