// src/components/Counter.jsx

import React, { useState } from 'react';
import '../style/Counters.css';
import { div } from 'framer-motion/client';

const services = ['Deposit', 'Withdraw', 'Account Service', 'Loan', 'Customer Service', 'ATM'];

let tokenCounter = 1;

// Simulated queue storage (can be upgraded to global store or backend)
const initialQueues = {
  Deposit: [],
  Withdraw: [],
  'Account Service': [],
  Loan: [],
  'Customer Service': [],
  ATM: [],
};

const Counter = () => {
  const [queues, setQueues] = useState(initialQueues);
  const [inService, setInService] = useState({});
  const [log, setLog] = useState([]);

  const serveNext = (service) => {
    const queue = queues[service];
    if (queue.length === 0) {
      setInService((prev) => ({ ...prev, [service]: null }));
      return;
    }

    const [nextToken, ...remainingQueue] = queue;
    setQueues((prev) => ({ ...prev, [service]: remainingQueue }));
    setInService((prev) => ({ ...prev, [service]: nextToken }));

    setLog((prev) => [...prev, { service, ...nextToken, time: new Date().toLocaleTimeString() }]);
  };

  const getWaitingTime = (service) => {
    const queueLength = queues[service].length;
    return queueLength === 0 ? 'Now' : `${queueLength * 10} min(s)`;
  };

  const renderTokenQueue = (service) => {
    return queues[service].length ? (
      queues[service].map((entry, idx) => (
        <li key={idx}>
          {entry.token} - 📞 {entry.phone}
        </li>
      ))
    ) : (
      <li>No tokens waiting</li>
    );
  };

  return (
    <div className='section'>
    <div className="counter-container">
      <h1>🏦 Counter Dashboard</h1>

      <div className="counter-grid">
        {services.map((service) => (
          <div key={service} className="counter-card">
            <h2>{service}</h2>

            <p><strong>In Service:</strong> {inService[service]?.token || 'None'}</p>
            <p><strong>Phone:</strong> {inService[service]?.phone || '-'}</p>
            <p><strong>Waiting:</strong> {queues[service].length} client(s)</p>
            <p><strong>Est. Wait Time:</strong> {getWaitingTime(service)}</p>

            <button onClick={() => serveNext(service)} className="serve-btn">
              Serve Next
            </button>

            <div className="queue-section">
              <h4>Queue:</h4>
              <ul>{renderTokenQueue(service)}</ul>
            </div>
          </div>
        ))}
      </div>

      <div className="history">
        <h2>🕑 Service History</h2>
        <ul>
          {log.map((item, idx) => (
            <li key={idx}>
              [{item.time}] {item.service}: {item.token} (📞 {item.phone})
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Counter;
