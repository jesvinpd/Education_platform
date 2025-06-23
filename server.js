// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const questionRoutes = require('./routes/questionRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const userStatRoutes = require('./routes/userStatRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/questions', questionRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/userStats', userStatRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));
app.listen(5000, () => console.log('Server running on port 5000'));
// This is the main server file for the application.
// It sets up an Express server, connects to MongoDB using Mongoose, and defines routes for handling questions and submissions.