import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './user.css';

const services = ['Deposit', 'Withdraw', 'Account Service', 'Loan', 'Customer Service', 'ATM'];

// Global queue setup
if (!window.queues) {
  window.queues = {};
  services.forEach(service => {
    window.queues[service] = [];
  });
  window.tokenCounter = 1;
}

const App = () => {
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(services[0]);
  const [generatedToken, setGeneratedToken] = useState(null);

  const generateToken = () => {
    const prefix = service.charAt(0).toUpperCase();
    const token = `${prefix}${String(window.tokenCounter).padStart(3, '0')}`;
    window.tokenCounter++;

    const tokenData = {
      token,
      phone,
      time: new Date().toLocaleTimeString(),
    };

    window.queues[service].push(tokenData);
    setGeneratedToken(tokenData);
  };

  return (
    <div className="main">
      <h1>Queue System</h1>

      <label>Phone Number:</label>
      <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />

      <label>Service:</label>
      <select value={service} onChange={e => setService(e.target.value)}>
        {services.map(s => <option key={s}>{s}</option>)}
      </select>

      <button onClick={generateToken}>Generate Token</button>

      {generatedToken && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="print-token">
          <h2>Your Token</h2>
          <p><strong>Token No:</strong> {generatedToken.token}</p>
          <p><strong>Service:</strong> {service}</p>
          <p><strong>Time:</strong> {generatedToken.time}</p>
        </motion.div>
      )}
    </div>
  );
};

export default App;
