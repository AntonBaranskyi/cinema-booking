import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { ErrorMessage, FormikProps, FormikValues } from "formik";
import React from "react";

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

  console.log(cards);

  const handleAddingCard = () => {
    onHandleAddCard(name);
  };

  return (
    <>
      <Typography variant="h3" textAlign="center" mb={2}>
        Payment
      </Typography>
      <Typography variant="h6">Saved cards:</Typography>
      <Box className={styles.CardsWrapper} mb={3}>
        {cards.length === 0 ? (
          <Typography variant="h5" textAlign="center">
            Add your card for buying ticket
          </Typography>
        ) : (
          cards.map((card) => (
            <BankCardItem key={card.cardNumber} card={card} />
          ))
        )}
      </Box>
      <Typography variant="h6" mb={1}>
        Add new card
      </Typography>
      <Box mb={3}>
        <InputLabel>Card holder name</InputLabel>
        <TextField
          type="text"
          placeholder="Please write name"
          className={styles.InputName}
          {...getInputProps(name.fullName, form)}
        />
      </Box>

      <Box className={styles.extraCardData} mb={4}>
        <Box className={styles.InputsWrapperBig}>
          <InputLabel>Card number</InputLabel>
          <TextField
            type="number"
            placeholder="Please,write your card number"
            className={styles.InputItem}
            {...getInputProps(name.cardNumber, form)}
          />

          <ErrorMessage name={name.cardNumber} />
        </Box>

        <Box className={styles.InputWrapperSm}>
          <InputLabel>Expire date</InputLabel>

          <TextField
            placeholder="MM/YY"
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
        Add card
      </Button>
    </>
  );
};
