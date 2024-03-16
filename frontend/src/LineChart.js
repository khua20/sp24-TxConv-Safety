import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (data.length === 0) return; 

    const formattedLabels = data.map(entry => formatTimestamp(entry.time)); 
    const values = data.map(entry => entry.value); 

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: formattedLabels,
        datasets: [{
          label: 'Data',
          data: values,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  const formatTimestamp = timestamp => new Date(timestamp).toLocaleTimeString();

  return (
    <div className="line-chart-container">
      <canvas ref={chartRef} className="line-chart-canvas"></canvas>
    </div>
  );
};

export default LineChart;
