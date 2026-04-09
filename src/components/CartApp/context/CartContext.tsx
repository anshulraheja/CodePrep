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

      /**
      array of objects
      item.id
      check if id exist --> if yes, we will increase the count

      [
        {id: 1} , {id: 2} , 
      ]
      */

      let arr = [...items];
      for(let i=0; i<arr.length; i++){
          if(item.id == arr[i].id){
              // arr[i].quantity++;
              arr = [...arr, {...item, quantity: arr[i].quantity + 1}];
          } else {
              arr = [...arr, {...item, quantity:1}];
          }
      }

      console.log(arr);

      return setItems(arr);

      
      
    // return setItems((items) => [...items, item]);
  }, []);

  /**
   * TODO: Refactor removeItem to decrement quantity of the item, removing it from the cart only when quantity reaches zero.
   */
  const removeItem = useCallback((item: CartItem) => {
    return setItems((prev) => {
      // using find last index keeps the array in order when things are removed
      const index = prev.findLastIndex((i: CartItem) => i.name === item.name);
      if (index > -1) {
        const first = prev.slice(0, index);
        const last = prev.slice(index + 1, prev.length);
        return [...first, ...last];
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
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, submit, removeItem, submitting }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
