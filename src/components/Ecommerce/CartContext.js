import { useCallback, useContext, useReducer, createContext } from 'react';

const CartContext = createContext(null);

export const initialCartState = {
  items: [],
  totalAmount: 0,
};

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      let updatedItems;
      if (existingItemIndex >= 0) {
        const updatedItem = {
          ...state.items[existingItemIndex],
          quantity: state.items[existingItemIndex].quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      const updatedTotalAmount = state.totalAmount + action.payload.price;
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (existingItemIndex < 0) {
        return state;
      }

      const existingItem = state.items[existingItemIndex];
      let updatedItems;

      if (existingItem.quantity === 1) {
        updatedItems = state.items.filter((item) => item.id !== existingItem.id);
      } else {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
      }

      return {
        items: updatedItems,
        totalAmount: Math.max(0, state.totalAmount - existingItem.price),
      };
    }
    case 'CLEAR_CART':
      return { ...initialCartState, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, []);

  const removeFromCart = useCallback((product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  // console.log(state);
  const value = { ...state, addToCart, removeFromCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
