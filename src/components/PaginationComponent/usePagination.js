// State logic
// generic, works with any dataset, not tied to products.
import { useState, useMemo } from 'react';

export default function usePagination(data = [], pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(0);

  // ensures totalPages is never 0
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  // avoids recalculating slices
  const currentPageData = useMemo(() => {
    const start = currentPage * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const goToPage = (pageIndex) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    currentPage,
    totalPages,
    currentPageData,
    goToPage,
    nextPage,
    prevPage,
  };
}
