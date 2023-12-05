import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChartReg from './LineChartReg';
import BarChartReg from './BarChartReg';
import PieChartReg from './PieChartReg';

const SavedCharts = ({ userId }) => {
    const [savedCharts, setSavedCharts] = useState([]);
  
    useEffect(() => {
      const fetchSavedCharts = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/charts?userId=${userId}`);
          setSavedCharts(response.data);
        } catch (error) {
          console.error('Error fetching saved charts:', error);
        }
      };
  
      fetchSavedCharts();
    }, [userId]);
  
    return (
      <div>
        <h3>Збережені графіки</h3>
        {savedCharts.map((chart) => (
          <div key={chart.id}>
            <p>Тип графіка: {chart.chartType}</p>
            {chart.chartType === 'bar' && <BarChartReg data={chart.chartData} />}
            {chart.chartType === 'pie' && <PieChartReg data={chart.chartData} />}
            {chart.chartType === 'line' && <LineChartReg data={chart.chartData} />}
          </div>
        ))}
      </div>
    );
  };
  
  export default SavedCharts;
