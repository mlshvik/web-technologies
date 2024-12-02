const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart')) || [], // Початкове значення для cartItems
};

const cartReducer = (state = initialState, action) => {
  let updatedCartItems;

  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id && item.color === action.payload.color
      );

      if (existingItemIndex !== -1) {
        updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity +=
          parseInt(action.payload.quantity, 10) || 1;
      } else {
        updatedCartItems = [
          ...state.cartItems,
          { ...action.payload, quantity: action.payload.quantity || 1 },
        ];
      }

      saveCartToLocalStorage(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case REMOVE_ITEM_FROM_CART: {
      if (!action.payload.itemID || !action.payload.color) {
        console.error('Invalid payload for REMOVE_ITEM_FROM_CART', action.payload);
        return state;
      }
      updatedCartItems = state.cartItems.filter(
        (item) =>
          item.id !== action.payload.itemID || item.color !== action.payload.color
      );
      saveCartToLocalStorage(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      updatedCartItems = state.cartItems.map((item) =>
        item.id === action.payload.id && item.color === action.payload.color
          ? { ...item, quantity: Math.max(1, action.payload.quantity || 1) }
          : item
      );
      saveCartToLocalStorage(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case SET_CART: {
      updatedCartItems = Array.isArray(action.payload) ? action.payload : [];
      saveCartToLocalStorage(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    default:
      return state;
  }
};
