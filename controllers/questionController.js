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
<<<<<<< HEAD
    } = req.body; 

    let imageUrl = null;

    // Parse JSON strings if they exist
    const parsedTopics = topics ? JSON.parse(topics) : [];
    const parsedTestCases = testCases ? JSON.parse(testCases) : [];
    const parsedExamples = examples ? JSON.parse(examples) : [];
    const parsedConstraints = constraints ? JSON.parse(constraints) : [];
    const parsedHints = hints ? JSON.parse(hints) : [];
    const parsedLanguages = languages ? JSON.parse(languages) : {};

    // ✅ Upload directly to Cloudinary if file exists
    if (req.file) {
      console.log("📸 Uploading image to Cloudinary...");
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "questions" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              console.log("✅ Image uploaded successfully:", result.secure_url);
              resolve(result);
            }
          }
        ).end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    // Save question to database (this happens whether there's an image or not)
=======
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
>>>>>>> d4a8ee8a69840a7bfa993b7239b620d77f9ad50f
    const question = new Question({
      title,
      description,
      difficultyLevel,
<<<<<<< HEAD
      topics: parsedTopics,
      testCases: parsedTestCases,
      examples: parsedExamples,
      constraints: parsedConstraints,
      hints: parsedHints,
      languages: parsedLanguages,
      image: imageUrl // This will be the Cloudinary URL or null
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
=======
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
>>>>>>> d4a8ee8a69840a7bfa993b7239b620d77f9ad50f
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
