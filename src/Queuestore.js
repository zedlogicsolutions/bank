// src/context/queuestore.js
import React, { createContext, useContext, useState } from 'react';

const QueueContext = createContext();

export const useQueue = () => useContext(QueueContext);

const servicesList = [
  'Deposit',
  'Withdraw',
  'Account Service',
  'Loan',
  'Customer Service',
  'ATM'
];

// Helper to create initial queue object
const createInitialQueues = () => {
  const obj = {};
  servicesList.forEach(service => (obj[service] = []));
  return obj;
};

let tokenCounter = 1;

export const QueueProvider = ({ children }) => {
  const [queues, setQueues] = useState(createInitialQueues());
  const [inService, setInService] = useState({});
  const [log, setLog] = useState([]);

  const addToken = (service, phone) => {
    const token = `${service.charAt(0)}${String(tokenCounter++).padStart(3, '0')}`;
    const entry = { token, phone };

    setQueues(prev => ({
      ...prev,
      [service]: [...prev[service], entry]
    }));
  };

  const serveNext = (service) => {
    const queue = queues[service];
    if (!queue || queue.length === 0) {
      setInService(prev => ({ ...prev, [service]: null }));
      return;
    }

    const [next, ...rest] = queue;
    setQueues(prev => ({ ...prev, [service]: rest }));
    setInService(prev => ({ ...prev, [service]: next }));
    setLog(prev => [...prev, { service, ...next, time: new Date().toLocaleTimeString() }]);
  };

  const getWaitingTime = (service) => {
    const count = queues[service].length;
    return count === 0 ? 'Now' : `${count * 10} min(s)`;
  };

  return (
    <QueueContext.Provider
      value={{
        services: servicesList,
        queues,
        inService,
        log,
        addToken,
        serveNext,
        getWaitingTime
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};
