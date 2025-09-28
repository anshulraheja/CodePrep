import React from 'react';

function formatLocalTime(dt) {
  const d = new Date(dt * 1000);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function IntervalCard({ interval, onClick }) {
  const temp = Math.round(interval.main.temp);
  const weather = interval.weather?.[0];
  const label = weather?.main || '—';

  return (
    <button className="interval-card" onClick={onClick} aria-pressed="false">
      <div className="time">{formatLocalTime(interval.dt)}</div>
      <div className="icon" aria-hidden>
        {weather?.icon ? (
          <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
        ) : (
          '—'
        )}
      </div>
      <div className="temp">{temp}°</div>
      <div className="cond">{label}</div>
    </button>
  );
}
