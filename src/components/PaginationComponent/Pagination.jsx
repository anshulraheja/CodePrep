// only a consumer of modules.
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductCard.css';
import PaginationControls from './PaginationControls';
import usePagination from './usePagination';

export default function Pagination({ pageSize = 10 }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const { currentPage, totalPages, currentPageData, goToPage, nextPage, prevPage } = usePagination(
    products,
    pageSize
  );

  useEffect(() => {
    // Data fetching
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/?limit=500');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Failed to fetch data', err);
        setError('Failed to load products. Please try again.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (error)
    return (
      <div>
        <p>{error}</p>
        {/* Instead of silently failing, give the user a retry option. */}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  if (products.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <h1>Products</h1>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        prevPage={prevPage}
        nextPage={nextPage}
        data={products}
        pageSize={pageSize}
      />

      <div className="product-container">
        {currentPageData.map((item) => (
          <ProductCard key={item.id} title={item.title} images={item.images} />
        ))}
      </div>
    </div>
  );
}
