import { useEffect, useRef, useState } from 'react';
import './AutoComplete.css';
import useDebounce from './useDebounce';
export default function AutoComplete() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropDown] = useState(false);
  const cache = useRef({}); // caching

  const debouncedTerm = useDebounce(searchTerm, 300); // debouncing the input

  console.log('AutoComplete render', {
    searchTerm,
    debouncedTerm,
    showDropdown,
    resultsCount: results.length,
    loading,
    error,
  });

  const fetchData = async (query) => {
    console.log('fetchData called', { query });
    if (cache.current[query]) {
      console.log('fetchData using cache', { query });
      setResults(cache.current[query]);
      return;
    }
    const controller = new AbortController();
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`https://dummyjson.com/recipes/search?q=${query ? query : ''}`, {
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Api failed');
      const json = await response.json();
      cache.current[query] = json.recipes;
      setResults(json.recipes || []);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError('Not able to get the recipes');
      }
      setError('Not able to get the recipes');
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
  };

  useEffect(() => {
    console.log('AutoComplete useEffect', { debouncedTerm, showDropdown });
    // don’t auto-fetch on empty unless focus triggers
    if (debouncedTerm === '' && !showDropdown) return;

    // Minimum character threshold
    // if (debouncedTerm.length > 1)
    fetchData(debouncedTerm);
  }, [debouncedTerm, showDropdown]);

  /**
   * If API call is debounced instead of input
    useEffect(() => {
    if (!searchTerm) return;

    // debounce API call itself
    const timeout = setTimeout(() => {
      fetchData(searchTerm);
    }, 300);

    // cleanup if user types again before 300ms
    return () => clearTimeout(timeout);
  }, [searchTerm]);
   */
  return (
    <div>
      <h1>Auto Complete Search Bar</h1>
      <div>
        <input
          type="text"
          className="input-search"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            console.log('input onChange', { value });
            setError('');
            setSearchTerm(value);
          }}
          onFocus={() => {
            console.log('input onFocus');
            setShowDropDown(true);
          }}
          onBlur={() => {
            console.log('input onBlur');
            setShowDropDown(false);
          }}
        />
      </div>

      {showDropdown && (
        <ul className="result-container" role="listbox">
          {error && <p className="error">{error}</p>}
          {loading && <p>Loading...</p>}
          {results.length > 0 && (
            <>
              {results.slice(0, 10).map((r) => (
                <li
                  className="result-item"
                  key={r.id}
                  onMouseDown={() => {
                    console.log('result selected', { name: r.name, id: r.id });
                    setSearchTerm(r.name);
                  }}
                  role="option"
                  aria-selected={searchTerm === r.name}
                >
                  {r.name}
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
