const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const safePlaceRoutes = require('./routes/safePlaceRoutes');
app.use('/api/users', userRoutes);
app.use('/api/safeplaces', safePlaceRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});