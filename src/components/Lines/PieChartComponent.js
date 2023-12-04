import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const PieChartComponent = () => {
  const data = [
    { name: 'Category A', value: 30 },
    { name: 'Category B', value: 45 },
    { name: 'Category C', value: 20 },
  ];

  return (
    <PieChart width={400} height={300}>
      <Pie dataKey="value" data={data} cx={200} cy={150} outerRadius={60} fill="#8884d8" label />
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
