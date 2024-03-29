import { FormikValues, useFormikContext } from "formik";

import {
  onAddCard,
  onDeleteCard,
  onDeleteSelectedCard,
  onSelectCard,
} from "../store/slices/cardSlice";
import { ICard } from "../types/card";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

type Props = {
  fullName: string;
  expiryDate: string;
  cardNumber: string;
  cvv: string;
};

export const useBankCard = () => {
  const dispatch = useAppDispatch();
  const { isValid, values, setFieldError, resetForm } =
    useFormikContext<FormikValues>();

  const { cards, selectedCard } = useAppSelector((state) => state.cards);

  const onHandleAddCard = (name: Props) => {
    const { cardNumber, expireDate } = values;

    const cardItem: ICard = {
      cardNumber,
      expiryDate: expireDate,
    };

    const isCardAlreadyExist = cards.some(
      (card) => card.cardNumber === cardNumber,
    );

    if (isCardAlreadyExist) {
      setFieldError(name.cardNumber, "This card already existing");
    } else {
      dispatch(onAddCard(cardItem));
      dispatch(onSelectCard(cardItem));

      resetForm();
    }
  };

  const handleRemoveCard = (
    event: React.MouseEvent<HTMLDivElement>,
    card: ICard,
  ) => {
    event.stopPropagation();
    dispatch(onDeleteCard(card.cardNumber));
    dispatch(onDeleteSelectedCard());
  };

  const handleSelectCard = (card: ICard) => {
    dispatch(onSelectCard(card));
  };

  const isEmpty = !values.cardNumber || !values.expiryDate;

  return {
    onHandleAddCard,
    handleSelectCard,
    isEmpty,
    isValid,
    cards,
    values,
    handleRemoveCard,
    selectedCard,
  };
};
