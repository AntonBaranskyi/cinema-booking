import {
  Box,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import cn from "classnames";
import { ErrorMessage, FormikProps, FormikValues } from "formik";
import React from "react";

import { getInputProps } from "../../utils/stepsForm";
import styles from "./PaymentFormField.module.scss";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  form: FormikProps<FormikValues>;
  size?: string;
};

export const PaymentFormField: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  form,
  size,
}) => {
  return (
    <Box
      mb={name === "fullName" ? 3 : ""}
      className={cn({
        [styles.InputsWrapperBig]: size === "large",
        [styles.InputWrapperSm]: !size,
      })}
    >
      <InputLabel>{label}</InputLabel>
      <TextField
        type={type}
        placeholder={placeholder}
        className={styles.InputName}
        {...getInputProps(name, form)}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <FormHelperText error>
            <Typography variant="body2">{msg}</Typography>
          </FormHelperText>
        )}
      />
    </Box>
  );
};
