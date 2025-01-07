const User = require('../models/userModel');

// Array of image paths
const imagePaths = Array.from({ length: 10 }, (_, i) => `/images/image${i + 1}.jpg`);

// Assign image to a developer based on their index
const assignImageToDeveloper = (developer, index) => {
  return { ...developer.toObject(), image: imagePaths[index % imagePaths.length] };
};

// Fetch all developers with search, filter, sort, and pagination
const getAllDevelopers = async (req, res) => {
  const { search, skillsets, minExperience, sortBy, page = 1, limit = 15 } = req.query;

  try {
    let query = {};

    // Search by name or skills
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { skillsets: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by skillsets
    if (skillsets) {
      query.skillsets = { $in: skillsets.split(',') };
    }

    // Filter by minimum experience
    if (minExperience) {
      query.experience = { $gte: Number(minExperience) };
    }

    // Calculate pagination values
    const skip = (page - 1) * limit;

    // Fetch developers with sorting and pagination
    const developers = await User.find(query)
      .sort(
        sortBy === 'experience'
          ? { experience: -1 }
          : sortBy === 'skillsets'
          ? { skillsets: +1 }
          : {}
      )
      .skip(skip)
      .limit(Number(limit));

    // Assign images to developers
    const developersWithImages = developers.map((developer, index) =>
      assignImageToDeveloper(developer, skip + index)
    );

    // Get total count for pagination info
    const totalCount = await User.countDocuments(query);

    res.status(200).json({
      developers: developersWithImages,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Fetch a single developer by ID
const getDeveloperById = async (req, res) => {
  const { id } = req.params;

  try {
    const developer = await User.findById(id);

    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }

    // Assign an image to the developer based on their ID's hash value or index
    const image = imagePaths[parseInt(developer._id, 16) % imagePaths.length];
    const developerWithImage = { ...developer.toObject(), image };

    res.status(200).json(developerWithImage);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllDevelopers,
  getDeveloperById,
};
