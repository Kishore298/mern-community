import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skillset: "",
    github: "",
    portfolio: "",
    linkedin: "",
    phone: "",
    phoneVisibility: false,
    emailVisibility: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, skillset } = formData;
    if (!name || !email || !password || !skillset) {
      toast.error("All required fields must be filled!");
      return;
    }

    try {
      await axios.post("https://mern-community-b5ik.onrender.com/api/auth/register", formData);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Check if the error is related to user already existing
        if (error.response.data.error === "User already exists") {
          toast.error("User already exists, please try logging in!");
        } else {
          toast.error("Registration failed! Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/06/91/05/19/240_F_691051962_GFhQPOAXABmf7l706q89b2PFh6FnB1kI.jpg')",
      }}
    >
      <div className="max-w-sm lg:w-[40%] h-96 overflow-y-scroll mx-auto p-6 bg-white rounded-lg shadow-md border border-md border-gray-200">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Primary Skillset *
            </label>
            <input
              type="text"
              name="skillset"
              value={formData.skillset}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Years of Experience *
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              GitHub Link
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Portfolio Link
            </label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Leetcode Link
            </label>
            <input
              type="url"
              name="leetcode"
              value={formData.leetcode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              HackerRank Link
            </label>
            <input
              type="url"
              name="hackerrank"
              value={formData.hackerrank}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <h2 className="text-xl place-self-center font-medium text-blue-700 mb-2">
            Visibility Preferences
          </h2>
          <div className="mb-4 flex gap-x-4">
            <label className="block text-lg font-medium text-gray-700">
              Phone Number Visibility - on/off
            </label>
            <input
              type="checkbox"
              name="phoneVisibility"
              checked={formData.phoneVisibility}
              onChange={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  phoneVisibility: !prevData.phoneVisibility,
                }))
              }
            />
          </div>
          <div className="mb-4 flex gap-x-4">
            <label className="block text-lg font-medium text-gray-700">
              Email Account Visibility - on/off
            </label>
            <input
              type="checkbox"
              name="emailVisibility"
              checked={formData.emailVisibility}
              onChange={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  emailVisibility: !prevData.emailVisibility,
                }))
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
