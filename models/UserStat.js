const mongoose = require("mongoose");

const userStatsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },

  totalSubmissions: { type: Number, default: 0 },
  acceptedSubmissions: { type: Number, default: 0 },
  rejectedSubmissions: { type: Number, default: 0 },

  totalTimeSpent: { type: Number, default: 0 }, // in seconds
  questionsSolved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  languageUsage: {
    type: Map,
    of: Number // tracks submissions per language
  }
});

module.exports = mongoose.model("UserStats", userStatsSchema);
// This schema defines the structure of user statistics in MongoDB.
// It includes fields for user ID, total submissions, accepted and rejected counts, total time spent on questions, a list of solved questions, and language usage statistics.