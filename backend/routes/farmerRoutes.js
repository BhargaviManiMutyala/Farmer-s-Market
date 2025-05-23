// farmerRoutes.js
const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');  // Assuming you have a Farmer model

// Register Farmer
router.post('/register', async (req, res) => {
  const { farmName, email, password, location, phone } = req.body;

  try {
    const farmer = new Farmer({ farmName, email, password, location, phone });
    await farmer.save();
    res.status(201).json({ message: "Farmer Registered Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to Register Farmer" });
  }
});

// Farmer login
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const farmer = await Farmer.findOne({ phone });

    if (!farmer || farmer.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return necessary details for localStorage
    res.status(200).json({
      phone: farmer.phone,
      farmName: farmer.farmName,
      email: farmer.email,
      location: farmer.location
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

// Fetch farmer details by phone number
router.get('/:phone', async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ phone: req.params.phone });

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.status(200).json({
      farmName: farmer.farmName,
      email: farmer.email,
      location: farmer.location,
      phone: farmer.phone,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching farmer details', error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching farmers' });
  }
});

module.exports = router;
