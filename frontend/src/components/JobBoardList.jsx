import React, { useEffect, useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const JobBoardList = () => {
  const [jobBoards, setJobBoards] = useState([]);

  useEffect(() => {
    axios
      .get("https://mern-community-b5ik.onrender.com/api/jobboards")
      .then((response) => {
        setJobBoards(response.data);
        toast.success("Job boards fetched successfully!");
      })
      .catch((error) => {
        console.error("Failed to fetch job boards:", error);
        toast.error("Failed to fetch job boards.");
      });
  }, []);
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-16">
      {/* Job Boards Heading */}
      <h2 className="text-2xl text-center font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
        Job Boards
      </h2>

      {jobBoards.length === 0 ? (
        <p className="text-gray-600 text-center">No job boards available.</p>
      ) : (
        <ul className="space-y-4">
          {jobBoards.map((job, index) => (
            <li key={job._id} className="flex items-start space-x-4">
              <div className="text-lg font-bold text-gray-700">{index + 1}.</div>
              <div className="w-full flex items-center space-x-4">
                <img 
                  src={job.logoUrl} 
                  alt={`${job.name} Logo`} 
                  className="h-20 w-20 object-contain" 
                />
                <div>
                  <h3 className="text-xl font-semibold text-blue-600">
                    <a href={job.link} target="_blank" rel="noopener noreferrer">
                      {job.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{job.description}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Why try: {job.reasonToTry}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobBoardList;
