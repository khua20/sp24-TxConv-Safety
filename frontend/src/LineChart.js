import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
  const up = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;
  const [data, setData] = useState([]);

  const updateChart = (chart, newData) => {
    const maxDataPoints = 10; 
    const currentData = chart.data.datasets[0].data;
    const newDataValues = newData.datasets[0].data;

    if (currentData.length >= maxDataPoints) {
      chart.data.labels.shift();
      currentData.shift();
    }

    chart.data.labels.push(newData.labels[0]);
    currentData.push(newDataValues[0]);

    chart.update();
  };

  useEffect(() => {
    const fetchDataAndUpdateChart = async () => {
      try {
        const response = await fetch('http://10.159.66.204/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        console.log('Data:', jsonData);
  
        chartInstance.current.data.labels.push(jsonData.time);
        chartInstance.current.data.datasets[0].data.push(jsonData.value);

        if (chartInstance.current.data.labels.length > 10) {
          chartInstance.current.data.labels.shift();
          chartInstance.current.data.datasets[0].data.shift();
        }
  
        chartInstance.current.update();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // if (chartInstance.current) {
    //   chartInstance.current.destroy();
    // }
  
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Data',
          data: [],
          borderColor: 'rgb(149, 165, 166)',
          lineTension: 0.5,
          segment: {
            borderColor: ctx => down(ctx, 'rgb(192, 57, 43)') || up(ctx, 'rgb(22, 160, 133)') || up(ctx, 'rgb(149, 165, 166)'),
          }
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
  
    const intervalId = setInterval(fetchDataAndUpdateChart, 1000);
  
    return () => {
      clearInterval(intervalId);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // const formatTime = (timestamp) => {
  //   const date = new Date(timestamp);
  //   const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   const seconds = String(date.getSeconds()).padStart(2, '0');
  //   const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
  //   return `${hours}:${minutes}:${seconds} ${amPm}`;
  // };

  // useEffect(() => {
  //   if (data.length > 0) {
  //     const newData = {
  //       labels: data.map(entry => formatTime(entry.time)), // Assuming data has a 'time' field
  //       datasets: [{
  //         ...chartInstance.current.data.datasets[0],
  //         data: data.map(entry => entry.value), // Assuming data has a 'value' field
  //       }],
  //     };
  //     updateChart(chartInstance.current, newData);
  //   }
  // }, [data]);

  return (
    <div className="line-chart-container">
      <canvas ref={chartRef} className="line-chart-canvas"></canvas>
    </div>
  );
};

export default LineChart;
