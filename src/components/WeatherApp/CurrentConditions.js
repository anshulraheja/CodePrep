import React, { useState } from 'react';
import mockCurrent from './openweather_current_sample.json';

const LAT = 40.727783;
const LON = -74.035412;
const UNITS = 'imperial';

export default function CurrentConditions() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchCurrent() {
    setLoading(true);
    setError('');
    try {
      const key = process.env.REACT_APP_OWM_API_KEY;
      let resJson;
      if (key) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${key}&units=${UNITS}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        resJson = await res.json();
      } else {
        resJson = mockCurrent;
      }
      setData(resJson);
    } catch (err) {
      setError(err.message || 'Failed to fetch current conditions');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="current-conditions">
      <button onClick={fetchCurrent} className="cta">
        Get Current Conditions
      </button>
      {loading && <div className="small-status">Loading current…</div>}
      {error && <div className="small-status error">{error}</div>}
      {data && (
        <div className="current-card">
          <h4>Now</h4>
          <div>
            <strong>{Math.round(data.main.temp)}°F</strong> — {data.weather?.[0]?.description}
          </div>
          <div>Humidity: {data.main.humidity}%</div>
          <div>Wind: {data.wind?.speed} mph</div>
        </div>
      )}
    </div>
  );
}
