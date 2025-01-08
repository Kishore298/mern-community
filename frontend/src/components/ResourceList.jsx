import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('/api/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div>
      <h2>Resources</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              View Resource
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
