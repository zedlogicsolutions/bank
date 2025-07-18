const services = ['Deposit', 'Withdraw', 'Account Service', 'Loan', 'Customer Service', 'ATM'];

let tokenCounter = 1;

const queues = {};
services.forEach(service => {
  queues[service] = [];
});

// Reset daily
const lastResetKey = 'ktvm_last_reset';
const today = new Date().toLocaleDateString();

if (localStorage.getItem(lastResetKey) !== today) {
  services.forEach(service => queues[service] = []);
  tokenCounter = 1;
  localStorage.setItem(lastResetKey, today);
}

const addToken = (service, phone, isPremium = false, time = '') => {
  const prefix = service.charAt(0).toUpperCase();
  const token = `${prefix}${String(tokenCounter).padStart(3, '0')}`;
  tokenCounter++;

  const entry = { token, phone, isPremium, time };
  if (isPremium) {
    queues[service].unshift(entry);
  } else {
    queues[service].push(entry);
  }

  return entry;
};

const getLiveToken = (service) => queues[service][0]?.token || 'None';

const getWaitingCount = (service) => {
  return queues[service].length > 0 ? queues[service].length - 1 : 0;
};

const getWaitingTime = (service, token) => {
  const index = queues[service].findIndex(t => t.token === token);
  return index > 0 ? `${index * 10} mins` : 'Now';
};

export {
  services,
  queues,
  addToken,
  getLiveToken,
  getWaitingCount,
  getWaitingTime
};
