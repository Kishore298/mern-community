import React, { useState } from 'react';
import axios from 'axios';

const ResourceForm = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mern-community-b5ik.onrender.com//api/resources', {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Resource</button>
    </form>
  );
};

export default ResourceForm;
