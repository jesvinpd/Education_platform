const Question = require("../models/Question");
const cloudinary = require("../config/cloudinary");

exports.createQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      testCases,
      examples,
      constraints,
      hints
    } = req.body;

    let imageUrl = null;

    // ✅ Upload directly to Cloudinary if file exists
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload_stream(
        { folder: "questions" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ message: "Image upload failed" });
          }

          imageUrl = result.secure_url;

          // Create question only after upload completes
          saveQuestion();
        }
      );

      // Pipe file buffer to Cloudinary upload
      uploadResult.end(req.file.buffer);
    } else {
      // If no image, save directly
      saveQuestion();
    }

    // Function to save the question in DB
    async function saveQuestion() {
      const question = new Question({
        title,
        description,
        difficulty,
        tags,
        testCases,
        examples,
        constraints,
        hints,
        image: photoUrl
      });

      await question.save();
      res.status(201).json(question);
    }

  } catch (err) {
    console.error(err);
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
