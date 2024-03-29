import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, FormikProps, FormikValues } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import { getInputProps } from "../../utils/stepsForm";
import styles from "./SignUpFormField.module.scss";

type Props = {
  name: string;
  form: FormikProps<FormikValues>;
  translatePath: string;
  placeholderKey: string;
};

export const SignUpFormField: React.FC<Props> = ({
  name,
  form,
  translatePath,
  placeholderKey,
}) => {
  const { t } = useTranslation();

  return (
    <Box className={styles.FormBoxItem}>
      <InputLabel>{t(`${translatePath}.${name}`)} *</InputLabel>
      <TextField
        placeholder={t(`${translatePath}.${placeholderKey}`)}
        type="text"
        className={styles.FormInputItem}
        {...getInputProps(name, form)}
      />
      <FormControl>
        <ErrorMessage
          name={name}
          render={(msg) => (
            <FormHelperText error>
              <Typography variant="body2">{msg}</Typography>
            </FormHelperText>
          )}
        />
      </FormControl>
    </Box>
  );
};
