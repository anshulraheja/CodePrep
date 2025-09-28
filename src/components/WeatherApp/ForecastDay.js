import React from 'react';
import IntervalCard from './IntervalCard';

export default function ForecastDay({ dayLabel, intervals = [], onSelectInterval }) {
  return (
    <section className="forecast-day">
      <div className="day-header">{dayLabel}</div>
      <div className="interval-row">
        {intervals.map((it) => (
          <IntervalCard key={it.dt} interval={it} onClick={() => onSelectInterval(it)} />
        ))}
      </div>
    </section>
  );
}
