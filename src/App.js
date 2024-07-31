import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Selected from './components/Selected';
import AllOrders from './components/AllOrders';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home></Home>} />
          <Route path="/selected" element={<Selected></Selected>} />
          <Route path="/oreders" element={<AllOrders></AllOrders>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
