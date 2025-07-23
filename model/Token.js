
const mongoose = require('mongoose');


const tokenSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  tokenNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['waiting', 'in-service', 'served'], 
    default: 'waiting'
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

module.exports = mongoose.model('Token', tokenSchema);
