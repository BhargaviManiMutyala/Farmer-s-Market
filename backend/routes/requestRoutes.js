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

// Update request status
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

// DELETE /api/requests/:id
router.delete('/:id', async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting request', error: err });
  }
});

module.exports = router;
