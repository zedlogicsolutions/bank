// src/compontans/Counter.jsx
import React, { useState } from 'react';
import { useQueue } from '../Queuestore';
import '../style/Counters.css';

const Counter = () => {
  const {
    services,
    queues,
    inService,
    log,
    serveNext,
    addToken,
    getWaitingTime,
  } = useQueue();

  const [phoneInputs, setPhoneInputs] = useState({});

  const handlePhoneChange = (service, value) => {
    setPhoneInputs(prev => ({ ...prev, [service]: value }));
  };

  const handleAddToken = (service) => {
    const phone = phoneInputs[service]?.trim();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid phone number (minimum 10 digits)');
      return;
    }
    addToken(service, phone);
    setPhoneInputs(prev => ({ ...prev, [service]: '' }));
  };

  return (
    <div className="section">
      <div className="counter-container">
        <h1>🏦 Counter Dashboard</h1>

        <div className="counter-grid">
          {services.map(service => (
            <div key={service} className="counter-card">
              <h2>{service}</h2>

              <p><strong>In Service:</strong> {inService[service]?.token || 'None'}</p>
              <p><strong>Phone:</strong> {inService[service]?.phone || '-'}</p>
              <p><strong>Waiting:</strong> {queues[service]?.length} client(s)</p>
              <p><strong>Est. Wait Time:</strong> {getWaitingTime(service)}</p>

              <div className="phone-input">
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneInputs[service] || ''}
                  onChange={(e) => handlePhoneChange(service, e.target.value)}
                />
              </div>

              <div className="btn-group">
                <button onClick={() => serveNext(service)} className="serve-btn">Serve Next</button>
                <button onClick={() => handleAddToken(service)} className="add-btn">+ Add Token</button>
              </div>

              <div className="queue-section">
                <h4>Queue List</h4>
                <ul>
                  {queues[service]?.length > 0 ? (
                    queues[service].map((entry, idx) => (
                      <li key={idx}>{entry.token} - {entry.phone}</li>
                    ))
                  ) : (
                    <li>No tokens waiting</li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="history">
          <h2>Service History</h2>
          <ul>
            {log.map((item, idx) => (
              <li key={idx}>
                [{item.time}] {item.service}: <strong>{item.token}</strong> ({item.phone})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Counter;
