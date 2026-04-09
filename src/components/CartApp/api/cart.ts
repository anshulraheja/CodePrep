import { MenuItem, getMenuItems } from "./menu";
import { faker } from "@faker-js/faker";

export type Order = {
  id: string;
  timestamp: number;
  items: MenuItem[];
  total: number;
  status: "fulfilled" | "pending" | "rejected";
};

export const mockOrder = (items?: Order["items"]): Promise<Order> => {
  return getMenuItems().then((allItems) => {
    const orderItems: MenuItem[] = items ?? [
      ...new Array(Math.ceil(Math.random() * 6) + 3)
        .fill(null)
        .map((_i) => ({
          ...allItems[Math.floor(Math.random() * allItems.length)],
        })),
    ];
    return {
      id: faker.string.uuid(),
      timestamp: faker.date.recent().valueOf(),
      items: orderItems,
      status: (Math.random() > 0.5
        ? "fulfilled"
        : "pending") as Order["status"],
      total: orderItems.reduce((acc, item) => acc + item.price, 0),
    };
  });
};

export const getOrders = async () => {
  const orders = await Promise.all([
    ...new Array(10).fill(null).map((i) => mockOrder()),
  ]);
  return new Promise<Order[]>((resolve) => {
    setTimeout(() => {
      resolve(orders);
    }, 300);
  });
};

export const createOrder = async (items: Order["items"]) => {
  const order = await mockOrder(items);
  return new Promise<Order>((resolve) => {
    setTimeout(() => {
      resolve(order);
    }, 300);
  });
};