const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  lastDate: String,
  price: String,
  phone: String,
  image: String, // store filename
});

module.exports = mongoose.model('Product', productSchema);
