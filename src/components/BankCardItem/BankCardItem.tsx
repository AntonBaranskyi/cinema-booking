import { Box, Typography } from "@mui/material";
import cn from "classnames";
import React from "react";

import masterCard from "../../assets/icons/master_card.png";
import visa from "../../assets/icons/visa.png";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  onDeleteCard,
  onDeleteSelectedCard,
  onSelectCard,
} from "../../store/slices/cardSlice";
import { ICard } from "../../types/card";
import styles from "./BankCardItem.module.scss";

type Props = {
  card: ICard;
};

export const BankCardItem: React.FC<Props> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { selectedCard } = useAppSelector((state) => state.cards);

  const handleRemoveCard = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch(onDeleteCard(card.cardNumber));
    dispatch(onDeleteSelectedCard());
  };

  const handleSelectCard = () => {
    dispatch(onSelectCard(card));
  };
  const isMasterCard = card.cardNumber.toString().startsWith("5");
  const cardImage = isMasterCard ? masterCard : visa;

  return (
    <Box
      onClick={handleSelectCard}
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
        onClick={handleRemoveCard}
      >
        Remove card
      </Typography>
    </Box>
  );
};
