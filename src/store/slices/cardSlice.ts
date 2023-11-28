import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ICard } from "../../types/card";

type IState = {
  cards: ICard[];
  selectedCard: ICard | null;
};

const initialState: IState = {
  cards: [],
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
  },
});

export const { onAddCard, onDeleteCard, onSelectCard, onDeleteSelectedCard } =
  cardSlice.actions;

export default cardSlice.reducer;
