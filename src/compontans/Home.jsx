// src/components/Home.jsx
import { div } from 'framer-motion/client';
import React from 'react';
import '../style/Home.css';

const services = ['Deposit', 'Withdraw', 'Loan', 'Customer Service', 'Account Service', 'ATM'];

// Dummy live queue data
const queues = {
  Deposit: [{ token: 'D001' }, { token: 'D002' }],
  Withdraw: [{ token: 'W001' }],
  Loan: [],
  'Customer Service': [{ token: 'C001' }, { token: 'C002' }, { token: 'C003' }],
  'Account Service': [{ token: 'A001' }],
  ATM: [],
};

const getLiveToken = (service) => {
  return queues[service][0]?.token || 'None';
};

const getWaitingCount = (service) => {
  return queues[service].length > 1 ? queues[service].length - 1 : 0;
};

const Home = () => {
  return (
    <div className='section'>
    <div className="home-container">
      <h1 className="title">🏦 Bank Queue Dashboard</h1>
      <p className="subtitle">Live token status and customer flow overview</p>

      <div className="grid">
        {services.map(service => (
          <div key={service} className="card">
            <h3>{service}</h3>
            <p><strong>Live Token:</strong> {getLiveToken(service)}</p>
            <p><strong>Waiting:</strong> {getWaitingCount(service)} customer{getWaitingCount(service) !== 1 ? 's' : ''}</p>
            <p className="updated">Updated at: {new Date().toLocaleTimeString()}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;
