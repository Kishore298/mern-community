import React, { useState } from "react";
import {
  FaTools,
  FaBriefcase,
  FaPhone,
  FaEnvelope,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaCode,
  FaHackerrank,
} from "react-icons/fa";

const DeveloperDetail = ({ developer }) => {
  const [showProjects, setShowProjects] = useState(false);

  const toggleProjects = () => {
    setShowProjects((prevState) => !prevState);
  };

  return (
    <div className="w-[95%] lg:w-[50%] p-4 mt-16 border place-self-center flex flex-col items-start justify-center rounded-lg shadow-md border border-md border-gray-200">
      <img
        src={developer.image}
        alt={`${developer.name}'s avatar`}
        className="w-full h-64 lg:w-full lg:h-96 object-cover rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{developer.name}</h1>

      <p className="mb-3 flex flex-wrap text-sm lg:text-xl items-start">
        <span className="flex items-center mr-2 min-w-max">
          <FaTools className="text-blue-500 mr-2 text-xl" />
          <span className="font-bold">Skills:</span>
        </span>
        <span className="flex-1">{developer.skillsets.join(", ")}</span>
      </p>

      <p className="mb-3 flex text-sm lg:text-xl items-center">
        <FaBriefcase className="text-green-500 mr-2 text-xl" />
        <strong className="mr-1">Experience:</strong> {developer.experience}{" "}
        years
      </p>

      <p className="mb-3 text-sm lg:text-xl flex items-center">
        <FaPhone className="text-yellow-500 mr-2 text-xl" />
        <strong className="mr-1">Phone:</strong>{" "}
        {developer.phoneVisibility ? developer.phone : "Hidden"}
      </p>

      <p className="mb-3 flex text-sm lg:text-xl items-center">
        <FaEnvelope className="text-red-500 mr-2 text-xl" />
        <strong className="mr-1">Email:</strong>{" "}
        {developer.emailVisibility ? developer.email : "Hidden"}
      </p>

      <div
        className="mb-3 flex items-center cursor-pointer"
        onClick={toggleProjects}
      >
        <FaCode className="text-purple-500 mr-2 text-xl" />
        <strong className="mr-1 text-sm lg:text-xl">Previous Works:</strong>
        {showProjects ? (
          <button className="ml-2 text-red-500">Hide Project Details</button>
        ) : (
          <button className="ml-2 text-green-500">Show Project Details</button>
        )}
      </div>

      {showProjects &&
        developer.previousWorks &&
        developer.previousWorks.length > 0 && (
          <div className="ml-4">
            {developer.previousWorks.map((work, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-xl font-semibold mb-1.5">{work.title}</h4>
                <p className="text-gray-700 mb-1.5">{work.description}</p>
                <p className="text-sm text-gray-500 mb-1.5">
                  <strong>Technologies Used:</strong>{" "}
                  {work.technologiesUsed.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}

      <p className="mb-3 text-sm lg:text-xl flex items-center">
        <FaGithub className="text-gray-700 mr-2 text-xl" />
        <strong className="mr-1">GitHub:</strong>{" "}
        <a href={developer.github}>{developer.github}</a>
      </p>

      <p className="mb-3 text-sm lg:text-xl flex items-center">
        <FaLink className="text-blue-700 mr-2 text-xl" />
        <strong className="mr-1">Portfolio:</strong>{" "}
        <a href={developer.portfolio}>{developer.portfolio}</a>
      </p>

      <p className="mb-3 text-sm lg:text-xl flex items-center">
        <FaLinkedin className="text-blue-600 mr-2 text-xl" />
        <strong className="mr-1">LinkedIn:</strong>{" "}
        <a href={developer.linkedin}>{developer.linkedin}</a>
      </p>

      <p className="mb-3 text-sm lg:text-xl flex items-center">
        <FaCode className="text-orange-500 mr-2 text-xl" />
        <strong className="mr-1">LeetCode:</strong>{" "}
        <a href={developer.leetcode}>{developer.leetcode}</a>
      </p>

      <p className="flex text-sm lg:text-xl items-center">
        <FaHackerrank className="text-green-700 mr-2 text-xl" />
        <strong className="mr-1">HackerRank:</strong>{" "}
        <a href={developer.hackerrank}>{developer.hackerrank}</a>
      </p>
    </div>
  );
};

export default DeveloperDetail;
