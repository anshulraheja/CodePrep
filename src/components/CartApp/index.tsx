import { useEffect, useState } from "react";
import { Cart } from "./Cart";
import { useCart } from "./context/CartContext";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrderContext";
import { getMenuItems, MenuItem } from "./api/menu";
import styles from "./Cart.module.css";

const CartApp = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMenuItems()
      .then((items) => setMenuItems(items))
      .catch(() => setError("Unable to load menu items."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <OrdersProvider>
      <CartProvider>
        <div style={{ padding: 24, maxWidth: 1080, margin: "0 auto" }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <div>
              <h1 style={{ margin: 0 }}>Fred&apos;s Diner</h1>
              <p style={{ margin: "0.5rem 0 0", color: "#555" }}>
                Select menu items below and add them to your cart.
              </p>
            </div>
            <Cart />
          </header>

          {loading ? (
            <p>Loading menu items…</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 16,
              }}
            >
              {menuItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </CartProvider>
    </OrdersProvider>
  );
};

type MenuCardProps = {
  item: MenuItem;
};

const MenuCard = ({ item }: MenuCardProps) => {
  const { addItem } = useCart();

  return (
    <article
      className={styles.card}
      style={{
        border: "1px solid #e1e4e8",
        borderRadius: 16,
        padding: 16,
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 260,
      }}
    >
      <div>
        {item.imgUrl ? (
          <img
            src={item.imgUrl}
            alt={item.name}
            style={{ width: "100%", borderRadius: 12, objectFit: "cover", marginBottom: 12, height: 160 }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: 160,
              borderRadius: 12,
              background: "#f2f2f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#888",
              marginBottom: 12,
            }}
          >
            No image available
          </div>
        )}

        <h2 style={{ margin: "0 0 0.5rem" }}>{item.name}</h2>
        <p style={{ margin: "0 0 1rem", color: "#555" }}>{item.description}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <strong>${item.price.toFixed(2)}</strong>
        <button
          type="button"
          className={styles.button}
          onClick={() => addItem({ ...item, quantity: 1 })}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default CartApp;