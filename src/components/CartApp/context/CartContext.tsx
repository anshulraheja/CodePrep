import { createContext, useCallback, useContext, useState } from "react";
import { useOrders } from "./OrderContext";
import { CartItem } from "../card.types";

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  submit: () => void;
  submitting: boolean;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  submit: () => {},
  removeItem: () => {},
  submitting: false,
});

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const { addOrder } = useOrders();

  /**
   * TODO: Refactor addItem so that only one cart item exists at a time, unique by MenuItem['id'].
   *       Add a quantity to increment when addItem is called with an existing item.
   */
  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const newItems = [...prev];
        newItems[existingIndex] = { ...newItems[existingIndex], quantity: newItems[existingIndex].quantity + 1 };
        return newItems;
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }, []);

  /**
   * TODO: Refactor removeItem to decrement quantity of the item, removing it from the cart only when quantity reaches zero.
   */
  const removeItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const newItems = [...prev];
        if (newItems[existingIndex].quantity > 1) {
          newItems[existingIndex] = { ...newItems[existingIndex], quantity: newItems[existingIndex].quantity - 1 };
        } else {
          newItems.splice(existingIndex, 1);
        }
        return newItems;
      }
      return prev;
    });
  }, []);

  const submit = useCallback(() => {
    console.log("submitting order");
    setSubmitting(true);
    addOrder(items)
      .then((order) => {
        window.alert("Order Placed. Order ID - " + order.id);
        setItems([]);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }, [items, addOrder]);

  return (
    <CartContext.Provider
      value={{ items, addItem, submit, removeItem, submitting }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
