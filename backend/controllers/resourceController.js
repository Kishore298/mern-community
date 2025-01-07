const Resource = require('../models/resourceModel');
const path = require('path');
const fs = require('fs');

// Fetch resources based on filters, search, and sorting
exports.getResources = async (req, res) => {
  try {
    const { topic, type, category, search, sort } = req.query;

    const query = {};
    if (topic) query.topic = topic;
    if (type) query.type = type;
    if (category) query.category = category;
    if (search) {
      query.title = { $regex: search, $options: 'i' }; 
    }

    const sortOption = sort ? { [sort]: 1 } : { createdAt: -1 };

    const resources = await Resource.find(query)
      .sort(sortOption)
      .populate('createdBy', 'name email');
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching resources', error: err });
  }
};

exports.submitResource = (req, res) => {
  try {
    // Log the incoming request data
    console.log('Received data:', req.body);
    console.log('File:', req.file);

    // Perform server-side validation
    if (!req.body.title || !req.body.type || !req.body.category || !req.body.topic) {
      return res.status(400).send('Missing required fields');
    }

    // Process the resource data (save to DB, etc.)
    // Example: log the resource details for now
    console.log('Resource to save:', {
      title: req.body.title,
      type: req.body.type,
      topic: req.body.topic,
      category: req.body.category,
      file: req.file ? req.file.filename : null,
    });

    // Here you can add logic to save the resource data to the database

    // Send a success response
    res.status(200).send('Resource submitted successfully!');
  } catch (error) {
    console.error('Error processing resource:', error);
    res.status(500).send('Error submitting resource');
  }
};

