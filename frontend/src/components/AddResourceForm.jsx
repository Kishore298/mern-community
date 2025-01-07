import React, { useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const AddResourceForm = ({ setShowAddResourceForm, fetchResources }) => {
  const [newResource, setNewResource] = useState({
    title: "",
    type: "PDF",
    url: "",
    topic: "",
    category: "",
  });

  const handleSubmitResource = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", newResource.title);
    formData.append("type", newResource.type);
    formData.append("topic", newResource.topic);
    formData.append("category", newResource.category);
  
    if (newResource.type === "PDF" && newResource.file) {
      formData.append("pdf", newResource.file);
    } else if (newResource.type === "YouTube") {
      formData.append("url", newResource.url);
    }
  
    try {
      await axios.post("http://localhost:5000/api/submitResource", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      fetchResources(); // Make sure this is being called
      setShowAddResourceForm(false);
      toast.success("Resource submitted successfully!");
    } catch (err) {
      toast.error("Error submitting resource.");
      console.error("Error submitting resource", err);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Submit Resource
        </h2>
        <form onSubmit={handleSubmitResource} className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              value={newResource.title}
              onChange={(e) =>
                setNewResource({ ...newResource, title: e.target.value })
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Type */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              value={newResource.type}
              onChange={(e) =>
                setNewResource({ ...newResource, type: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="PDF">PDF</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={newResource.category}
              onChange={(e) =>
                setNewResource({ ...newResource, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Practice">Practice</option>
            </select>
          </div>
          {/* File or URL */}
          {newResource.type === "PDF" && (
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700"
              >
                Upload PDF
              </label>
              <input
                id="file"
                type="file"
                onChange={(e) =>
                  setNewResource({ ...newResource, file: e.target.files[0] })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {newResource.type === "YouTube" && (
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                YouTube URL
              </label>
              <input
                id="url"
                type="text"
                placeholder="Enter YouTube URL"
                value={newResource.url}
                onChange={(e) =>
                  setNewResource({ ...newResource, url: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {/* Topic */}
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700"
            >
              Topic
            </label>
            <select
              id="topic"
              value={newResource.topic}
              onChange={(e) =>
                setNewResource({ ...newResource, topic: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Topics</option>
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
          </div>
          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </form>
        {/* Cancel Button */}
        <button
          onClick={() => setShowAddResourceForm(false)}
          className="mt-4 w-full bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddResourceForm;
