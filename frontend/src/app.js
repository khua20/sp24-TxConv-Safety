import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GraphContainer from './GraphContainer';
import NavBar from './navBar';
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';
// import Shop from './Shop';
// import Login from './Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <NavBar />
          {/* <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/about" element={<About />} />
          </Routes> */}
          {/* <Routes>
            <Route path="/chart" element={<GraphContainer />} />
          </Routes> */}
          <GraphContainer />
          {/* <Routes>
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Routes>
            <Route path="/shop" element={<Shop />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes> */}
        </div>
      </div>
    </Router>
  );
};

export default App;
