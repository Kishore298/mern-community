import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    topic: "",
    type: "",
    category: "",
    sort: "",
  });
  const navigate = useNavigate();

  const fetchResources = useCallback(() => {
    const queryParams = new URLSearchParams(filters).toString();
    fetch(
      `https://mern-community-b5ik.onrender.com/api/resources?${queryParams}`
    )
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
        toast.success("Resources fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
        toast.error("Failed to fetch resources.");
      });
  }, [filters]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "topic") {
      setFilters({
        ...filters,
        [name]: Array.from(e.target.selectedOptions, (option) => option.value),
      });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-16">
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Resource List</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <input
            type="text"
            name="search"
            placeholder="Search by title"
            value={filters.search}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="PDF">PDF</option>
            <option value="YouTube">YouTube</option>
          </select>
          <select
            name="topic"
            value={filters.topic}
            onChange={handleFilterChange}
            multiple
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="ReactJS">React JS</option>
            <option value="NextJS">Next JS</option>
            <option value="NodeJS">Node JS</option>
            <option value="ExpressJS">Express JS</option>
            <option value="MongoDB">MongoDB</option>
            <option value="MySQL">MySQL</option>
            <option value="TailwindCSS">Tailwind CSS</option>
            <option value="Redux">Redux</option>
            <option value="TypeScript">TypeScript</option>
            <option value="ChakraUI">Chakra UI</option>
            <option value="MaterialUI">Material UI</option>
            <option value="GraphQL">GraphQL</option>
            <option value="RESTAPI">REST API</option>
            <option value="Docker">Docker</option>
            <option value="Kubernetes">Kubernetes</option>
            <option value="Firebase">Firebase</option>
            <option value="AWS">AWS</option>
            <option value="GCP">Google Cloud Platform</option>
            <option value="Azure">Azure</option>
            <option value="Jest">Jest</option>
            <option value="Cypress">Cypress</option>
            <option value="Webpack">Webpack</option>
            <option value="Babel">Babel</option>
            <option value="SocketIO">Socket.IO</option>
            <option value="Sequelize">Sequelize</option>
            <option value="Mongoose">Mongoose</option>
            <option value="Vite">Vite</option>
            <option value="FramerMotion">Framer Motion</option>
            <option value="ThreeJS">Three.js</option>
            <option value="Prisma">Prisma</option>
          </select>

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Tutorial">Tutorial</option>
            <option value="Practice">Practice</option>
          </select>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort by</option>
            <option value="title">Title</option>
            <option value="createdAt">Date</option>
          </select>
        </div>

        <div className="flex justify-between gap-x-2 items-center mb-4">
          <button
            onClick={fetchResources}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Apply Filters
          </button>
          <button
            onClick={() => navigate("/add-resource")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add New Resource
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 border rounded-lg shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {resource.title}
                </h2>
                <p className="text-gray-600">{resource.topic.join(", ")}</p>
                <div className="mt-4">
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${
                      resource.url.split("v=")[1]
                    }`}
                    className="border-0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={resource.title}
                  ></iframe>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No resources available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceList;
