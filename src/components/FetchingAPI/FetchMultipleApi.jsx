import { useEffect, useState, useCallback } from 'react';

// --- Service layer: API calls ---
async function fetchUsers() {
  const res = await fetch('https://api.example.com/users');
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

async function fetchUserCart(userId) {
  const res = await fetch(`https://api.example.com/users/${userId}/cart`);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return res.json();
}

async function fetchCartProducts(cartId) {
  const res = await fetch(`https://api.example.com/carts/${cartId}/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

// --- Main component ---
export default function ProductsByUser() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // Step 1: fetch all users
      const users = await fetchUsers();
      if (!users?.length) throw new Error('No users found');

      // Step 2: fetch first user’s cart
      const cart = await fetchUserCart(users[0].id);
      if (!cart?.cartId) throw new Error('Cart not found');

      // Step 3: fetch cart products
      const products = await fetchCartProducts(cart.cartId);
      setProducts(products);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Promise.All version
   */

  /**
   * If any one promise rejects, the whole Promise.all rejects immediately.
   * The error is caught by the try...catch block (where I did catch (err)).
   */
  const fetchDataUsingPromiseAll = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // get all the users [user1, user2, ...]
      const users = await fetchUsers();

      // get all the carts of each user [cart1, cart2, ...] i

      const carts = await Promise.all(users.map((u) => fetchUserCart(u.id)));

      // get all the products [[prod1, prod2], [prod3], ...]

      const products = await Promise.all(carts.map((c) => fetchCartProducts(c.cartId)));

      // Flatten all products into a single array
      const combinedProducts = products.flat();

      setProducts(combinedProducts);
    } catch (error) {
      setError('Unable to fetch the products');
    } finally {
      setLoading(true);
    }
  }, []);

  /**
   * Promise.allSettled resolves after all promises complete, regardless of success or failure.
   * Instead of short-circuiting, you get the status for each promise.
   * Lets you show partial success: maybe 9 carts loaded fine, only 1 failed.
   */
  const fetchDataUsingPromiseAllSettled = useCallback(async () => {
    setError([]);
    setProducts([]);

    const users = await fetchUsers();

    // Step 1: carts
    const cartResults = await Promise.allSettled(users.map((u) => fetchUserCart(u.id)));

    // Step 2: filter successful carts
    const successfulCarts = cartResults
      .filter((res) => res.status === 'fulfilled')
      .map((res) => res.value);

    // collect cart errors
    const cartErrors = cartResults
      .filter((res) => res.status === 'rejected')
      .map((res) => res.reason);

    // Step 3: fetch products for successful carts
    const productResults = await Promise.allSettled(
      successfulCarts.map((c) => fetchCartProducts(c.cartId))
    );

    const successfulProducts = productResults
      .filter((res) => res.status === 'fulfilled')
      .flatMap((res) => res.value);

    const productErrors = productResults
      .filter((res) => res.status === 'rejected')
      .map((res) => res.reason);

    // Save to state
    setProducts(successfulProducts);
    setError([...cartErrors, ...productErrors]);
  }, []);

  // --- UI states ---
  if (loading) return <div>Loading…</div>;
  if (error)
    return (
      <div>
        {error} <button onClick={fetchData}>Retry</button>
      </div>
    );

  return (
    <ul>
      {products.map((p) => (
        <li key={p.productId}>
          {p.name} — ${p.price}
        </li>
      ))}
    </ul>
  );
}
