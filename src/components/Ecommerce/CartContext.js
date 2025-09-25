import { useCallback, useContext, useReducer, createContext } from 'react';

const CartContext = createContext(null);

const initialCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
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
    case 'CLEAR_CART':
      return initialCartState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  console.log(state);
  const value = { ...state, addToCart, clearCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
