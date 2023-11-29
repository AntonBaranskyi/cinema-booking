import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { ErrorMessage, FormikProps, FormikValues } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import { useBankCard } from "../../hooks/useBankCard";
import { getInputProps } from "../../utils/stepsForm";
import BankCardItem from "../BankCardItem";
import styles from "./PaymentForm.module.scss";

type Props = {
  form: FormikProps<FormikValues>;
  name: {
    fullName: string;
    expiryDate: string;
    cardNumber: string;
    cvv: string;
  };
};

export const PaymentForm: React.FC<Props> = ({ form, name }) => {
  const { cards, onHandleAddCard, isEmpty, isValid } = useBankCard();

  const handleAddingCard = () => {
    onHandleAddCard(name);
  };

  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h3" textAlign="center" mb={2}>
        {t(`${translatePath.widget_card}.title`)}
      </Typography>
      <Typography variant="h6">
        {t(`${translatePath.widget_card}.saved`)}:
      </Typography>
      <Box className={styles.CardsWrapper} mb={3}>
        {cards.length === 0 ? (
          <Typography variant="h5" textAlign="center">
            {t(`${translatePath.widget_card}.empty`)}
          </Typography>
        ) : (
          cards.map((card) => (
            <BankCardItem key={card.cardNumber} card={card} />
          ))
        )}
      </Box>
      <Typography variant="h6" mb={1}>
        {t(`${translatePath.widget_card}.add_new`)}
      </Typography>
      <Box mb={3}>
        <InputLabel>{t(`${translatePath.widget_card}.holder`)}</InputLabel>
        <TextField
          type="text"
          placeholder={t(`${translatePath.widget_card}.holder_placeholder`)}
          className={styles.InputName}
          {...getInputProps(name.fullName, form)}
        />
      </Box>

      <Box className={styles.extraCardData} mb={4}>
        <Box className={styles.InputsWrapperBig}>
          <InputLabel>{t(`${translatePath.widget_card}.number`)}</InputLabel>
          <TextField
            type="number"
            placeholder={t(`${translatePath.widget_card}.number_placeholder`)}
            className={styles.InputItem}
            {...getInputProps(name.cardNumber, form)}
          />

          <ErrorMessage name={name.cardNumber} />
        </Box>

        <Box className={styles.InputWrapperSm}>
          <InputLabel>{t(`${translatePath.widget_card}.expire`)}</InputLabel>

          <TextField
            placeholder={t(`${translatePath.widget_card}.expire_placeholder`)}
            className={styles.InputItem}
            {...getInputProps(name.expiryDate, form)}
          />

          <ErrorMessage name={name.expiryDate} />
        </Box>
        <Box className={styles.InputWrapperSm}>
          <InputLabel>CVV</InputLabel>
          <TextField
            type="password"
            placeholder="CVV"
            className={styles.InputItem}
            {...getInputProps(name.cvv, form)}
          />

          <ErrorMessage name={name.cvv} />
        </Box>
      </Box>
      <Button
        disabled={!isValid || isEmpty}
        variant="contained"
        color="warning"
        sx={{ marginBottom: 4 }}
        onClick={handleAddingCard}
      >
        {t(`${translatePath.widget_card}.add_card`)}
      </Button>
    </>
  );
};
