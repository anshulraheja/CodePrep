import React, { useEffect, useState, useRef, useCallback } from 'react';
import './InfiniteScroll.css';
const API_URL = 'https://rickandmortyapi.com/api/character';

const InfiniteScroll = () => {
  const [characters, setCharacters] = useState([]);
  const [nextUrl, setNextUrl] = useState(API_URL); // acts like a cursor
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  // Fetch function
  const fetchCharacters = useCallback(async () => {
    if (!nextUrl || loading) return;

    setLoading(true);
    try {
      const res = await fetch(nextUrl);
      const data = await res.json();

      setCharacters((prev) => [...prev, ...data.results]);
      setNextUrl(data.info.next); // cursor for next page
    } catch (err) {
      console.error('Error fetching characters:', err);
    } finally {
      setLoading(false);
    }
  }, [nextUrl, loading]);

  // Observe the "sentinel" div
  //   const lastElementRef = useCallback(
  //     (node) => {
  //       /**
  //        * If data is currently being loaded, don’t attach a new observer (avoids duplicate fetch calls).
  //        */
  //       if (loading) return;

  //       /**
  //        * observerRef holds the current IntersectionObserver.
  //        * Disconnecting ensures we don’t have multiple observers watching old nodes → avoids memory leaks and duplicate triggers.
  //        */
  //       if (observerRef.current) observerRef.current.disconnect();

  //       observerRef.current = new IntersectionObserver((entries) => {
  //         if (entries[0].isIntersecting && nextUrl) {
  //           fetchCharacters();
  //         }
  //       });

  //       if (node) observerRef.current.observe(node);
  //     },
  //     [fetchCharacters, loading, nextUrl]
  //   );

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (!loading && scrollTop + clientHeight >= scrollHeight - 50) {
        fetchCharacters();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);
  // Initial fetch
  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="infinite-container">
      <h1 className="title">Rick & Morty Infinite Scroll</h1>
      <div className="card-list">
        {characters.map((char, index) => {
          const cardContent = (
            <>
              <img src={char.image} alt={char.name} className="card-img" />
              <p className="card-name">{char.name}</p>
            </>
          );

          if (index === characters.length - 1) {
            return (
              <div key={char.id} className="card">
                {cardContent}
              </div>
            );
          }

          return (
            <div key={char.id} className="card">
              {cardContent}
            </div>
          );
        })}
      </div>

      {loading && <p className="loading-text">Loading more characters...</p>}
    </div>
  );
};

export default InfiniteScroll;
