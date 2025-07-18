import React, { useState, useEffect } from 'react';
import './adminpanel.css';
import { queues, servicesList } from './queueStore';

const AdminPanel = () => {
  const [queueData, setQueueData] = useState({});

  // Refresh queue state from shared queues
  const refreshQueue = () => {
    const data = {};
    servicesList.forEach(service => {
      data[service] = {
        live: queues[service][0] || null,
        waiting: queues[service].slice(1),
        out: queues[service].filter(entry => entry.status === 'out'),
      };
    });
    setQueueData(data);
  };

  // Call next person and mark as served
  const callNext = (service) => {
    const current = queues[service].shift();
    if (current) {
      current.status = 'out';
      queues[service].push(current);
    }
    refreshQueue();
  };

  useEffect(() => {
    refreshQueue();
    const interval = setInterval(refreshQueue, 1000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-panel">
      <h1>👩‍💼 Admin Queue Management</h1>

      {servicesList.map(service => {
        const data = queueData[service] || { live: null, waiting: [], out: [] };

        return (
          <div key={service} className="admin-card">
            <h2>{service}</h2>

            <p><strong>Live:</strong> 
              {data.live 
                ? `${data.live.token} (${data.live.phone}) - ${data.live.comment || 'No comment'}`
                : 'None'}
            </p>

            <button onClick={() => callNext(service)} className="btn-next">⏭️ Call Next</button>

            <p className="section-title">🕒 Waiting</p>
            <ul>
              {data.waiting.length ? data.waiting.map((q, idx) => {
                const waitTime = Math.floor((Date.now() - q.timestamp) / 60000); // minutes
                return (
                  <li key={idx}>
                    {q.token} - {q.phone} ({waitTime} min)
                    <br />
                    <em>Comment:</em> {q.comment || 'No comment'}
                  </li>
                );
              }) : <li>No one waiting</li>}
            </ul>

            <p className="section-title">✅ Served (Out)</p>
            <ul className="text-muted">
              {data.out.length ? data.out.map((q, idx) => (
                <li key={idx}>
                  {q.token} - {q.phone}
                  <br />
                  <em>Comment:</em> {q.comment || 'No comment'}
                </li>
              )) : <li>No one served yet</li>}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default AdminPanel;
