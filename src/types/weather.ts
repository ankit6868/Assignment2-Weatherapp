export interface WeatherData {
  city: string;
  main: string;
  temp: number;
  feels_like: number;
  dt: number;
  humidity: number;
  wind_speed: number;
}

export interface DailySummary {
  date: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  dominantWeather: string;
  city: string;
}

export interface AlertConfig {
  maxTemp: number;
  minTemp: number;
  enabled: boolean;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
}