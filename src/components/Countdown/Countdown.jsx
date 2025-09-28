import React, { useEffect, useState, useRef, useCallback } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    // Clear any existing timer
    if (intervalRef.current) clearInterval(intervalRef.current);

    setTimeLeft(10); // reset
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer(); // start on mount
    return () => clearInterval(intervalRef.current); // cleanup
  }, [startTimer]);

  return (
    <div>
      <h2>{timeLeft > 0 ? timeLeft : "Time's up!"}</h2>
      <button onClick={startTimer}>Reset</button>
    </div>
  );
};

export default Countdown;
