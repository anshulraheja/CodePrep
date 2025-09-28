import React from 'react';
import ForecastDay from './ForecastDay';

export default function ForecastList({ daysByDate = {}, onSelectInterval }) {
  // daysByDate is an object; preserve calendar order
  const keys = Object.keys(daysByDate);
  return (
    <div className="forecast-list" aria-live="polite">
      {keys.length === 0 && <div>No forecast available</div>}
      {keys.map((dayKey) => (
        <ForecastDay
          key={dayKey}
          dayLabel={dayKey}
          intervals={daysByDate[dayKey]}
          onSelectInterval={onSelectInterval}
        />
      ))}
    </div>
  );
}
