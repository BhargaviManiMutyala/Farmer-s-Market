// buyerRoutes.js
const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');  // Assuming you have a Buyer model

// Buyer login
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const buyer = await Buyer.findOne({ phone });

    if (!buyer) {
      return res.status(400).json({ error: 'Phone number not found' });
    }

    if (buyer.password !== password) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // If credentials match, respond with success status and message
    res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

module.exports = router;
