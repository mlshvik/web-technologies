import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: {}, // Стан кошика
  orderId: 1,
  color: 'Milk',
  size: 'S',
  quantity: 1,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setQuantity(state, action) {
      state.quantity = action.payload;
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    clearOrder(state) {
      state.quantity = 1;
      state.color = 'Milk';
      state.size = 'S';
    },
    incrementOrderId(state) {
      state.orderId++;
    },
    clearCart(state) {
      state.cartItems = {}; // Очищення кошика
    },
  },
});

export const {
  setColor,
  setQuantity,
  setSize,
  clearOrder,
  incrementOrderId,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
