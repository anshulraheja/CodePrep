import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Order, createOrder, getOrders } from "../api/order";

type ContextValue = {
  orders: Order[];
  addOrder: (items: Order["items"]) => Promise<Order>;
  removeOrder: (id: string) => Promise<boolean>;
};
export const OrderContext = createContext<ContextValue>(
  undefined as unknown as ContextValue
);

type Props = {
  children: React.ReactNode;
};
export const OrdersProvider = ({ children }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res);
    });
  }, []);

  const addOrder: ContextValue["addOrder"] = (items) => {
    console.log({ items });
    return createOrder(items).then((response) => {
      console.log({ response });
      setOrders((prev) => [...prev, response]);
      return response;
    });
  };

  const removeOrder: ContextValue["removeOrder"] = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
    return Promise.resolve(true);
  };

  const value: ContextValue = useMemo(
    () => ({
      orders,
      addOrder,
      removeOrder,
    }),
    [orders]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
