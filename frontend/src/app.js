import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GraphContainer from './GraphContainer';
import NavBar from './navBar';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <NavBar />
          <Routes>
            <Route path="/chart" element={<GraphContainer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
