import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type TCartItem = {
  id: string;
  imageUrl: string;
  price: number;
  name: string;
  type: string;
  size: number;
  count: number;
};

interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

const cartData = getCartFromLS();

const initialState: ICartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
};

const cartSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addItem: (state, actions: PayloadAction<TCartItem>) => {
      const findItems = state.items.find(
        (obj) => obj.id === actions.payload.id
      );
      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({
          ...actions.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem: (state, actions: PayloadAction<string>) => {
      const findItems = state.items.find((obj) => obj.id === actions.payload);

      if (findItems) {
        findItems.count--;
      }

      if (findItems && findItems.count === 0) {
        state.items = state.items.filter((obj) => obj.id !== actions.payload);
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItem: (state, actions: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id !== actions.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) => {
  return state.cart.items.find((obj) => obj.id === id);
};

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
