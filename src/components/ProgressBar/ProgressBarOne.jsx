// Create a React component with a progress bar that starts at 10 and decreases to 0 over 10 seconds (1 unit per second).

import { useState, useEffect } from "react";
import "./ProgressBarOne.css"
export default function ProgressBarOne() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timerId = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timerId);
          return 0;
        } else return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
