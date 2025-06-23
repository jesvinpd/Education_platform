const Question = require('../models/Question');


exports.createQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      testCases,        // Optional: allow creating with test cases
      examples,         // New: e.g., [{ input: "2", output: "4" }]
      constraints,      // New: e.g., ["1 <= n <= 1000"]
      hints             // New: e.g., ["Try sorting", "Use hash map"]
    } = req.body;

    const question = new Question({
      title,
      description,
      difficulty,
      tags,
      testCases,
      examples,
      constraints,
      hints
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ message: "Failed to create question", error: err.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const { difficulty, search } = req.query;
    const query = {};

    if (difficulty) query.difficulty = difficulty;
    if (search) query.title = { $regex: search, $options: 'i' };

    const questions = await Question.find(query);
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Failed to fetch questions", error: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    console.error("Error fetching question:", err);
    res.status(500).json({ message: "Failed to fetch question", error: err.message });
  }
};
