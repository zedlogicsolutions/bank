// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import './style/nav.css';
import Home from './compontans/Home';
import Counters from './compontans/Counters';
import Report from './compontans/Report';
import Staff from './compontans/Staff';



const AppRouter = () => {
  return (
    <Router>
      <nav className='nav'>
        <Link to="/" >User</Link>
        <Link to="/home">Home</Link>
        <Link to="/counter" >Counters</Link>
        <Link to="/report">report</Link>
        <Link to="/staff" >staff</Link>
        <Link to="/category" >category</Link>
        <Link to="/settings" >settings</Link>

      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/counter" element={<Counters />} />
        <Route path="/report" element={<Report />} />
        <Route path="/staff" element={<Staff />} />
        
        {/* <Route path="/admin" element={<Slidebar />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
