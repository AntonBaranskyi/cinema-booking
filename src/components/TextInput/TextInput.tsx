import { TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import styles from "./TextInput.module.scss";

type Props = {
  value: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderRow: string;
  type?: string;
};

export const TextInput: React.FC<Props> = ({
  value,
  onChange,
  placeholderRow,
  type,
}) => {
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

        "& .MuiInputBase-input": {
          "&::placeholder": {
            color: "white",
          },

          "&[type='search']::-webkit-search-cancel-button": {
            cursor: "pointer",
          },
        },
      }}
      type={type}
      placeholder={t(`${translatePath.filters}.${placeholderRow}`)}
      value={value || ""}
      onChange={onChange}
    />
  );
};
