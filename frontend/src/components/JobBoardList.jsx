import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-11/12 md:w-3/5 bg-white p-6 mt-16 mb-4">
        {/* Heading at the top center */}
        <h1 className="text-2xl lg:text-6xl font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-6">
          Job Boards
        </h1>

        {jobBoards.length === 0 ? (
          <p className="text-gray-600 text-center">No job boards available.</p>
        ) : (
          <ul className="space-y-6">
            {jobBoards.map((job, index) => (
              <li key={job._id} className="flex items-start space-x-6">
                <div className="text-lg font-bold text-gray-700">
                  {index + 1}.
                </div>
                <div className="w-full flex items-center space-x-6">
                  <img
                    src={job.logoUrl}
                    alt={`${job.name} Logo`}
                    loading="lazy"
                    className="h-20 w-20 object-contain"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-600 flex items-center space-x-2">
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {job.name}
                      </a>
                      {/* Icon next to the job link */}
                      <ArrowUpRightIcon className="h-5 w-5 text-blue-600" />
                    </h3>
                    <p className="text-lg text-gray-500 mt-1">{job.description}</p>
                    <p className="text-md text-gray-400 mt-1">
                      Why try: {job.reasonToTry}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobBoardList;


