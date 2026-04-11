import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createOrder, getOrders } from "../api/cart";

const OrderContext = createContext(undefined);

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res);
    });
  }, []);

  const addOrder = (items) => {
    console.log({ items });
    return createOrder(items).then((response) => {
      console.log({ response });
      setOrders((prev) => [...prev, response]);
      return response;
    });
  };

  const removeOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
    return Promise.resolve(true);
  };

  const value = useMemo(
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
