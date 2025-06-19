// 'use client';

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { useEffect, useState } from 'react';

// interface SensorData {
//   id: number;
//   feuchtigkeit: number;
//   timestamp: string;
//   simulated: boolean;
// }

// export default function Page() {
//   const [data, setData] = useState<SensorData[]>([]);

// useEffect(() => {
//   fetch("https://plant-sensor-app-chvvn17.azurewebsites.net/sensor")
//     .then((res) => res.json())
//     .then((data: SensorData[]) => {
//       const transformed = data.map((item) => ({
//         ...item,
//         feuchtigkeit: item.feuchtigkeit,
//         timestamp: new Date(item.timestamp).toLocaleTimeString("de-CH", {
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//         }),
//       }));
//       setData(transformed);
//     });
// }, []);

//   return (
//     <main className="p-8">
//       <h1 className="text-2xl font-bold mb-4">🌿 Feuchtigkeits-Dashboard</h1>
//       <div className="bg-white p-4 rounded shadow">
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
//             <YAxis unit="%" />
//             <Tooltip
//               formatter={(value: number) => `${value}%`}
//               labelFormatter={(label) => `Zeit: ${label}`}
//             />
//             <Line type="monotone" dataKey="feuchtigkeit" stroke="#8884d8" strokeWidth={2} dot={false} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </main>
//   );
//}

import { Container, Typography, Card, CardContent, Grid, Switch, Box } from '@mui/material';
import { useState } from 'react';

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  // Dummy sensor data
  const sensors = [
    { name: 'Sensor 1', value: 42, unit: '%' },
    { name: 'Sensor 2', value: 55, unit: '%' },
    { name: 'Sensor 3', value: 38, unit: '%' },
  ];

  return (
    <Box sx={{ bgcolor: darkMode ? '#222' : '#f5f5f5', minHeight: '100vh', transition: '0.3s' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight="bold" color={darkMode ? '#fff' : '#222'}>
            🌱 Feuchtigkeits-Dashboard
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography color={darkMode ? '#fff' : '#222'}>Dark Mode</Typography>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Box>
        </Box>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {sensors.map((sensor, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card sx={{
                bgcolor: darkMode ? '#333' : '#fff',
                boxShadow: 3,
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': { boxShadow: 6, transform: 'scale(1.03)' }
              }}>
                <CardContent>
                  <Typography variant="h6" color={darkMode ? '#fff' : '#222'}>
                    {sensor.name}
                  </Typography>
                  <Typography variant="h3" color="primary">
                    {sensor.value}{sensor.unit}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}