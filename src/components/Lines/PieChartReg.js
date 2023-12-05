import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const PieChartReg= ({ data }) => {
  return (
    <PieChart width={400} height={300}>
      <Pie dataKey="value" data={data} cx={200} cy={150} outerRadius={60} fill="#8884d8" label />
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartReg
