import React, { useState, useEffect } from "react";
import axios from "axios";
import DeveloperCard from "./DeveloperCard";
import DeveloperDetail from "./DeveloperDetail";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const DeveloperDirectory = () => {
  const [developers, setDevelopers] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    skillsets: "",
    minExperience: "",
    sortBy: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  const assignImagesToDevelopers = (developers) => {
    const imagePaths = Array.from(
      { length: 10 },
      (_, i) => `/images/image${i + 1}.webp`
    );
    return developers.map((developer, index) => ({
      ...developer,
      image: imagePaths[index % imagePaths.length],
    }));
  };

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const query = new URLSearchParams({
          ...filters,
          page: currentPage,
        }).toString();
        const { data } = await axios.get(`http://localhost:5000/api/developers?${query}`);
        const developersWithImages = assignImagesToDevelopers(data.developers);
        setDevelopers(developersWithImages);
        setTotalPages(data.totalPages);
        toast.success("Developers fetched successfully!");
      } catch (err) {
        toast.error("Failed to fetch developers.");
        console.error(err.message);
      }
    };
    fetchDevelopers();
  }, [filters, currentPage]);
  

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const assignImageToDeveloper = (developer, index) => {
    const imagePaths = Array.from(
      { length: 10 },
      (_, i) => `/images/image${i + 1}.webp`
    );
    return { ...developer, image: imagePaths[index % imagePaths.length] };
  };

  const handleCardClick = async (developerId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/developers/${developerId}`
      );
      const developerIndex = developers.findIndex(
        (dev) => dev._id === developerId
      );
      const developerWithImage = assignImageToDeveloper(data, developerIndex);
      setSelectedDeveloper(developerWithImage);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="mt-16">
      <h1 className="text-center text-2xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">
        Developer's Directory
      </h1>
      <div className="w-[96%] lg:w-[50%]  filters grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-4 place-self-center gap-x-2 lg:gap-x-5">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={filters.search}
          onChange={handleFilterChange}
          className="border border-md border-gray-400 p-2 rounded mb-2 lg:mb-0"
        />
        <input
          type="text"
          name="skillsets"
          placeholder="Filter by skills (comma separated)"
          value={filters.skillsets}
          onChange={handleFilterChange}
          className="border border-md border-gray-400 p-2 rounded mb-2 lg:mb-0"
        />
        <input
          type="number"
          name="minExperience"
          placeholder="Min Experience"
          value={filters.minExperience}
          onChange={handleFilterChange}
          className="border border-md border-gray-400 p-2 rounded mb-2 lg:mb-0"
        />
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
          className="border border-md border-gray-400 w-44 lg:w-48 p-2 rounded mb-2 lg:mb-0"
        >
          <option value="">Sort By</option>
          <option value="experience">Experience</option>
          <option value="skillsets">Skillsets</option>
        </select>
      </div>
      {selectedDeveloper ? (
        <DeveloperDetail developer={selectedDeveloper} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {developers.map((developer) => (
              <DeveloperCard
                key={developer._id}
                developer={developer}
                onClick={() => handleCardClick(developer._id)}
              />
            ))}
          </div>
          <div className="pagination mt-4 place-self-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 border ${
                  currentPage === i + 1 ? "bg-gray-200" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DeveloperDirectory;
