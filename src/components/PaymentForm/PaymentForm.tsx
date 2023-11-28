import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import {
  ErrorMessage,
  FormikProps,
  FormikValues,
  useFormikContext,
} from "formik";
import React from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onAddCard, onSelectCard } from "../../store/slices/cardSlice";
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
  const { isValid, errors, values } = useFormikContext();
  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((state) => state.cards);

  console.log(errors);

  const onHandleAddCard = () => {
    const { cardNumber, expiryDate } = values;

    const cardItem = {
      cardNumber,
      expiryDate,
    };

    const isCardAlreadyExist = cards.some(
      (card) => card.cardNumber === cardNumber,
    );

    if (isCardAlreadyExist) {
      form.setFieldError(name.cardNumber, "This card already existing");
    } else {
      dispatch(onAddCard(cardItem));
      dispatch(onSelectCard(cardItem));

      form.resetForm();
    }
  };

  const isEmpty = !values.cardNumber || !values.expiryDate;
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
        <Box sx={{ width: "50%" }}>
          <InputLabel>Card number</InputLabel>
          <TextField
            type="number"
            placeholder="Please,write your card number"
            sx={{ width: "100%" }}
            {...getInputProps(name.cardNumber, form)}
          />

          <ErrorMessage name={name.cardNumber} />
        </Box>

        <Box sx={{ width: "25%" }}>
          <InputLabel>Expire date</InputLabel>

          <TextField
            placeholder="MM/YY"
            sx={{ width: "100%" }}
            {...getInputProps(name.expiryDate, form)}
          />

          <ErrorMessage name={name.expiryDate} />
        </Box>
        <Box sx={{ width: "25%" }}>
          <InputLabel>CVV</InputLabel>
          <TextField
            type="password"
            placeholder="CVV"
            sx={{ width: "100%" }}
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
        onClick={onHandleAddCard}
      >
        Add card
      </Button>
    </>
  );
};
