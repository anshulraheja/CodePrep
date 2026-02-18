import { useEffect, useState, useRef } from 'react';

const StopwatchTimer = ({ children }) => <h1 data-testid="stop_watch_timer">{children}</h1>;

const StartButton = (props) => (
  <button type="button" data-testid="start_button" {...props}>
    Start
  </button>
);
const PauseButton = (props) => (
  <button type="button" data-testid="pause_button" {...props}>
    Pause
  </button>
);
const ResetButton = (props) => (
  <button type="button" data-testid="reset_button" {...props}>
    Reset
  </button>
);

export default function App() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - timer;

      intervalRef.current = setInterval(() => {
        let curr = Date.now();
        let timeElapsed = curr - startTime;
        setTimer(timeElapsed);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleToggle = () => {
    console.log('toggle');
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setTimer(0);
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const formatTime = () => {
    const min = Math.floor(timer / (60 * 1000));
    const remainingTimeMs = timer % (60 * 1000);
    const seconds = Math.floor(remainingTimeMs / 1000);
    const remainingTimerMs2 = remainingTimeMs % 1000;

    return `${min < 10 ? `0${min}` : min}:${seconds < 10 ? `0${seconds}` : seconds}:${
      remainingTimerMs2 < 10 ? `0${remainingTimeMs}` : remainingTimeMs
    }`;
  };

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <StopwatchTimer>{formatTime(timer)}</StopwatchTimer>
      {isRunning ? <PauseButton onClick={handleToggle} /> : <StartButton onClick={handleToggle} />}
      <ResetButton onClick={handleReset} />
    </div>
  );
}
