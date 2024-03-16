import React, { useState, useEffect } from 'react';
import GraphContainer from './GraphContainer';
import './App.css';

const generateMockData = () => { // Generate mock data for the graph 
  const data = [];
  const currentTime = new Date().getTime();

  for (let i = 0; i < 10; i++) {
    const time = new Date(currentTime - i * 1000); 
    const value = Math.floor(Math.random() * 100); 
    data.push({ time, value });
  }

  return data.reverse(); // Reverse the data array to display in chronological order
};

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mockData = generateMockData();
      setData(mockData);
    };

    const interval = setInterval(fetchData, 3000); // Fetch data every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Safety</h1>
        <GraphContainer data={data} />
      </header>
    </div>
  );
};

export default App;
