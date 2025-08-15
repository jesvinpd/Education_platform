const Question = require("../models/Question");
const cloudinary = require("../config/cloudinary");

exports.createQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      difficultyLevel,
      topics,
      testCases,
      examples,
      constraints,
      hints,
      languages
    } = req.body;

    let imageUrl = null;

    // ✅ Handle Cloudinary upload if image exists
    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "questions" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer);
      });
    }

    // ✅ Create question
    const question = new Question({
      title,
      description,
      difficultyLevel,
      topics,
      testCases,
      examples,
      constraints,
      hints,
      languages,
      image: imageUrl
    });

    await question.save(); // triggers questionNumber + boilerplate defaults

    res.status(201).json(question);
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).json({ msg: "Server error" });
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
