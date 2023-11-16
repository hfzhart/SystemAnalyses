import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './MyLineChart.css';

const MyLineChart= () => {
    const data = [
      { name: 'Січень', value: 20 },
      { name: 'Лютий', value: 35 },
      { name: 'Березень', value: 10 },
      { name: 'Квітень', value: 25 },
      { name: 'Травень', value: 15 },
      
    ];
    return (
        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      );
    };

export default MyLineChart;
