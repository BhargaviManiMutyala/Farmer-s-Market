// farmerRoutes.js
const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');  // Assuming you have a Farmer model

// Farmer login
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const farmer = await Farmer.findOne({ phone });

    if (!farmer) {
      return res.status(401).json({ error: 'Phone number not found' });
    }

    if (farmer.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // If credentials match, respond with success status and message
    res.status(200).json({ message: 'Login successful!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

module.exports = router;
