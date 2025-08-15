const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: String,
  questionId: mongoose.Schema.Types.ObjectId,
  language: String,
  code: String,
   result: {
    totalCases: Number,
    passedCases: Number,
    details: [
      {
        input: String,
        expected: String,
        actual: String,
        status: { type: String, enum: ['Passed', 'Failed'] }
      }
    ]
  },
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'] , default: 'Pending' },
  timeTaken: Number, // in seconds
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", submissionSchema);
// This schema defines the structure of a submission document in MongoDB.
// It includes fields for user ID, question ID, programming language, code content, status of the submission, time taken to solve the question, and the submission timestamp.
// The status field can be 'Pending', 'Accepted', or 'Rejected', indicating the result of the submission.