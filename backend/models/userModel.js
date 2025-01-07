const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    skillsets: [{ type: String, required: true }],
    experience: { type: Number, required: true }, 
    previousWorks: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        technologiesUsed: { type: [String], required: true },
      }
    ], 
    github: { type: String },
    portfolio: { type: String },
    linkedin: { type: String },
    leetcode: { type: String },
    hackerrank: { type: String },
    phoneVisibility: { type: Boolean, default: false },
    emailVisibility: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
