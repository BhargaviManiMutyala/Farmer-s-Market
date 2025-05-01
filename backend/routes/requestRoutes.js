const express = require('express');
const Request = require('../models/Request');
const router = express.Router();

// Create a new request
router.post('/', async (req, res) => {
  const { buyerName, buyerPhone, buyerEmail, farmerPhone, productId, productName } = req.body;

  try {
    const newRequest = new Request({
      buyerName,
      buyerPhone,
      buyerEmail,
      farmerPhone,
      productId,
      productName
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully!', request: newRequest });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create request', error: err });
  }
});

// Get all requests for a farmer (by farmer's phone)
router.get('/:farmerPhone', async (req, res) => {
  try {
    const requests = await Request.find({ farmerPhone: req.params.farmerPhone }).populate('productId');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err });
  }
});

module.exports = router;
