// buyerRoutes.js
const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');  // Assuming you have a Buyer model

// Buyer register
router.post('/register', async (req, res) => {
  const { marketName, email, password, location, phone } = req.body;

  try {
    const buyer = new Buyer({ marketName, email, password, location, phone });
    await buyer.save();
    res.status(201).json({ message: "Buyer Registered Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to Register Buyer" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const buyer = await Buyer.findOne({ phone });

    if (!buyer || buyer.password !== password) {
      return res.status(400).json({ error: 'Invalid phone or password' });
    }

    // Send the buyer details upon successful login
    res.status(200).json({
      marketName: buyer.marketName,
      phone: buyer.phone,
      email: buyer.email,
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching buyers' });
  }
});

module.exports = router;
