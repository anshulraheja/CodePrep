import React, { useState } from 'react';
import useWeatherForecast from './useWeatherForecast';
import ForecastList from './ForecastList';
import DetailsPane from './DetailsPane';
import CurrentConditions from './CurrentConditions';
import './styles.css';

export default function ForecastPage() {
  const { daysByDate, loading, error, refreshNow } = useWeatherForecast();
  const [selectedInterval, setSelectedInterval] = useState(null);

  return (
    <div className="forecast-page">
      <div className="top-row">
        <CurrentConditions />
        <div className="controls">
          <button onClick={refreshNow} className="cta">
            Refresh Forecast Now
          </button>
        </div>
      </div>

      {loading && <div className="status">Loading forecast…</div>}
      {error && <div className="status error">Error: {error}</div>}

      {!loading && !error && (
        <div className="content">
          <ForecastList daysByDate={daysByDate} onSelectInterval={setSelectedInterval} />
          <DetailsPane interval={selectedInterval} onClose={() => setSelectedInterval(null)} />
        </div>
      )}
    </div>
  );
}
