import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { localStorageKeys } from "../../constants/localStorageKeys";
import { ICard } from "../../types/card";

type IState = {
  cards: ICard[];
  selectedCard: ICard | null;
};

const storedCards = localStorage.getItem(localStorageKeys.cards);

const initialState: IState = {
  cards: storedCards ? JSON.parse(storedCards) : [],
  selectedCard: null,
};

const cardSlice = createSlice({
  name: "cardsSlice",
  initialState,
  reducers: {
    onAddCard: (state, action: PayloadAction<ICard>) => {
      state.cards = [...state.cards, action.payload];
    },

    onDeleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(
        (card) => card.cardNumber !== action.payload,
      );
    },

    onSelectCard: (state, action: PayloadAction<ICard>) => {
      state.selectedCard = action.payload;
    },

    onDeleteSelectedCard: (state) => {
      state.selectedCard = null;
    },

    onLoadCards: (state, action: PayloadAction<ICard[]>) => {
      state.cards = action.payload;
    },

    onLoadCurrentCard: (state, action: PayloadAction<ICard>) => {
      state.selectedCard = action.payload;
    },
  },
});

export const {
  onAddCard,
  onDeleteCard,
  onSelectCard,
  onLoadCards,
  onDeleteSelectedCard,
  onLoadCurrentCard,
} = cardSlice.actions;

export default cardSlice.reducer;
