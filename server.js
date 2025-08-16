// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require("./routes/auth");
const questionRoutes = require('./routes/questionRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const userStatRoutes = require('./routes/userStatRoutes');

const app = express();

// ----------------------
// CORS Configuration
// ----------------------
const corsOptions = {
  origin: "http://localhost:3000", // React app's URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable credentials (cookies, etc.)
};
app.use(cors(corsOptions));

// ----------------------
// Middleware
// ----------------------
app.use(express.json());

// ----------------------
// Test Route
// ----------------------
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// ----------------------
// API Routes
// ----------------------
app.use('/api/questions', questionRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/userStats', userStatRoutes);

app.use("/api/auth", authRoutes);
// ----------------------
// MongoDB Connection
// ----------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
