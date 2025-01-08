import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [filterCategory, setFilterCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      toast.info("Loading resources...");
      try {
        const response = await axios.get(
          "https://mern-community-b5ik.onrender.com/api/resources"
        );
        setResources(response.data);
        setFilteredResources(response.data);
        toast.success("Resources loaded successfully!");
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast.error("Error fetching resources. Please try again.");
      }
    };

    fetchResources();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = resources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(query.toLowerCase()) ||
        resource.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResources(filtered);
    setCurrentPage(1);
  };

  const handleSort = () => {
    const sorted = [...filteredResources].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredResources(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterCategory = (e) => {
    const category = e.target.value;
    setFilterCategory(category);
    if (category === "") {
      setFilteredResources(resources);
    } else {
      const filtered = resources.filter(
        (resource) => resource.category === category
      );
      setFilteredResources(filtered);
    }
    setCurrentPage(1);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResources.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center justify-start min-h-[20vh] pt-8">
        <h2 className="text-3xl font-semibold bg-gradient-to-r mt-4 from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
          Resources
        </h2>

        <div className="mb-6 w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full sm:w-1/3 px-4 py-2 border rounded-md focus:outline-none"
          />
          <select
            value={filterCategory}
            onChange={handleFilterCategory}
            className="w-full sm:w-1/3 px-4 py-2 border rounded-md focus:outline-none"
          >
            <option value="">All Topics</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Express.js">Express.js</option>
            <option value="React.js">React.js</option>
            <option value="Node.js">Node.js</option>
            <option value="Full-Stack">Full-Stack</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="Tailwind CSS">Tailwind CSS</option>
            <option value="MySQL">MySQL</option>
            <option value="Git">Github</option>
            <option value="Github">Git</option>
            <option value="Chakra UI">Chakra UI</option>
            <option value="Material UI">Material UI</option>
          </select>
          <button
            onClick={handleSort}
            className="bg-white py-2 px-4 w-full sm:w-1/3 rounded-md hover:bg-teal-500 transition border rounded-md duration-300"
          >
            Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>

        <button
          onClick={() => navigate("/add-resource")}
          className="mb-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((resource) => (
          <div
            key={resource._id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl text-teal-500 font-semibold mb-2">
              {resource.title}
            </h3>
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

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {[
          ...Array(Math.ceil(filteredResources.length / itemsPerPage)).keys(),
        ].map((number) => (
          <button
            key={number}
            onClick={() => handlePagination(number + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === number + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400 transition duration-300`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
