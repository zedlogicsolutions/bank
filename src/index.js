// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { QueueProvider } from './Queuestore';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <QueueProvider>
      <App />
    </QueueProvider>
  </BrowserRouter>
);
