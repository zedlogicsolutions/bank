// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ setPage }) => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li onClick={() => setPage('Home')}>🏠 Home</li>
        <li onClick={() => setPage('Counters')}>🧮 Counters</li>
        <li onClick={() => setPage('Category')}>📂 Category</li>
        <li onClick={() => setPage('Staff')}>👥 Staff</li>
        <li onClick={() => setPage('Reports')}>📊 Reports</li>
        <li onClick={() => setPage('Settings')}>⚙️ Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
