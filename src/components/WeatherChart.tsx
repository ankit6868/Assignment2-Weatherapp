import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DailySummary } from '../types/weather';

interface Props {
  data: DailySummary[];
  city: string;
}

export const WeatherChart: React.FC<Props> = ({ data, city }) => {
  return (
    <div className="glass-card p-6 rounded-2xl shadow-lg border border-white/20">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">{city} Temperature Trends</h3>
        <p className="text-sm text-gray-500">30-day temperature history</p>
      </div>
      <div className="h-[300px] chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                padding: '12px',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="maxTemp" 
              stroke="#ef4444" 
              name="Max Temp"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#ef4444" }}
            />
            <Line 
              type="monotone" 
              dataKey="avgTemp" 
              stroke="#3b82f6" 
              name="Avg Temp"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
            <Line 
              type="monotone" 
              dataKey="minTemp" 
              stroke="#22c55e" 
              name="Min Temp"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#22c55e" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};