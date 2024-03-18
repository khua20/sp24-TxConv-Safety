import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
  const up = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;

  const updateChart = (chart, newData) => {
    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.datasets[0].data;
    chart.update();
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Data',
          data: [],
          borderColor: 'rgb(149, 165, 166)',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
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

    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0'); 
      const seconds = String(now.getSeconds()).padStart(2, '0'); 
      const time = `${hours}:${minutes}:${seconds}`;
      const value = Math.floor(Math.random() * 500); 

      const newData = {
        labels: [...chartInstance.current.data.labels, time].slice(-10),
        datasets: [{
          ...chartInstance.current.data.datasets[0],
          data: [...chartInstance.current.data.datasets[0].data, value].slice(-10),
        }],
      };

      updateChart(chartInstance.current, newData);
    }, 1000); // mock data

    return () => {
      clearInterval(interval);
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

//---------------------------------------------------------------------------- Fetch Data

// import React, { useEffect, useRef, useState } from 'react';
// import Chart from 'chart.js/auto';

// const LineChart = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);
//   const [data, setData] = useState([]);

//   const updateChart = (chart, newData) => {
//     chart.data.labels = newData.labels;
//     chart.data.datasets[0].data = newData.datasets[0].data;
//     chart.update();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://arduino-ip-address/data'); // Replace with Arduino's IP and endpoint
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     const ctx = chartRef.current.getContext('2d');
//     chartInstance.current = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: [],
//         datasets: [{
//           label: 'Data',
//           data: [],
//           borderColor: 'rgb(149, 165, 166)',
//           backgroundColor: 'rgba(0, 0, 255, 0.1)',
//           lineTension: 0.5,
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });

//     const interval = setInterval(() => {
//       fetchData();
//     }, 1000); // Fetch data every 1 second

//     return () => {
//       clearInterval(interval);
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (data.length > 0) {
//       const newData = {
//         labels: data.map(entry => entry.time), // Assuming your data has a 'time' field
//         datasets: [{
//           ...chartInstance.current.data.datasets[0],
//           data: data.map(entry => entry.value), // Assuming your data has a 'value' field
//         }],
//       };
//       updateChart(chartInstance.current, newData);
//     }
//   }, [data]);

//   return (
//     <div className="line-chart-container">
//       <canvas ref={chartRef} className="line-chart-canvas"></canvas>
//     </div>
//   );
// };

// export default LineChart;
