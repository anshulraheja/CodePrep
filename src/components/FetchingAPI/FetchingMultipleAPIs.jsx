import { useEffect, useState, useCallback } from 'react';
import mockFetch from './mockApi';

// Utility for safe fetch
async function safeFetch(url) {
  try {
    const response = await mockFetch(url);
    return { data: response, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

export default function FetchingMultipleAPIs() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const product = useCallback(async () => {}, []);

  // Separate concerns: one function to load products for a given user
  /**
    This function doesn’t use any props, state, or external variables that change over time.
    That’s why the dependency array is [] → meaning it will never be re-created.
    Benefit: If we pass it down to children or reuse in multiple places, it stays stable.
   */
  const loadProductsForUser = useCallback(async (userId) => {
    const { data: cart, error: cartError } = await safeFetch(
      `https://mock.api.com/users/${userId}/cart`
    );
    if (cartError) throw cartError;

    const { data: products, error: productError } = await safeFetch(
      `https://mock.api.com/carts/${cart.cartId}/products`
    );
    if (productError) throw productError;

    return products;
  }, []);

  /**
   * Here fetchData calls loadProductsForUser.
   * If loadProductsForUser ever changed, fetchData would need to be recreated as well.
   * That’s why loadProductsForUser is included in the dependency array.
   */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const { data: users, error: userError } = await safeFetch('https://mock.api.com/users');
      if (userError) throw userError;
      if (!users?.length) throw new Error('No users found');

      // For now only first user → scalable for multiple users via Promise.all
      const products = await loadProductsForUser(users[0].id);
      setProducts(products);
    } catch (err) {
      setError(err.message || 'Something went wrong while fetching data.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [loadProductsForUser]);

  /**
    Here fetchData is a stable callback created via useCallback.
    If I didn’t put [fetchData] in the array, React would complain (react-hooks/exhaustive-deps).
    Why? Because the effect depends on the current version of fetchData.
    If fetchData changes → we need to re-run the effect (refetch data).
    If fetchData doesn’t change → effect won’t unnecessarily run again.
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ----- UI -----
  if (loading) return <div>Loading products...</div>;

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={fetchData}>Retry</button>
      </div>
    );
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

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
