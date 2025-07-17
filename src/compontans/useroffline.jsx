import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './user.css';



const services = ['Deposit', 'Withdraw', 'Account Service', 'Loan', 'Customer Service', 'ATM'];

let tokenCounter = 1;
const queues = {
  'Deposit': [],
  'Withdraw': [],
  'Account Service': [],
  'Loan': [],
  'Customer Service': [],
  'ATM': []
};

// Daily reset
const lastResetKey = 'ktvm_last_reset';
const today = new Date().toLocaleDateString();

if (localStorage.getItem(lastResetKey) !== today) {
  Object.keys(queues).forEach(service => queues[service] = []);
  tokenCounter = 1;
  localStorage.setItem(lastResetKey, today);
}

const App = () => {
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(services[0]);
  const [isPremium, setIsPremium] = useState(false);
  const [bookingTime, setBookingTime] = useState('');
  const [generatedToken, setGeneratedToken] = useState(null);
  const [showToken, setShowToken] = useState(false);

  const handleSubmit = () => {
    const prefix = service.charAt(0).toUpperCase();
    const token = `${prefix}${String(tokenCounter).padStart(3, '0')}`;
    tokenCounter++;

    const entry = { token, phone, isPremium, time: bookingTime };
    if (isPremium) {
      queues[service].unshift(entry);
    } else {
      queues[service].push(entry);
    }

    setGeneratedToken(entry);
    setShowToken(true);
  };

//   useEffect(() => {
//     if (generatedToken) {
//       const printTimeout = setTimeout(() => {
//         window.print();
//       }, 500);

//       const hideTimeout = setTimeout(() => {
//         setShowToken(false);
//       }, 6000);

//       const refreshTimeout = setTimeout(() => {
//         window.location.reload();
//       }, 3000);

//       return () => {
//         clearTimeout(printTimeout);
//         clearTimeout(hideTimeout);
//         clearTimeout(refreshTimeout);
//       };
//     }
//   }, [generatedToken]);

  const getLiveToken = (service) => {
    return queues[service][0]?.token || 'None';
  };

  const getWaitingTime = (service, token) => {
    const index = queues[service].findIndex(t => t.token === token);
    return index > 0 ? `${index * 10} mins` : 'Now';
  };

  const handleCancel = () => {
    setShowToken(false);
    setGeneratedToken(null);
  };

  return (
    <div className="main">
      <h1 className="head">ktvm bank</h1>
      <h2 className="slogon">Quick service, right this way.</h2>

      <div className="container">
        <div className="mb-4">
          <label className="block">Phone Number:</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="border" />
        </div>

        <div className="mb-4">
          <label className="block">Service:</label>
          <select value={service} onChange={e => setService(e.target.value)} className="select-1">
            {services.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
{/* 
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" checked={isPremium} onChange={e => setIsPremium(e.target.checked)} className="mr-2" />
            Premium Customer
          </label>
        </div> */}

        <button onClick={handleSubmit} className="gbutton">Generate Token</button>

        {showToken && generatedToken && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-gray-100 p-4 rounded print-token"
          >
            <h2 className="text-xl font-semibold">Your Token</h2>
            <p>Token No: <strong>{generatedToken.token}</strong></p>
            <p>Service: {service}</p>
            <p>Waiting Time: {getWaitingTime(service, generatedToken.token)}</p>
            <button onClick={handleCancel} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Cancel
            </button>
          </motion.div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">🔄 Live Queue Status (Today)</h2>

        <div className="grid">
          {services.map(s => {
            const live = getLiveToken(s);
            const waiting = queues[s].length > 0 ? queues[s].length - 1 : 0;

            return (
                <div className='livetoken'>
                    <div key={s} className="bg-white shadow-md rounded-xl p-4 border-l-4 border-blue-500 hover:shadow-lg transition duration-200">
                <h3 className="text-lg font-semibold text-gray-800">{s}</h3>
                <p className="text-sm mt-1 text-gray-600">
                  <strong>Live Token:</strong> {live}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Waiting:</strong> {waiting} customer{waiting !== 1 ? 's' : ''}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Updated at: {new Date().toLocaleTimeString()}
                </p>
                </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
