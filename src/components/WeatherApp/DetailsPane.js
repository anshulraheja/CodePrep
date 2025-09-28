import React from 'react';

export default function DetailsPane({ interval, onClose }) {
  if (!interval) {
    return (
      <aside className="details-pane empty">
        <p>Click an interval to see details.</p>
      </aside>
    );
  }

  const d = new Date(interval.dt * 1000);
  const timeStr = d.toLocaleString();

  return (
    <aside className="details-pane">
      <div className="details-header">
        <h3>Details</h3>
        <button onClick={onClose} aria-label="Close details">
          Close
        </button>
      </div>
      <div className="details-body">
        <p>
          <strong>Time:</strong> {timeStr}
        </p>
        <p>
          <strong>Temp:</strong> {Math.round(interval.main.temp)}°F
        </p>
        <p>
          <strong>Feels like:</strong> {Math.round(interval.main.feels_like)}°F
        </p>
        <p>
          <strong>Humidity:</strong> {interval.main.humidity}%
        </p>
        <p>
          <strong>Wind speed:</strong> {interval.wind?.speed} mph
        </p>
        <p>
          <strong>Condition:</strong> {interval.weather?.[0]?.description}
        </p>
      </div>
    </aside>
  );
}
