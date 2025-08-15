const express = require('express');
const { submitCode , getSubmissions , runOnly} = require('../controllers/submissionController');

const auth = require("../middleware/auth"); 
const role = require("../middleware/role");
const router = express.Router();

router.post('/submit', auth, role("admin", "teacher", "student"), submitCode);
router.get('/', auth, role("admin"),getSubmissions); // supports ?userId=123&questionId=456
router.post('/run', auth, role("admin", "teacher", "student"), runOnly); // This route is for running code submissions

module.exports = router;
// This code sets up the routes for handling submission-related requests in the application.
// It defines a route for submitting code, which will be handled by the `submitCode` function in the submission controller.