const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Resource', resourceSchema);
