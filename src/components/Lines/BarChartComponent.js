import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const BarChartComponent = () => {
  const data = [
    { name: 'Category 1', value: 30 },
    { name: 'Category 2', value: 45 },
    { name: 'Category 3', value: 20 },
    { name: 'Category 4', value: 35 },
    { name: 'Category 5', value: 25 },
  ];

  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartComponent;
