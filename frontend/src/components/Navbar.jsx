import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken?.username || "User");
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
        <div className="flex items-center gap-4 p-1">
          <img
            className="w-16 h-16 rounded-full"
            src="./images/logo.jpg"
            alt="MERN Dev's Hub Logo"
          />
          <h3 className="text-teal-400 text-2xl font-bold">MERN Dev's Hub</h3>
        </div>

        {/* Navbar Links & User Info */}
        <div className="hidden md:flex space-x-6 text-md text-teal-400">
          <Link
            to="/home"
            className="block text-teal-400 py-2 hover:text-teal-900"
          >
            Home
          </Link>
          <Link
            to="/developer-directory"
            className="block text-teal-400 py-2 hover:text-teal-900"
          >
            Developers Directory
          </Link>
          <Link
            to="/resources"
            className="block text-teal-400 py-2 hover:text-teal-900"
          >
            Resources
          </Link>
          <Link
            to="/job-board"
            className="block text-teal-400 py-2 hover:text-teal-900"
          >
            Job Boards
          </Link>
          <Link
            to="#about"
            className="block text-teal-400 py-2 hover:text-teal-900"
          >
            About
          </Link>
          <div className="flex items-center space-x-3">
            <FaUserCircle className="text-teal-400 text-2xl" />
            <span className="text-teal-400 font-semibold hover:text-teal-900">
              {username}
            </span>
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
        <div className="absolute top-18 sticky left-0 text-md w-full bg-white/30 backdrop-blur-md z-20 md:hidden">
          <Link
            to="/home"
            className="block text-teal-400 py-2 hover:text-teal-900"
          >
            Home
          </Link>
          <Link
            to="/developer-directory"
            className="block text-teal-400 py-2 hover:text-teal-900"
          >
            Developers Directory
          </Link>
          <Link
            to="/resources"
            className="block text-teal-400 py-2 hover:text-teal-900"
          >
            Resources
          </Link>
          <Link
            to="/job-board"
            className="block text-teal-400 py-2 hover:text-teal-900"
          >
            Job Boards
          </Link>
          <Link
            to="#about"
            className="block text-teal-400 py-2 hover:text-teal-900"
          >
            About
          </Link>
          <div className="flex flex-col space-x-4 space-y-2 hover:text-teal-900">
            <div className="flex gap-x-2">
              <FaUserCircle className="text-teal-500 text-2xl text-teal-400" />
              <span className="text-teal-400 font-semibold hover:text-teal-900">
                {username}
              </span>
            </div>
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
