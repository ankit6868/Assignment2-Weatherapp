import { create } from 'zustand';
import { WeatherData, DailySummary, AlertConfig } from '../types/weather';

interface WeatherStore {
  weatherData: Record<string, WeatherData[]>;
  dailySummaries: Record<string, DailySummary[]>;
  alerts: string[];
  alertConfig: AlertConfig;
  setWeatherData: (city: string, data: WeatherData[]) => void;
  setDailySummaries: (city: string, summaries: DailySummary[]) => void;
  addAlert: (alert: string) => void;
  setAlertConfig: (config: AlertConfig) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weatherData: {},
  dailySummaries: {},
  alerts: [],
  alertConfig: {
    maxTemp: 35,
    minTemp: 10,
    enabled: true,
  },
  setWeatherData: (city, data) =>
    set((state) => ({
      weatherData: { ...state.weatherData, [city]: data },
    })),
  setDailySummaries: (city, summaries) =>
    set((state) => ({
      dailySummaries: { ...state.dailySummaries, [city]: summaries },
    })),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts].slice(0, 50),
    })),
  setAlertConfig: (config) =>
    set(() => ({
      alertConfig: config,
    })),
}));