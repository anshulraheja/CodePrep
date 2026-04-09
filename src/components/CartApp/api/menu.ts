import burger from "../assets/images/burger.jpeg";
import chickenTenders from "../assets/images/chicken_tenders.jpeg";
import biscuitsAndGravy from "../assets/images/biscuits_and_gravy.jpeg";
import chickenFriedSteak from "../assets/images/chicken_fried_steak.jpeg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  imgUrl?: string;
};

export type MenuFilter = {
  label: string;
  id: string;
};

// simulates a slow query takes 3 seconds
export const getMenuItems = () => {
  return new Promise<MenuItem[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Biscuits and Gravy",
          description: "Biscuits smothered in gravy",
          price: 5.99,
          tags: ["breakfast"],
          imgUrl: biscuitsAndGravy,
        },
        {
          id: "2",
          name: "Chicken Fried Steak",
          description: "Chicken fried steak with gravy",
          price: 8.99,
          tags: ["breakfast", "lunch"],
          imgUrl: chickenFriedSteak,
        },
        {
          id: "3",
          name: "Chicken Tenders",
          description: "Chicken tenders with fries",
          price: 7.99,
          tags: ["lunch", "dinner"],
          imgUrl: chickenTenders,
        },
        {
          id: "4",
          name: "Hamburger",
          description: "Hamburger with fries",
          price: 6.99,
          tags: ["lunch", "dinner"],
          imgUrl: burger,
        },
      ]);
    }, generateDelay(2000, 3000));
  });
};

// simulates an API call to get filter items
export const getMenuFilters = () => {
  return new Promise<MenuFilter[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { label: "Breakfast", id: "breakfast" },
        { label: "Lunch", id: "lunch" },
        { label: "Dinner", id: "dinner" },
      ]);
    }, generateDelay(100, 500));
  });
};

function generateDelay(min: number, max: number) {
  // Generate a random number between the minimum and maximum values.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}