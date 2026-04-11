import { useMemo, useRef, useState } from "react";
// import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import styles from "./Cart.module.css";
// import { cls } from "../../utils";
// import { useOnClickOutside } from "../../hooks/use-onclick-outside";
import { useCart } from "./context/CartContext";
import { CheckoutButton } from "./CheckoutButton";
import { MenuItem } from "./api/menu";
import { CartItem } from "./card.types";
// import { ReactComponent as MinusIcon } from "../../assets/minus.svg";
// import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
// import { ReactComponent as TrashIcon } from "../../assets/trash.svg";

type CombinedItems = Record<string, CartItem>;

export const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { items, submit, submitting } = useCart();

  /**
   * TODO: This calculates the cart total and combines items by name, calculating quantity.
   *       Refactor based on new CartItem structure.
   */
  const { total, combinedItems } = useMemo(() => {
    const combined = items.reduce<CombinedItems>((acc, item) => {
      const existing = acc[item.name];
      if (existing) {
        return {
          ...acc,
          [item.name]: {
            ...existing,
            quantity: existing.quantity + item.quantity,
          },
        };
      }

      return {
        ...acc,
        [item.name]: item,
      };
    }, {} as CombinedItems);

    const total = Object.values(combined).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      total,
      combinedItems: Object.values(combined),
    };
  }, [items]);

  // useOnClickOutside({
  //   ref: flyoutRef,
  //   handler: () => setIsOpen(false),
  //   captureClicks: false,
  //   clickCaptureIgnore: [triggerRef],
  // });

  return (
    <div style={{ position: "relative" }}>
      <button
        className={styles.button}
        disabled={false}
        onClick={() => setIsOpen((state) => !state)}
        ref={triggerRef}
      >
        Cart
        {items.length}
      </button>
      <div
        ref={flyoutRef}
        className={`${styles.flyout} ${!isOpen ? styles.closed : ''}`}
      >
        {!!combinedItems.length ? (
          <>
            <ul className={styles.list}>
              {combinedItems.map((item) => (
                <Item
                  key={item.name}
                  item={item}
                  quantity={item.quantity}
                />
              ))}
            </ul>
            <hr />
            <CheckoutButton
              disabled={submitting}
              total={total}
              onClick={() => submit()}
            >
              {submitting ? "Submitting..." : "Place Order"}
            </CheckoutButton>
          </>
        ) : (
          <>Nothing in Cart</>
        )}
      </div>
    </div>
  );
};

type CartItemProps = {
  item: CartItem;
  quantity: number;
};
const Item = ({ item, quantity }: CartItemProps) => {
  const { addItem, removeItem } = useCart();

  if (!quantity) {
    return null;
  }
  return (
    <li>
      <div className={styles.leftColumn}>
        {item.imgUrl ? (
          <img className={styles.actionImg} src={item.imgUrl} alt={item.name} />
        ) : (
          <div
            style={{
              width: "4em",
              height: "4em",
              borderRadius: 12,
              background: "#f2f2f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#777",
              fontSize: 12,
            }}
          >
            No image
          </div>
        )}
        <div className={styles.description}>
          <h4>{item.name}</h4>
          <h5>{item.description}</h5>
          <h4 className={styles.price}>${(item.price * quantity).toFixed(2)}</h4>
        </div>
      </div>
      <div className={styles.actions}>
        {quantity <= 1 ? (
          <button className={styles.action} onClick={() => removeItem(item)}>
            Remove
          </button>
        ) : (
          <button className={styles.action} onClick={() => removeItem(item)}>
            -
          </button>
        )}
        <p className={styles.quantity}>{quantity}</p>
        <button className={styles.action} onClick={() => addItem(item)}>
          +
        </button>
      </div>
    </li>
  );
};