// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const farmerRoutes = require('./routes/farmerRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const productRoutes = require('./routes/productRoutes');
const requestRoutes = require('./routes/requestRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/farmers', farmerRoutes);
app.use('/api/buyers', buyerRoutes);

app.use('/api/products', productRoutes);
app.use('/uploads', express.static('uploads')); // to serve images

app.use('/api/requests', requestRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

// Simple Test Route
app.get('/', (req, res) => {
    res.send('API Running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
