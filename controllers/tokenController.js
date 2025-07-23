const Token = require('../model/Token'); 

let tokenCounter = 0;

const generateToken = async (req, res) => {
  try {
    const { service, phone } = req.body;

    if (!service || !phone) {
      return res.status(400).json({ error: 'Service and phone are required' });
    }

    tokenCounter++;
    const tokenStr = `${service.slice(0, 2).toUpperCase()}-${tokenCounter}`;

    
    const tokenDoc = new Token({
      token: tokenStr,
      service,
      phone,
    });
    await tokenDoc.save();

    console.log(`Generated token: ${tokenStr} for ${service}, phone: ${phone}`);

    res.status(200).json({ token: tokenDoc });
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { generateToken };