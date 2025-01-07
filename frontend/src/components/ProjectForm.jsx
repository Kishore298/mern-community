import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const ProjectForm = ({ username }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [liveDemo, setLiveDemo] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!name || !description || !githubLink || !technologies || !username) {
          toast.error("All fields are required!");
          return;
        }
      
        try {
          await axios.post('https://mern-community-b5ik.onrender.com/api/projects', {
            name,
            description,
            githubLink,
            liveDemo,
            technologies: technologies.split(','),
            author: username,
          });
      
          toast.success("Project submitted successfully!");
          setName('');
          setDescription('');
          setGithubLink('');
          setLiveDemo('');
          setTechnologies('');
        } catch (error) {
          toast.error("Failed to submit project.");
          console.error("Error submitting project:", error);
        }
      };
      

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-16">
            <div className="space-y-4 max-w-md mx-auto p-4 border shadow-lg rounded-lg bg-white">
                <h2 className="text-2xl font-semibold text-center text-teal-500 mb-4">Submit Your Project</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="text-red-500">{error}</div>}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Project Name *"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Project Description *"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        placeholder="GitHub Link *"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        value={liveDemo}
                        onChange={(e) => setLiveDemo(e.target.value)}
                        placeholder="Live Demo Link *"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        value={technologies}
                        onChange={(e) => setTechnologies(e.target.value)}
                        placeholder="Technologies (comma separated) *"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-teal-500 text-white p-2 rounded">
                        Submit Project
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;


