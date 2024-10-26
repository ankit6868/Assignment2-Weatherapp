import React from 'react';
import { Sun, Cloud, CloudRain, Snowflake, Wind, Droplets } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { WeatherAnimation } from './WeatherAnimation';

interface Props {
  data: WeatherData;
}

const getWeatherColor = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return 'from-yellow-400 to-orange-500';
    case 'clouds':
      return 'from-gray-400 to-gray-600';
    case 'rain':
      return 'from-blue-400 to-blue-600';
    case 'snow':
      return 'from-blue-200 to-blue-400';
    default:
      return 'from-blue-400 to-indigo-600';
  }
};

const WeatherIcon = ({ condition }: { condition: string }) => {
  const iconClass = "w-12 h-12 text-white z-10";
  
  return (
    <div className="weather-icon-container">
      <div className={`weather-icon-bg bg-gradient-to-br ${getWeatherColor(condition)}`} />
      {condition.toLowerCase() === 'clear' && <div className="sun-rays" />}
      {condition.toLowerCase() === 'clouds' && <div className="clouds" />}
      {(() => {
        switch (condition.toLowerCase()) {
          case 'clear':
            return <Sun className={iconClass} />;
          case 'clouds':
            return <Cloud className={iconClass} />;
          case 'rain':
            return <CloudRain className={iconClass} />;
          case 'snow':
            return <Snowflake className={iconClass} />;
          default:
            return <Sun className={iconClass} />;
        }
      })()}
    </div>
  );
};

export const WeatherCard: React.FC<Props> = ({ data }) => {
  return (
    <div className={`glass-card rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-white/20 bg-gradient-to-br ${getWeatherColor(data.main)} bg-opacity-10`}>
      <WeatherAnimation condition={data.main} />
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">{data.city}</h3>
          <p className="text-gray-600 text-sm">{new Date(data.dt * 1000).toLocaleString()}</p>
        </div>
        <WeatherIcon condition={data.main} />
      </div>
      
      <div className="space-y-4 relative z-10">
        <div className="temp-badge">
          <p className="text-5xl font-bold text-gray-800">{data.temp.toFixed(1)}°</p>
          <p className="text-gray-600 mb-1 ml-1">C</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-white/30 p-3 rounded-lg backdrop-blur-sm">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Droplets className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="font-semibold text-gray-800">{data.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white/30 p-3 rounded-lg backdrop-blur-sm">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wind className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Wind</p>
              <p className="font-semibold text-gray-800">{data.wind_speed} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};