const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Get all resources
router.get('/resources', resourceController.getAllResources);

// Add a new resource
router.post('/add-resource', resourceController.addResource);

module.exports = router;
