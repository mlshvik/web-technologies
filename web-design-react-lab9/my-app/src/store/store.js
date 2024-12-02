import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReduser';

const store = configureStore({
  reducer: {
    cart: cartReducer,  // Ваш редуктор кошика
  },
});

export default store;
