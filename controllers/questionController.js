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
      languages,
      boilerPlates  // ✅ Add boilerPlates
    } = req.body;

    let imageUrl = null;

    // Parse JSON strings if they exist (from FormData)
    const parsedTopics = topics ? JSON.parse(topics) : [];
    const parsedTestCases = testCases ? JSON.parse(testCases) : [];
    const parsedExamples = examples ? JSON.parse(examples) : [];
    const parsedConstraints = constraints ? JSON.parse(constraints) : [];
    const parsedHints = hints ? JSON.parse(hints) : [];
    const parsedLanguages = languages ? JSON.parse(languages) : {};
    const parsedBoilerPlates = boilerPlates ? JSON.parse(boilerPlates) : {}; // ✅ Parse boilerPlates

    // ✅ Handle Cloudinary upload if image exists
    if (req.file) {
      console.log("📸 Uploading image to Cloudinary...");
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "questions" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              console.log("✅ Image uploaded successfully:", result.secure_url);
              resolve(result.secure_url);
            }
          }
        );
        stream.end(req.file.buffer);
      });
    }

    // ✅ Create question with parsed data
    const question = new Question({
      title,
      description,
      difficultyLevel,
      topics: parsedTopics,
      testCases: parsedTestCases,
      examples: parsedExamples,
      constraints: parsedConstraints,
      hints: parsedHints,
      languages: parsedLanguages,
      boilerPlates: parsedBoilerPlates, // ✅ Add boilerPlates
      image: imageUrl
    });

    const savedQuestion = await question.save();
    console.log("✅ Question saved successfully:", savedQuestion._id);
    console.log("🖼️ Image URL saved:", imageUrl);

    res.status(201).json({
      message: "Question created successfully",
      question: savedQuestion
    });

  } catch (err) {
    console.error("❌ Error creating question:", err);
    res.status(500).json({ 
      message: "Failed to create question", 
      error: err.message 
    });
  }
};


 

exports.getQuestions = async (req, res) => {
  try {
    const { difficulty, search } = req.query;
    const query = {};

    if (difficulty) query.difficultyLevel = difficulty;
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
