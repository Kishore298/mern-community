const mongoose = require("mongoose");

const JobBoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  reasonToTry: { type: String, required: true },
});

module.exports = mongoose.model("JobBoard", JobBoardSchema);
