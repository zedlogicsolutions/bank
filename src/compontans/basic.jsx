// src/components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import './adminpanel.css';
import Useroffline from './useroffline';

const services = ['Deposit', 'Withdraw', 'Account Service', 'Loan', 'Customer Service', 'ATM'];

// Use shared queues across the app
if (!window.queues) {
  window.queues = {};
  services.forEach(service => {
    window.queues[service] = [];
  });
}
const queues = window.queues;

const AdminPanel = () => {
  const [queueData, setQueueData] = useState({});

  const refreshQueue = () => {
    const data = {};
    services.forEach(service => {
      data[service] = {
        live: queues[service][0] || null,
        waiting: queues[service].slice(1),
        out: queues[service].filter(entry => entry.status === 'out'),
      };
    });
    setQueueData(data);
  };
  
  const getLiveToken = (service) => {
  return queues[service][0] ? queues[service][0].token : 'None';
};


  useEffect(() => {
    refreshQueue();
    const interval = setInterval(refreshQueue, 1000); // live update
    return () => clearInterval(interval);
  }, []);

  const callNext = (service) => {
    const current = queues[service].shift();
    if (current) {
      current.status = 'out';
      queues[service].push(current);
    }
    refreshQueue();
  }; 
  return (
         <div className="admin-panel">
        <h1>👩‍💼 Admin Queue Management</h1>
        
        {services.map(s => {
          const live = getLiveToken(s);
          const data = queueData[s] || { live: null, waiting: [], out: [] };
        
          return (
            <div key={s} className="admin-card">
              <h2>{s}</h2>
          
              <p>
                <strong>Live:</strong> {live}{' '}
                {data.live ? `(${data.live.token} - ${data.live.phone})` : '(None)'}
              </p>
          
              <button onClick={() => callNext(s)} className="btn-next">
                ⏭️ Call Next
              </button>
          
              <p className="section-title">🕒 Waiting</p>
              <ul>
                {data.waiting.length ? (
                  data.waiting.map((q, idx) => (
                    <li key={idx}>{q.token} - {q.phone}</li>
                  ))
                ) : (
                  <li>No one waiting</li>
                )}
              </ul>
              
              <p className="section-title">✅ Served (Out)</p>
              <ul className="text-muted">
                {data.out.length ? (
                  data.out.map((q, idx) => (
                    <li key={idx}>{q.token} - {q.phone}</li>
                  ))
                ) : (
                  <li>No one served yet</li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
  );
};

export default AdminPanel;
