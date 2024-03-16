import React from 'react';
import LineChart from './LineChart';

const GraphContainer = ({ data }) => {
  return (
    <div className="graph-container">
      <h2>Real-time Line Chart</h2>
      <LineChart data={data} />
    </div>
  );
};

export default GraphContainer;
