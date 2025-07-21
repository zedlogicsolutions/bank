const http = require('http');

let queues = {
  'Deposit': [],
  'Withdraw': [],
  'Account Service': [],
  'Loan': [],
  'Customer Service': [],
  'ATM': []
};
let tokenCounter = 1;

const server = http.createServer((req, res) => {
  // Allow requests from React (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/queues' && req.method === 'GET') {
    res.end(JSON.stringify(queues));
  } else if (req.url === '/token' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { phone, service } = JSON.parse(body);
      const token = service[0].toUpperCase() + String(tokenCounter).padStart(3, '0');
      tokenCounter++;

      const entry = { token, phone, status: 'waiting' };
      queues[service].push(entry);
      res.end(JSON.stringify(entry));
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'pandi' }));
  }
});

server.listen(5000, () => console.log('Server running on http://localhost:5000'));
