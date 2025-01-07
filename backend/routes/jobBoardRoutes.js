const express = require("express");
const router = express.Router();
const jobBoardController = require("../controllers/jobBoardController");

// Routes
router.get("/", jobBoardController.getJobBoards);

module.exports = router;
