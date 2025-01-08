import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken?.name || "User");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-4 bg-white/30 backdrop-blur-md z-20">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-teal-400 text-2xl font-bold">MERN Dev's Hub</div>

        {/* Navbar Links & User Info */}
        <div className="hidden md:flex space-x-6 text-md text-teal-400">
          <Link to="/home" className="block text-teal-400 py-2">
            Home
          </Link>
          <Link to="/developer-directory" className="block text-teal-400 py-2">
            Developers Directory
          </Link>
          <Link to="/resources" className="block text-teal-400 py-2">
            Resources
          </Link>
          <Link to="/job-board" className="block text-teal-400 py-2">
            Job Boards
          </Link>
          <Link to="/project-list" className="block text-teal-400 py-2">
            Works
          </Link>
          <Link to="#about" className="block text-teal-400 py-2">
            About
          </Link>
          <div className="flex items-center space-x-3">
            <FaUserCircle className="text-teal-400 text-2xl" />
            <span className="text-teal-600 font-semibold">{username}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-teal-400 hover:text-teal-900"
            >
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden text-teal-400">
          <FaBars
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>

      {/* Hamburger Menu Dropdown (Mobile) */}
      {isMenuOpen && (
        <div className="absolute top-16 sticky left-0 text-md w-full bg-gray-800 p-4 md:hidden z-30">
          <Link to="/home" className="block text-teal-400 py-2">
            Home
          </Link>
          <Link to="/developer-directory" className="block text-teal-400 py-2">
            Developers Directory
          </Link>
          <Link to="/resources" className="block text-teal-400 py-2">
            Resources
          </Link>
          <Link to="/job-board" className="block text-teal-400 py-2">
            Job Boards
          </Link>
          <Link to="/project-list" className="block text-teal-400 py-2">
            Works
          </Link>
          <Link to="#about" className="block text-teal-400 py-2">
            About
          </Link>
          <div className="flex items-center space-x-3 mt-4">
            <FaUserCircle className="text-white text-2xl text-teal-400" />
            <span className="text-teal-400 font-semibold">{username}</span>
            <button
              onClick={handleLogout}
              className="flex items-center text-teal-400 space-x-1 hover:text-teal-900"
            >
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

