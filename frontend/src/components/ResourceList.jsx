import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      toast.info('Loading resources...');
      try {
        const response = await axios.get('https://mern-community-b5ik.onrender.com/api/resources');
        setResources(response.data);
        toast.success('Resources loaded successfully!');
      } catch (error) {
        console.error('Error fetching resources:', error);
        toast.error('Error fetching resources. Please try again.');
      }
    };

    fetchResources();
  }, []);

  const handleAddResourceClick = () => {
    navigate('/add-resource');
    toast.info('Redirecting to add resource page...');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center justify-start min-h-[20vh] pt-8">
        <h2 className="text-3xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
          Resources
        </h2>
        <p className="mb-6 text-gray-600 text-center">
          Want to contribute a new resource? Click the button below to add a new resource.
        </p>
        <button
          onClick={handleAddResourceClick}
          className="mb-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div
            key={resource._id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl text-teal-500 font-semibold mb-2">{resource.title}</h3>
            <p className="text-gray-700 mb-4">{resource.description}</p>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Resource
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;

