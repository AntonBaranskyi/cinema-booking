import { Box, Button, Typography } from "@mui/material";
import { FormikProps, FormikValues } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";

import { translatePath } from "../../constants/i18nPath";
import { useBankCard } from "../../hooks/useBankCard";
import BankCardItem from "../BankCardItem";
import PaymentFormField from "../PaymentFormField";
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

      <PaymentFormField
        size="large"
        name={name.fullName}
        form={form}
        label={t(`${translatePath.widget_card}.holder`)}
        type="text"
        placeholder={t(`${translatePath.widget_card}.holder_placeholder`)}
      />

      <Box className={styles.extraCardData} mb={4}>
        <PaymentFormField
          size="large"
          name={name.cardNumber}
          form={form}
          label={t(`${translatePath.widget_card}.number`)}
          type="number"
          placeholder={t(`${translatePath.widget_card}.number_placeholder`)}
        />

        <PaymentFormField
          name={name.expiryDate}
          form={form}
          label={t(`${translatePath.widget_card}.expire`)}
          placeholder={t(`${translatePath.widget_card}.expire_placeholder`)}
        />

        <PaymentFormField
          name={name.cvv}
          form={form}
          label="CVV"
          placeholder="CVV"
          type="password"
        />
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
