import { createSlice } from '@reduxjs/toolkit';

// Функція для завантаження кошика з localStorage
const loadCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { cartItems: {}, totalPrice: 0 }; // Повертає дані з localStorage або початковий стан
  } catch (error) {
    return { cartItems: {}, totalPrice: 0 }; // Якщо сталася помилка, повертаємо початковий стан
  }
};

const initialState = loadCartFromLocalStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOrderToCart(state, action) {
      const { id, quantity, price, color, size } = action.payload;

      if (state.cartItems[id]) {
        const existingOrder = state.cartItems[id].orders.find(
          (order) => order.color === color && order.size === size
        );

        if (existingOrder) {
          existingOrder.quantity += Number(quantity);
        } else {
          state.cartItems[id].orders.push(action.payload);
        }
      } else {
        state.cartItems[id] = {
          orders: [action.payload],
        };
      }

      state.totalPrice += Number(quantity) * Number(price);
      localStorage.setItem('cart', JSON.stringify(state)); // Збереження кошика в localStorage
    },
    incrementOrderQuantity(state, action) {
      const { id, orderId } = action.payload;

      if (state.cartItems[id]) {
        const order = state.cartItems[id].orders.find(
          (order) => order.orderId === orderId
        );
        if (order) {
          order.quantity += 1;
          state.totalPrice += Number(order.price);
          localStorage.setItem('cart', JSON.stringify(state)); // Збереження після змін
        }
      }
    },
    decrementOrderQuantity(state, action) {
      const { id, orderId } = action.payload;

      if (state.cartItems[id]) {
        const orderIndex = state.cartItems[id].orders.findIndex(
          (order) => order.orderId === orderId
        );

        if (orderIndex !== -1) {
          const order = state.cartItems[id].orders[orderIndex];
          if (order.quantity > 1) {
            order.quantity -= 1;
            state.totalPrice -= order.price;
          } else {
            state.cartItems[id].orders.splice(orderIndex, 1);
            state.totalPrice -= order.price;

            if (state.cartItems[id].orders.length === 0) {
              delete state.cartItems[id];
            }
          }
          localStorage.setItem('cart', JSON.stringify(state)); // Збереження після змін
        }
      }
    },
    deleteOrder(state, action) {
      const { id, orderId } = action.payload;

      if (state.cartItems[id]) {
        const orderIndex = state.cartItems[id].orders.findIndex(
          (order) => order.orderId === orderId
        );

        if (orderIndex !== -1) {
          const order = state.cartItems[id].orders[orderIndex];
          state.totalPrice -= order.quantity * order.price;
          state.cartItems[id].orders.splice(orderIndex, 1);
          if (state.cartItems[id].orders.length === 0) {
            delete state.cartItems[id];
          }
          localStorage.setItem('cart', JSON.stringify(state)); // Збереження після змін
        }
      }
    },
    clearCart(state) {
      state.cartItems = {}; // Очищення кошика
      state.totalPrice = 0; // Очищення загальної ціни
      localStorage.removeItem('cart'); // Видалення кошика з localStorage
    },
  },
});

export const {
  addOrderToCart,
  incrementOrderQuantity,
  decrementOrderQuantity,
  deleteOrder,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
