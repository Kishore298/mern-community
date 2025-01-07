const Project = require('../models/Project');

// Add a new project
const addProject = async (req, res) => {
    const { name, description, githubLink, liveDemo, technologies, author } = req.body;

    const newProject = new Project({
        name,
        description,
        githubLink,
        liveDemo,
        technologies,
        author,
    });

    try {
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Edit a project (only for the author)
const editProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project.author !== req.body.author) {
            return res.status(403).json({ message: 'You are not the author of this project.' });
        }

        project.name = req.body.name || project.name;
        project.description = req.body.description || project.description;
        project.githubLink = req.body.githubLink || project.githubLink;
        project.liveDemo = req.body.liveDemo || project.liveDemo;
        project.technologies = req.body.technologies || project.technologies;

        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a project (only for the author)
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project.author !== req.body.author) {
            return res.status(403).json({ message: 'You are not the author of this project.' });
        }

        await project.remove();
        res.status(200).json({ message: 'Project deleted successfully.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addProject,
    getProjects,
    editProject,
    deleteProject,
};
