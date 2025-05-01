const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  buyerName: { type: String, required: true },
  buyerPhone: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  farmerPhone: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // You can add status to track the request progress
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
