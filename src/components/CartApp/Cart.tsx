import { useMemo, useRef, useState } from "react";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import styles from "./Cart.module.css";
import { cls } from "../../utils";
import { useOnClickOutside } from "../../hooks/use-onclick-outside";
import { useCart } from "../../contexts/CartContext";
import { CheckoutButton } from "../checkout-button/CheckoutButton";
import { MenuItem } from "../../api/menu";
import { ReactComponent as MinusIcon } from "../../assets/minus.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash.svg";

type CombinedItems = Record<string, MenuItem & { quantity: number }>;

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
    let total = 0;
    const combined = items.reduce<CombinedItems>((acc, item) => {
      total += item.price;
      return {
        ...acc,
        [item.name]: acc[item.name]
          ? {
              ...item,
              quantity: acc[item.name].quantity + 1,
            }
          : { ...item, quantity: 1 },
      };
    }, {});
    return {
      total,
      combinedItems: Object.values(combined),
    };
  }, [items.length]);

  useOnClickOutside({
    ref: flyoutRef,
    handler: () => setIsOpen(false),
    captureClicks: false,
    clickCaptureIgnore: [triggerRef],
  });

  return (
    <div style={{ position: "relative" }}>
      <button
        className={styles.button}
        disabled={false}
        onClick={() => setIsOpen((state) => !state)}
        ref={triggerRef}
      >
        <CartIcon />
        {items.length}
      </button>
      <div
        ref={flyoutRef}
        className={cls(styles.flyout, !isOpen && styles.closed)}
      >
        {!!combinedItems.length ? (
          <>
            <ul className={styles.list}>
              {combinedItems.map((item) => (
                <CartItem
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
  item: MenuItem;
  quantity: number;
};
const CartItem = ({ item, quantity }: CartItemProps) => {
  const { addItem, removeItem } = useCart();

  if (!quantity) {
    return null;
  }
  return (
    <li>
      <div className={styles.leftColumn}>
        <img className={styles.actionImg} src={item.imgUrl} alt={item.name} />
        <div className={styles.description}>
          <h4>{item.name}</h4>
          <h5>{item.description}</h5>
          <h4 className={styles.price}>${item.price * quantity}</h4>
        </div>
      </div>
      <div className={styles.actions}>
        {quantity <= 1 ? (
          <button className={styles.action} onClick={() => removeItem(item)}>
            <TrashIcon />
          </button>
        ) : (
          <button className={styles.action} onClick={() => removeItem(item)}>
            <MinusIcon />
          </button>
        )}
        <p className={styles.quantity}>{quantity}</p>
        <button className={styles.action} onClick={() => addItem(item)}>
          <PlusIcon />
        </button>
      </div>
    </li>
  );
};