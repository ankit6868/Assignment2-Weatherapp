import React from 'react';
import { Bell, AlertTriangle } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

export const AlertPanel: React.FC = () => {
  const { alerts, alertConfig, setAlertConfig } = useWeatherStore();

  return (
    <div className="glass-card rounded-2xl shadow-lg p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Weather Alerts</h3>
          <p className="text-sm text-gray-500">Configure temperature thresholds</p>
        </div>
        <Bell className="w-6 h-6 text-blue-600" />
      </div>

      <div className="mb-6 space-y-4">
        <label className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg cursor-pointer">
          <input
            type="checkbox"
            checked={alertConfig.enabled}
            onChange={(e) => setAlertConfig({ ...alertConfig, enabled: e.target.checked })}
            className="w-4 h-4 rounded border-blue-400 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Enable Alert System</span>
        </label>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Temperature (°C)</label>
            <input
              type="number"
              value={alertConfig.maxTemp}
              onChange={(e) => setAlertConfig({ ...alertConfig, maxTemp: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Temperature (°C)</label>
            <input
              type="number"
              value={alertConfig.minTemp}
              onChange={(e) => setAlertConfig({ ...alertConfig, minTemp: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="flex items-center justify-center p-6 text-gray-500 text-sm">
            No alerts yet
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm animate-fade-in"
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{alert}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};