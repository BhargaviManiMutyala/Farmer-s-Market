const express = require('express');
const Request = require('../models/Request');
const router = express.Router();

// Create a new request
router.post('/', async (req, res) => {
  const { buyerName, buyerPhone, buyerEmail, farmerPhone, productId, productName, quantity, price } = req.body;

  try {
    const newRequest = new Request({
      buyerName,
      buyerPhone,
      buyerEmail,
      farmerPhone,
      productId,
      productName,
      quantity,
      price,
      status: 'Pending',  // Default status is 'Pending'
    });

    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully!', request: newRequest });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create request', error: err });
  }
});

// Get all requests for a specific farmer (by farmer's phone number)
router.get('/:farmerPhone', async (req, res) => {
  try {
    const requests = await Request.find({ farmerPhone: req.params.farmerPhone }).populate('productId');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err });
  }
});

// Get all requests for a specific buyer (by buyer's phone number)
router.get('/buyer/:buyerPhone', async (req, res) => {
  try {
    const requests = await Request.find({ buyerPhone: req.params.buyerPhone });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err });
  }
});

// Update the status of a request (e.g., from Pending to Accepted or Done)
router.put('/:id/status', async (req, res) => {
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update request status', error: err });
  }
});

// DELETE /api/requests/:id - Delete a request by ID
router.delete('/:id', async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Request cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling request', error: err });
  }
});

module.exports = router;
