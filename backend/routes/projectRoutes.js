const express = require('express');
const router = express.Router();
const {
    addProject,
    getProjects,
    editProject,
    deleteProject,
} = require('../controllers/projectController');

// Add a new project
router.post('/projects', addProject);

// Get all projects
router.get('/projects', getProjects);

// Edit a project (only for the author)
router.put('/projects/:id', editProject);

// Delete a project (only for the author)
router.delete('/projects/:id', deleteProject);

module.exports = router;
