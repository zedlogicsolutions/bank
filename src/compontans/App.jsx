// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Counters from './components/Counters';
import Category from './components/Category';
import Staff from './components/Staff';
import Reports from './components/Reports';
import Settings from './components/Settings';
import './style/adminpanel.css'; // ✅ Fixed path

const App = () => {
  const [page, setPage] = useState('Home');

  const renderPage = () => {
    switch (page) {
      case 'Home': return <Home />;
      case 'Counters': return <Counters />;
      case 'Category': return <Category />;
      case 'Staff': return <Staff />;
      case 'Reports': return <Reports />;
      case 'Settings': return <Settings />;
      default: return <Home />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar setPage={setPage} />
      <div className="dashboard-content">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
