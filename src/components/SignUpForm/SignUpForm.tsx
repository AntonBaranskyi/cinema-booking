import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { ErrorMessage, FormikProps, FormikValues } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
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
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h3" textAlign="center" mb={2}>
        {t(`${translatePath.widget_signUp}.title`)}
      </Typography>

      <Box className={styles.FormContainer}>
        <Box className={styles.FormBoxItem}>
          <InputLabel>
            {t(`${translatePath.widget_signUp}.fullName`)} *
          </InputLabel>
          <TextField
            placeholder={t(
              `${translatePath.widget_signUp}.fullName_placeholder`,
            )}
            type="text"
            className={styles.FormInputItem}
            {...getInputProps(name.fullName, form)}
          />
          <ErrorMessage name={name.fullName} />
        </Box>

        <Box className={styles.FormBoxItem}>
          <InputLabel>{t(`${translatePath.widget_signUp}.email`)} *</InputLabel>
          <TextField
            type="email"
            placeholder={t(`${translatePath.widget_signUp}.email_placeholder`)}
            className={styles.FormInputItem}
            {...getInputProps(name.email, form)}
          />
          <ErrorMessage name={name.email} />
        </Box>

        <Box className={styles.FormBoxItem}>
          <InputLabel>{t(`${translatePath.widget_signUp}.phone`)}</InputLabel>
          <TextField
            type="tel"
            placeholder={t(`${translatePath.widget_signUp}.phone_placeholder`)}
            className={styles.FormInputItem}
            {...getInputProps(name.phone, form)}
          />

          <ErrorMessage name={name.phone} />
        </Box>
      </Box>
    </>
  );
};
