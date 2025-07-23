
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Token = require('./model/Token'); 

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/queueDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));


app.post('/api/generate-token', async (req, res) => {
  const { phone, service } = req.body;

  if (!phone || !service) {
    return res.status(400).json({ message: 'Phone and Service need' });
  }

  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const count = await Token.countDocuments({
      service,
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    const tokenNumber = `${service.slice(0, 2).toUpperCase()}-${count + 1}`;

    const newToken = new Token({ phone, service, tokenNumber });
    const savedToken = await newToken.save();

    console.log(' Token saved to DB:', savedToken);

    res.status(201).json({
      message: 'Token Generated!',
      token: savedToken
    });
  } catch (error) {
    console.error(' Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.get('/api/live-tokens', async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tokens = await Token.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ createdAt: 1 });

    const serviceMap = {};

    tokens.forEach(token => {
      const service = token.service;
      if (!serviceMap[service]) {
        serviceMap[service] = [];
      }
      serviceMap[service].push(token.tokenNumber);
    });

    res.json(serviceMap);
  } catch (error) {
    console.error('Live token API error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/queue-status', async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const tokens = await Token.find({
      createdAt: { $gte: start, $lte: end },
      status: { $in: ['waiting', 'in-service'] }
    }).sort({ createdAt: 1 });

    const grouped = {};

    tokens.forEach(t => {
      if (!grouped[t.service]) grouped[t.service] = [];
      grouped[t.service].push({
        token: t.tokenNumber,
        phone: t.phone,
        status: t.status,
        createdAt: t.createdAt
      });
    });

    res.json(grouped);
  } catch (err) {
    console.error('Queue Status API error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});




const port = 5000;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

