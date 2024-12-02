  import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    SET_CART,
    UPDATE_ITEM_QUANTITY,
  } from '../store/actionTypes';

  // Додавання товару до кошика
  export const addItemToCart = (item) => (dispatch, getState) => {
    const { cartItems } = getState().cart;
    
    // Перевірка, чи вибраний колір
    if (!item.color) {
      alert('Будь ласка, виберіть колір товару перед додаванням до кошика');
      return;
    }

    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.color === item.color
    );

    const availableStock = item.stock.find(
      (stockItem) => stockItem.color === item.color
    ).quantity;

    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    const totalQuantity = currentQuantityInCart + item.quantity;

    // Перевірка на доступний склад
    if (totalQuantity > availableStock) {
      alert('Неможливо додати більше товару, ніж є на складі');
      return;
    }

    // Оновлення кількості або додавання нового товару
    if (existingItem) {
      dispatch({
        type: UPDATE_ITEM_QUANTITY,
        payload: { id: item.id, color: item.color, quantity: totalQuantity },
      });
    } else {
      dispatch({
        type: ADD_ITEM_TO_CART,
        payload: { ...item },
      });
    }

    saveCartToLocalStorage(getState().cart.cartItems);
  };

  // Видалення товару з кошика
  export const removeItemFromCart = (itemID, color) => (dispatch, getState) => {
    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      payload: { itemID, color },
    });

    saveCartToLocalStorage(getState().cart.cartItems);
  };

  // Оновлення кількості товару в кошику
  export const updateItemQuantity = (id, color, quantity) => (dispatch, getState) => {
    const { cartItems } = getState().cart;
    const item = cartItems.find(
      (cartItem) => cartItem.id === id && cartItem.color === color
    );

    if (!item) return;

    const availableStock = item.stock.find(
      (stockItem) => stockItem.color === color
    ).quantity;

    if (quantity > availableStock) {
      alert('Неможливо додати більше товару, ніж є на складі');
      return;
    }

    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { id, color, quantity },
    });

    saveCartToLocalStorage(getState().cart.cartItems);
  };

  // Збереження кошика в локальне сховище
  export const saveCartToLocalStorage = (cart) => {
    if (cart && Array.isArray(cart)) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  // Завантаження кошика з локального сховища
  export const loadCartFromLocalStorage = () => (dispatch) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch({ type: SET_CART, payload: savedCart });
  };
