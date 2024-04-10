import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const dataQueue = useRef([]);
  
  const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
  const up = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;

  useEffect(() => {
    const fetchDataAndUpdateChart = async () => {
      try {
        const response = await fetch('http://10.159.66.56/data');  // Change IP address to match your server
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        console.log('Data:', jsonData);

        const currentTime = new Date();

        // Format the time as hr:min:sec
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const hoursIn12HourFormat = hours % 12 || 12;
        const timeString = `${hoursIn12HourFormat}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        dataQueue.current.push({ time: timeString, value: jsonData.value });

        if (dataQueue.current.length > 10) {
          dataQueue.current.shift();
        }

        requestAnimationFrame(() => {
          chartInstance.current.data.labels = dataQueue.current.map(entry => entry.time);
          chartInstance.current.data.datasets[0].data = dataQueue.current.map(entry => entry.value);
          chartInstance.current.update();
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    };
  
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
  
    const intervalId = setInterval(fetchDataAndUpdateChart, 2000);
  
    return () => {
      clearInterval(intervalId);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="line-chart-container">
      <canvas ref={chartRef} className="line-chart-canvas"></canvas>
    </div>
  );
};

export default LineChart;