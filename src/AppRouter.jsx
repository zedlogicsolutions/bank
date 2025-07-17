// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import Basic from './compontans/basic';


const AppRouter = () => {
  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '15px' }}>🏦 User View</Link>
        <Link to="/admin">🧑‍💼 Admin Panel</Link>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Basic />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
