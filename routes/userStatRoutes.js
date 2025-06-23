const express = require('express');
const { getUserStats } = require('../controllers/userStatController');

const router = express.Router();

router.get('/:userId', getUserStats); // Fetch user stats by userId

module.exports = router;
// This code sets up the route for fetching user statistics in the application.