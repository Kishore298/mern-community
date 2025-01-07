import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const ProjectList = ({ username }) => {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [editData, setEditData] = useState({
        name: '',
        description: '',
        githubLink: '',
        liveDemo: '',
        technologies: '',
    });

    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const result = await axios.get('https://mern-community-b5ik.onrender.com/api/projects');
            setProjects(result.data);
            toast.success("Projects loaded successfully!");
          } catch (error) {
            toast.error("Failed to load projects.");
            console.error("Error fetching projects:", error);
          }
        };
      
        fetchProjects();
      }, []);
      

    const handleEdit = (id) => {
        const project = projects.find((p) => p._id === id);
        setEditingProject(id);
        setEditData({
            name: project.name,
            description: project.description,
            githubLink: project.githubLink,
            liveDemo: project.liveDemo,
            technologies: project.technologies.join(', '), 
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`https://mern-community-b5ik.onrender.com/api/projects/${editingProject}`, {
            ...editData,
            technologies: editData.technologies.split(',').map((tech) => tech.trim()), 
            author: username,
          });
          setProjects((prev) =>
            prev.map((project) =>
              project._id === editingProject
                ? { ...project, ...editData, technologies: editData.technologies.split(',').map((tech) => tech.trim()) }
                : project
            )
          );
          setEditingProject(null);
          toast.success("Project updated successfully!");
        } catch (error) {
          toast.error("Error updating project.");
          console.error("Error updating project:", error);
        }
      };
      

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this project?');
        if (confirmDelete) {
          try {
            await axios.delete(`https://mern-community-b5ik.onrender.com/api/projects/${id}`, {
              data: { author: username },
            });
            setProjects(projects.filter((project) => project._id !== id));
            toast.success("Project deleted successfully!");
          } catch (error) {
            toast.error("Error deleting project.");
            console.error("Error deleting project:", error);
          }
        }
      };
      

    return (
        <div className="space-y-6">
            {/* Add New Project Button */}
            <div className="text-center mt-24">
                <Link to="/project-form">
                    <button className="bg-green-500 text-white px-6 py-2 rounded">
                        Add New Project
                    </button>
                </Link>
            </div>

            {/* Project List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) =>
                    editingProject === project._id ? (
                        <form
                            key={project._id}
                            onSubmit={handleEditSubmit}
                            className="border p-4 rounded-lg shadow-lg bg-white"
                        >
                            <input
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleEditChange}
                                placeholder="Project Name"
                                className="w-full p-2 border rounded mb-2"
                                required
                            />
                            <textarea
                                name="description"
                                value={editData.description}
                                onChange={handleEditChange}
                                placeholder="Project Description"
                                className="w-full p-2 border rounded mb-2"
                                required
                            />
                            <input
                                type="text"
                                name="githubLink"
                                value={editData.githubLink}
                                onChange={handleEditChange}
                                placeholder="GitHub Link"
                                className="w-full p-2 border rounded mb-2"
                                required
                            />
                            <input
                                type="text"
                                name="liveDemo"
                                value={editData.liveDemo}
                                onChange={handleEditChange}
                                placeholder="Live Demo Link"
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="text"
                                name="technologies"
                                value={editData.technologies}
                                onChange={handleEditChange}
                                placeholder="Technologies (comma separated)"
                                className="w-full p-2 border rounded mb-2"
                                required
                            />
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingProject(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <div key={project._id} className="border p-4 rounded-lg shadow-lg bg-white">
                            <h3 className="text-xl font-bold">{project.name}</h3>
                            <p>{project.description}</p>
                            <p className="mt-2 text-sm text-gray-500">By {project.createdBy}</p>
                            <div className="mt-4 flex justify-between">
                                <a href={project.githubLink} className="text-blue-500">
                                    Visit GitHub
                                </a>
                                {project.liveDemo && (
                                    <a href={project.liveDemo} className="text-blue-500">
                                        Live Demo
                                    </a>
                                )}
                            </div>
                            {project.author === username && (
                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={() => handleEdit(project._id)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ProjectList;

