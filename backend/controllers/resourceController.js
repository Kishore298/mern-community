const Resource = require('../models/resourceModel');

exports.getResources = async (req, res) => {
  try {
    const { topic, type, category, search, sort } = req.query;

    const query = { type: 'YouTube' };  // Only fetch YouTube resources
    if (topic) query.topic = { $in: topic.split(',') };  // Allow multiple topic filters
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };  // Case-insensitive search

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
    const { title, type, url, topic, category } = req.body;

    // Validate incoming data
    if (!title || !type || !url || !topic || !category) {
      return res.status(400).send('Missing required fields');
    }

    if (type !== 'YouTube') {
      return res.status(400).send('Only YouTube resources are allowed');
    }

    const resource = new Resource({
      title,
      type,
      url,
      topic: topic.split(','),
      category,
    });

    // Save the resource to the database
    resource.save().then(() => {
      res.status(200).send('Resource submitted successfully!');
    }).catch((error) => {
      console.error('Error saving resource:', error);
      res.status(500).send('Error submitting resource');
    });

  } catch (error) {
    console.error('Error processing resource:', error);
    res.status(500).send('Error submitting resource');
  }
};
