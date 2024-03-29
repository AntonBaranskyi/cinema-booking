import { Box, Typography } from "@mui/material";
import { FormikProps, FormikValues } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import FormField from "../SignUpFormField";
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
        <FormField
          name={name.fullName}
          form={form}
          translatePath={translatePath.widget_signUp}
          placeholderKey="fullName_placeholder"
        />

        <FormField
          name={name.email}
          form={form}
          translatePath={translatePath.widget_signUp}
          placeholderKey="email_placeholder"
        />

        <FormField
          name={name.phone}
          form={form}
          translatePath={translatePath.widget_signUp}
          placeholderKey="phone_placeholder"
        />
      </Box>
    </>
  );
};
