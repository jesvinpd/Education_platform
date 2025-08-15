const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
   questionNumber: {
    type: Number,
    unique: true
  },
  title: String,
  description: String,
  difficultyLevel: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
   languages: {
    c: { type: String, default: "" },      // Boilerplate for C
    cpp: { type: String, default: "" },    // Boilerplate for C++
    java: { type: String, default: "" },   // Boilerplate for Java
    python: { type: String, default: "" }  // Boilerplate for Python ✅
  },
 topics : [String],
  totalSubmissions: { type: Number, default: 0 },
  successfulSubmissions: { type: Number, default: 0 },
   testCases: [
    {
      input: String,
      expectedOutput: String,
      hidden: { type: Boolean, default: false }
    }],
    examples: [
    {
      input: String,
      output: String
    }
  ],

  // ✅ Add constraints (array of strings or single string)
  constraints: [String], // e.g., ["1 <= n <= 1000", "Time limit: 1s"]

  // ✅ Add hints (optional tips for the user)
  hints: [String], // e.g., ["Try using a hash map", "Think about sorting first"]
  image: {
    type: String, // URL to image
    default: null
  }
});
// Auto-generate questionNumber before saving
questionSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastQuestion = await mongoose.model("Question").findOne().sort({ questionNumber: -1 });
    this.questionNumber = lastQuestion ? lastQuestion.questionNumber + 1 : 1;
  }
  next();
});
module.exports = mongoose.model("Question", questionSchema);
// This schema defines the structure of a question document in MongoDB.
// It includes fields for title, description, difficulty level, tags, submission counts, and the creator's identifier.