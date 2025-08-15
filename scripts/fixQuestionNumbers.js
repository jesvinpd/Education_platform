const mongoose = require("mongoose");
const Question = require("../models/Question"); // adjust path
require('dotenv').config();

console.log('Connecting to:', process.env.MONGO_URI); // <-- debug

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // fail fast if cannot connect
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ Connection error:', err);
  process.exit(1);
});

(async () => {
  try {
    // Get all questions sorted by creation time
    const allQuestions = await Question.find().sort({ createdAt: 1 });

    let number = 1;
    for (let q of allQuestions) {
      q.questionNumber = number++;
      await q.save();
    }

    console.log("✅ Assigned question numbers to all documents");
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();
