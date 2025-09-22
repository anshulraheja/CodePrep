import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeoutId); // cleanup
  }, [value, delay]);

  return debouncedValue;
}
/**
You type "c".
searchTerm updates immediately (setSearchTerm("c")).
useDebounce sees value = "c".
It starts a 300ms timer.
If you type again before 300ms (e.g., "ca"), the previous timer is cleared, and a new 300ms timer starts.
 */
