const express = require('express');
const { createQuestion, getQuestions, getQuestionById } = require('../controllers/questionController');
const router = express.Router();

router.post('/create', createQuestion);
router.get('/', getQuestions); // supports ?difficulty=Easy&search=loop
router.get('/:id', getQuestionById);

module.exports = router;
// This code sets up the routes for handling question-related requests in the application.
// It defines routes for creating a question, retrieving all questions, and getting a specific question by its ID.