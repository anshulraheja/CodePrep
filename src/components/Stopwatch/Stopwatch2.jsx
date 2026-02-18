import React, { useEffect, useState } from 'react';

export default function Stopwatch2() {
    const [timer, setTimer] = useState(Date.now());
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning) {
            const start = Date.now();
        }
    }, timer);

    const handleStart = () => {
        setIsRunning(true);
    };

    const formatTime = () => {
        // const seconds = timer / 1000;
        // const remainingMilliSecond = timer % 1000;
        // const mins = seconds / 60;
        // const remainingMins = seconds % 60;
        // const hours = mins / 60;

        const hours = Math.floor(timer / 1000 / 60 / 60);
        const rMins = (timer / 1000 / 60) % 60;
        const rSeconds = (timer / 1000) % 60;
        const rMilliSeconds = timer % 1000;

        return `${hours < 10 ? `0${hours}` : hours}: ${rMins < 10 ? `0${rMins}` : rMins} :  ${rSeconds < 10 ? `0${rSeconds}` : rSeconds} : ${rMilliSeconds}`;
    };
    return (
        <div>
            <h1>Stopwatch</h1>
            <div>{formatTime(timer)}</div>
            <button onClick={handleStart}>Start</button>
            <button>Stop</button>
            <button>Reset</button>
        </div>
    );
}

/**
 * 1000ms = 1s
 * 60s = 1min
 * 60mins = 1hr
 *
 *
 */
