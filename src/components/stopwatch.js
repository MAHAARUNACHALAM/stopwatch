import React, { useState, useEffect } from 'react';
import './stopwatch.css';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, startTime]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setElapsedTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, elapsedTime]);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:
            ${minutes.toString().padStart(2, '0')}:
            ${seconds.toString().padStart(2, '0')}:
            ${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="display">{formatTime(elapsedTime)}</div>
      <div className="controls">
        <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
        <button onClick={handleReset} disabled={isRunning}>
          Reset
        </button>
      </div>
      {laps.length > 0 && (
        <div className="lap-times">
          <h2>Lap Times</h2>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>{formatTime(lapTime)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
