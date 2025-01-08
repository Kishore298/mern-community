import React, { useState } from 'react';
import axios from 'axios';

const ResourceForm = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mern-community-b5ik.onrender.com/api/resources', {
        title,
        url,
        description,
      });
      console.log('Resource added:', response.data);
      // Reset form fields
      setTitle('');
      setUrl('');
      setDescription('');
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add a New Resource</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Add Resource
        </button>
      </form>
    </div>
  );
};

export default ResourceForm;
