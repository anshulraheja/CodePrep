import { Cart } from "../cart";
import styles from "./Header.module.css";
import { useLocation, Link } from 'react-router-dom'

type HeaderProps = {};

export function Header(props: HeaderProps) {
  const loc = useLocation()
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Fred's Diner</h1>
      <nav className={styles.nav}>
        <ul>
          <li><Link to="/" className={loc.pathname === "/" ? "active" : ""}>Home</Link></li>
          <li><Link to="/orders" className={loc.pathname === "/orders" ? "active" : ""}>Orders</Link></li>
        </ul>
      </nav>
      <Cart />
    </div>
  );
}
