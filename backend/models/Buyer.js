const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  marketName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
});

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
