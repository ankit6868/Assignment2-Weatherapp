import { WeatherData, DailySummary } from '../types/weather';

const API_KEY = '46b788a17e8b31f62900eb5384a7473c'; // Replace with actual API key

export const INDIAN_METROS = [
  { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
  { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
];

export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  const data = await response.json();
  
  return {
    city: data.name,
    main: data.weather[0].main,
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    dt: data.dt,
    humidity: data.main.humidity,
    wind_speed: data.wind.speed,
  };
};

export const calculateDailySummary = (data: WeatherData[]): DailySummary => {
  const temps = data.map((d) => d.temp);
  const weatherConditions = data.map((d) => d.main);
  
  // Get dominant weather by frequency
  const weatherFreq = weatherConditions.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const dominantWeather = Object.entries(weatherFreq).reduce((a, b) => 
    a[1] > b[1] ? a : b
  )[0];

  return {
    date: new Date(data[0].dt * 1000).toISOString().split('T')[0],
    avgTemp: temps.reduce((a, b) => a + b, 0) / temps.length,
    maxTemp: Math.max(...temps),
    minTemp: Math.min(...temps),
    dominantWeather,
    city: data[0].city,
  };
};