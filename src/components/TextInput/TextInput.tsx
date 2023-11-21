import { TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import styles from "./TextInput.module.scss";

type Props = {
  value: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <TextField
      className={styles.textInput}
      inputProps={{
        sx: {
          "&::placeholder": {
            color: "white",
            opacity: 1,
          },
        },
      }}
      sx={{
        "& .MuiInputBase-root": {
          height: 50,
        },

        "& .MuiInputBase-input input": {
          "&::placeholder": {
            color: "white",
          },
        },
      }}
      type="search"
      placeholder={t(`${translatePath.filters}.search_placeholder`)}
      value={value}
      onChange={onChange}
    />
  );
};
