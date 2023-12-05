import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const LineChartReg = ({ data, handleEditData }) => (
  <ResponsiveContainer width={720} height={300} sx={{ '& > div > div': { border: 'none' } }}>
    <LineChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        onClick={(event, payload) => handleEditData(payload[0].payloadIndex)}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default LineChartReg;