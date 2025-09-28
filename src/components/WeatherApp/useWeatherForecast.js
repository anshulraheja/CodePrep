import { useEffect, useState, useCallback, useRef } from 'react';
import mockForecast from './openweather_forecast_sample.json';

/*
 Hook responsibilities:
 - Fetch forecast (openweather / mock fallback)
 - Group intervals by local calendar date string
 - Poll every 5 minutes; allow manual refresh
 - Provide loading/error states
*/

const LAT = 40.727783;
const LON = -74.035412;
const UNITS = 'imperial';
const POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes

function groupByDay(list) {
  // returns { '2025-09-01': [intervals], ... } using local date strings
  const map = {};
  list.forEach((item) => {
    const d = new Date(item.dt * 1000);
    // local YYYY-MM-DD label
    const key = d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    });
    if (!map[key]) map[key] = [];
    map[key].push(item);
  });
  // sort intervals for each day by dt
  Object.keys(map).forEach((k) => map[k].sort((a, b) => a.dt - b.dt));
  return map;
}

export default function useWeatherForecast() {
  const [daysByDate, setDaysByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const lastRawRef = useRef(null);
  const timerRef = useRef(null);

  const fetchForecast = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const key = process.env.REACT_APP_OWM_API_KEY;
      let data;
      if (key) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${key}&units=${UNITS}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
      } else {
        // fallback mock data (so app runs without API key)
        data = mockForecast;
      }

      // Sanity check
      const list = Array.isArray(data.list) ? data.list : [];
      // compare raw string to see if changed
      const raw = JSON.stringify(
        list.map((item) => ({ dt: item.dt, main: item.main, weather: item.weather }))
      );
      if (raw !== lastRawRef.current) {
        lastRawRef.current = raw;
        setDaysByDate(groupByDay(list));
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch forecast');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchForecast();

    // polling
    timerRef.current = setInterval(() => fetchForecast(), POLL_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchForecast]);

  const refreshNow = useCallback(() => {
    fetchForecast();
  }, [fetchForecast]);

  return { daysByDate, loading, error, refreshNow };
}
