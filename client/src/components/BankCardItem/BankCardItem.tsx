import { Box, Typography } from "@mui/material";
import cn from "classnames";
import React from "react";
import { useTranslation } from "react-i18next";

import masterCard from "../../assets/icons/master_card.png";
import visa from "../../assets/icons/visa.png";
import { translatePath } from "../../constants/i18nPath";
import { useBankCard } from "../../hooks/useBankCard";
import { ICard } from "../../types/card";
import styles from "./BankCardItem.module.scss";

type Props = {
  card: ICard;
};

export const BankCardItem: React.FC<Props> = ({ card }) => {
  const { handleSelectCard, handleRemoveCard, selectedCard } = useBankCard();
  const { t } = useTranslation();

  const onHandleSelectCard = () => {
    handleSelectCard(card);
  };

  const onHandleRemoveCard = (event: React.MouseEvent<HTMLDivElement>) => {
    handleRemoveCard(event, card);
  };

  const isMasterCard = card.cardNumber.toString().startsWith("5");
  const cardImage = isMasterCard ? masterCard : visa;

  return (
    <Box
      onClick={onHandleSelectCard}
      className={cn({
        [styles.CardItemWrapper]: true,
        [styles.CardActive]: card.cardNumber === selectedCard?.cardNumber,
      })}
    >
      <img src={cardImage} alt="card" className={styles.CardPhoto} />
      <Typography variant="body1">{card.cardNumber}</Typography>
      <Typography
        variant="body1"
        color="grey"
        className={styles.CardDelete}
        onClick={onHandleRemoveCard}
      >
        {t(`${translatePath.widget_card}.delete`)}
      </Typography>
    </Box>
  );
};
