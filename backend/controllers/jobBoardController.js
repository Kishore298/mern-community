const JobBoard = require("../models/JobBoard");

// Get all job boards
exports.getJobBoards = async (req, res) => {
  try {
    const jobBoards = await JobBoard.find();
    res.status(200).json(jobBoards);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job boards." });
  }
};

