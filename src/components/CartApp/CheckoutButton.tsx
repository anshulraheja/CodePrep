import { ButtonHTMLAttributes } from "react";
// import { cls } from "../../utils";
import styles from "./Cart.module.css";

// Doesn't extend button props, even though it takes rest props
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>& {
  children: string;
  onClick?: () => void;
  total: number; // This should be in cents
};

export function CheckoutButton({
  children,
  className,
  total,
  ...rest
}: ButtonProps) {
  return (
    <button className={`${className} ${styles.root}`} {...rest}>
      {children}
      <span>$ {total}</span>
    </button>
  );
}
