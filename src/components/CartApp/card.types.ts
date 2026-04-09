import { MenuItem } from "./api/menu.ts";

/**
 * TODO: Modify CartItem as needed
 */
export interface CartItem extends MenuItem {
    quantity: number;
};
