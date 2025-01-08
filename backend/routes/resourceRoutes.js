const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Get all resources
router.get('/', resourceController.getAllResources);

// Add a new resource
router.post('/', resourceController.addResource);

module.exports = router;
