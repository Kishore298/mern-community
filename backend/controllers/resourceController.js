const Resource = require('../models/resourceModel');

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new resource
exports.addResource = async (req, res) => {
  const resource = new Resource({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description
  });

  try {
    const savedResource = await resource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
