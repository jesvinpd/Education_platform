const express = require('express');
const { createQuestion, getQuestions, getQuestionById } = require('../controllers/questionController');
const upload = require('../middleware/upload'); // Multer config file
const router = express.Router();

const auth = require("../middleware/auth"); 
const role = require("../middleware/role");
// ✅ POST route now supports optional image upload
router.post('/create', auth, role("admin"),upload.single("image"), createQuestion);

router.get('/', auth, role("admin", "teacher", "student"), getQuestions); // supports ?difficulty=Easy&search=loop
router.get('/:id', auth, role("admin", "teacher", "student"), getQuestionById);

module.exports = router;
