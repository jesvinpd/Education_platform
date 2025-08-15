const UserStat = require('../models/UserStat');

exports.getUserStats = async (req, res) => {
    try {
        const userId = req.params.userId;
        const stats = await UserStat.findOne({ userId }).populate("questionsSolved", "title");
       
  res.json(stats);
    } catch (err) {
        console.error("Error fetching user stats:", err);}
    };