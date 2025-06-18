'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';

interface SensorData {
  id: number;
  feuchtigkeit: number;
  timestamp: string;
  simulated: boolean;
}

export default function Page() {
  const [data, setData] = useState<SensorData[]>([]);

useEffect(() => {
  fetch("https://plant-sensor-app-chvvn17.azurewebsites.net/sensor")
    .then((res) => res.json())
    .then((data: SensorData[]) => {
      const transformed = data.map((item, index) => ({
        ...item,
        feuchtigkeit: item.feuchtigkeit + (index % 3), // ⬅ künstliche Unterschiede
        timestamp: new Date(item.timestamp).toLocaleTimeString("de-CH", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      }));
      setData(transformed);
    });
}, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">🌿 Feuchtigkeits-Dashboard</h1>
      <div className="bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
            <YAxis unit="%" />
            <Tooltip
              formatter={(value: number) => `${value}%`}
              labelFormatter={(label) => `Zeit: ${label}`}
            />
            <Line type="monotone" dataKey="feuchtigkeit" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}