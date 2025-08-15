const express = require('express');
const { getUserStats } = require('../controllers/userStatController');

const auth = require("../middleware/auth"); 
const role = require("../middleware/role");
const router = express.Router();

router.get('/:userId', auth, role("admin", "teacher", "student"), getUserStats); // Fetch user stats by userId

module.exports = router;
// This code sets up the route for fetching user statistics in the application.