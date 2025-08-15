const express = require('express');
const { createQuestion, getQuestions, getQuestionById } = require('../controllers/questionController');
const upload = require('../middleware/upload'); // Multer config file
const router = express.Router();

// ✅ POST route now supports optional image upload
router.post('/create', upload.single("image"), createQuestion);

router.get('/', getQuestions); // supports ?difficulty=Easy&search=loop
router.get('/:id', getQuestionById);

module.exports = router;
