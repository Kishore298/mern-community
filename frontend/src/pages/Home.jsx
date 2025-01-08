import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative">
      {/* Combined Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700 p-8 text-center">
        <div className="max-w-8xl">
          <h2 className="text-4xl lg:text-6xl text-teal-500 font-bold mb-12">
            A Community for{" "}
            <span className="text-orange-600">MERN Stack Developers...</span>
          </h2>
          <h3 className="text-2xl underline lg:text-4xl font-bold mb-6 text-teal-600">
            Explore more
          </h3>
          <p className="mb-6 text-md lg:text-xl text-gray-600 max-w-4xl mx-auto">
            Our platform offers a variety of resources and opportunities for
            MERN stack developers to grow, connect, and showcase their talents.
          </p>
          <p className="text-md lg:text-xl max-w-4xl mx-auto">
            From exploring a vibrant developer directory to accessing valuable
            resources, we are here to support your journey in web development.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-12 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-teal-600 mb-4">
              Features
            </h2>
            <p className="text-3xl text-gray-600">
              Discover the standout features of our platform, designed to
              empower developers and businesses alike.
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-16">
            {/* Feature 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
              <div className="lg:w-1/2">
                <img
                  src="./images/image11.webp"
                  alt="Get in Touch with Talented Developers"
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
              </div>
              <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
                <h3 className="text-2xl font-semibold text-teal-500 mb-4">
                  Get in Touch with Talented Developers
                </h3>
                <p className="text-xl lg:text-3xl text-gray-600 mb-6">
                  Explore our developer directory to connect with professionals
                  who share your vision. Build meaningful collaborations today.
                </p>
                <Link
                  to="/developer-directory"
                  className="inline-block px-6 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-900"
                >
                  Explore Developers Directory
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-8 text-center lg:text-left">
              <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
                <h3 className="text-2xl font-semibold text-teal-500 mb-4">
                  Access Valuable Resources
                </h3>
                <p className="text-xl lg:text-3xl text-gray-600 mb-6">
                  Dive into our extensive library of resources. From tutorials
                  to best practices, find everything you need to succeed.
                </p>
                <Link
                  to="/resources"
                  className="inline-block px-6 py-3 bg-teal-400 text-white font-bold rounded-lg hover:bg-teal-900"
                >
                  View Resources
                </Link>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="./images/image13.webp"
                  alt="Access Valuable Resources"
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
              <div className="lg:w-1/2">
                <img
                  src="./images/image16.avif"
                  alt="Explore Job Opportunities"
                  className="rounded-lg shadow-xl w-full h-80 object-cover border border-md border-gray-300"
                />
              </div>
              <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
                <h3 className="text-2xl font-semibold text-teal-500 mb-4">
                  Explore Job Opportunities
                </h3>
                <p className="text-xl lg:text-3xl text-gray-600 mb-6">
                  Find and apply to various job opportunities that match your
                  skills and interests. Browse job boards to get started.
                </p>
                <Link
                  to="/job-boards"
                  className="inline-block px-6 py-3 bg-teal-400 text-white font-bold rounded-lg hover:bg-teal-900"
                >
                  Explore Job Boards
                </Link>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-8 text-center lg:text-left">
              <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
                <h3 className="text-2xl font-semibold text-teal-500 mb-4">
                  Showcase Your Projects
                </h3>
                <p className="text-xl lg:text-3xl text-gray-600 mb-6">
                  Highlight your best work and gain visibility among potential
                  clients or employers. Make your portfolio stand out!
                </p>
                <Link
                  to="/#projects"
                  className="inline-block px-6 py-3 bg-teal-400 text-white font-bold rounded-lg hover:bg-teal-900"
                >
                  Showcase Projects
                </Link>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="./images/image14.webp"
                  alt="Showcase Projects"
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 backdrop-blur-md py-6">
        <div className="text-center">
          <p className="text-lg lg:text-2xl text-teal-400">
            Designed and developed by Kishore ♥️
          </p>
          <div className="flex justify-center mt-4 space-x-6">
            <a
              href="https://www.instagram.com/your_instagram_handle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 text-2xl hover:text-gray-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/your_linkedin_profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 text-2xl hover:text-gray-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/your_github_username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 text-2xl hover:text-gray-400"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
