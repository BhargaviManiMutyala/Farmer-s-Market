const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      image: req.file.filename,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save product', error: err });
  }
});

// productRoutes.js
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product details', error: err });
  }
});


// GET request to fetch products by phone number
router.get('/', async (req, res) => {
  try {
    const { phone } = req.query; // Get the phone number from query parameter
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const products = await Product.find({ phone }); // Fetch products based on the phone number

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this farmer' });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
});

module.exports = router;
