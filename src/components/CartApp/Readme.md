# About

This is a simple app that displays a list of menu items. You can add
menu items to the cart to submit an order.

Not everything in this repo follows best practices for React, HTML/CSS,
Accessibility, or build tooling. Highlight any of the things you feel
should be improved with the interviewer as you complete the following
tasks.

# Instructions

Start the app and get the project running.

`npm install && npm start`

Solve the following task.

## Task

The current implementation of CartContext -> items: CartItem[] isn't great.

**Example**
Adding "Biscuits and Gravy" twice results in two separate entries in the cart, rather than one entry with a quantity of 2.

**Solution**
Instead, CartContext -> items: CartItem[] should be refactored to support quantity for each unique item.

When adding an item that already exists in the cart, increment the quantity rather than adding a new entry. When removing an item, decrement the quantity, and only remove the entry when the quantity reaches zero.

An image of the required design:
![Completed Cart!](complete-reference.png "Completed Cart")

Requirements:

1. Items in cart should be unique by MenuItem['id'].
2. Each CartItem should track quantity.
3. Adding an item that already exists in the cart should increment quantity.
4. Removing an item should decrement quantity, removing the item only when quantity reaches zero.
5. UI CHECK
   - Cart dropdown icon should display the total number of items in cart (summed quantities)
   - In Cart Dropdown > Each cart item should display the subtotal (price \* quantity)
   - Cart dropdown > Place Order Button "total" should reflect the total sum of the cart (all item subtotals)

> **Hint**
> The places where you might want to focus are marked with `TODO` comments in the codebase.
