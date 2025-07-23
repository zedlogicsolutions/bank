

const express = require('express');
const router = express.Router();
const Token = require('../models/Token'); 

router.post('/generate-token', async (req, res) => {
  const { phone, service } = req.body;

  if (!phone || !service) {
    return res.status(400).json({ error: 'Missing phone or service' });
  }

  const newToken = new Token({
    token: `D${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    service,
    phone
  });

  try {
    const savedToken = await newToken.save();
    res.status(200).json(savedToken);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save token' });
  }
});

module.exports = router;
