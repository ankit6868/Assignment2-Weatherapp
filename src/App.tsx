import React, { useEffect, useCallback } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { WeatherChart } from './components/WeatherChart';
import { AlertPanel } from './components/AlertPanel';
import { useWeatherStore } from './store/weatherStore';
import { INDIAN_METROS, fetchWeatherData, calculateDailySummary } from './utils/weather';
import { WeatherData } from './types/weather';
import { Cloud } from 'lucide-react';

function App() {
  const { 
    weatherData,
    dailySummaries,
    alertConfig,
    setWeatherData,
    setDailySummaries,
    addAlert
  } = useWeatherStore();

  const checkAlerts = useCallback((data: WeatherData) => {
    if (!alertConfig.enabled) return;

    if (data.temp > alertConfig.maxTemp) {
      addAlert(`High temperature alert in ${data.city}: ${data.temp.toFixed(1)}°C`);
    }
    if (data.temp < alertConfig.minTemp) {
      addAlert(`Low temperature alert in ${data.city}: ${data.temp.toFixed(1)}°C`);
    }
  }, [alertConfig, addAlert]);

  const fetchAllWeatherData = useCallback(async () => {
    for (const city of INDIAN_METROS) {
      try {
        const data = await fetchWeatherData(city.lat, city.lon);
        const cityData = weatherData[city.name] || [];
        const newData = [...cityData, data].slice(-288);
        
        setWeatherData(city.name, newData);
        checkAlerts(data);
        
        const summary = calculateDailySummary(newData);
        const citySummaries = dailySummaries[city.name] || [];
        setDailySummaries(city.name, [...citySummaries, summary].slice(-30));
      } catch (error) {
        console.error(`Error fetching data for ${city.name}:`, error);
      }
    }
  }, [weatherData, dailySummaries, setWeatherData, setDailySummaries, checkAlerts]);

  useEffect(() => {
    fetchAllWeatherData();
    const interval = setInterval(fetchAllWeatherData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAllWeatherData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cloud className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Weather Monitoring System
              </h1>
              <p className="text-gray-600 text-sm">Real-time weather updates for Indian metros</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </header>
        
        <div className="weather-grid animate-fade-in">
          {INDIAN_METROS.map((city) => (
            weatherData[city.name]?.[0] && (
              <WeatherCard
                key={city.name}
                data={weatherData[city.name][0]}
              />
            )
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6 animate-slide-up">
            {INDIAN_METROS.map((city) => (
              dailySummaries[city.name]?.length > 0 && (
                <WeatherChart
                  key={city.name}
                  data={dailySummaries[city.name]}
                  city={city.name}
                />
              )
            ))}
          </div>
          <div className="animate-slide-up">
            <AlertPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;