import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import DeveloperCard from './components/DeveloperCard';
import DeveloperDirectory from './components/DeveloperDirectory';
import DeveloperDetails from './components/DeveloperDetail';
import ResourceList from './components/ResourceList';
import ResourceForm from './components/ResourceForm'; // Updated import
import JobBoardList from './components/JobBoardList';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PrivateRoute from './components/ProtectedRoute'; 
import { ToastContainer } from 'react-toastify';

const App = () => {
  const location = useLocation();

  // Define the paths where the Navbar should not be displayed
  const excludedPaths = ['/', '/register', '/forgot-password'];

  // Check if the current path matches any of the excluded paths
  const shouldShowNavbar = !excludedPaths.includes(location.pathname);

  return (
    <>
      <ToastContainer autoClose={3000} />
      {shouldShowNavbar && <Navbar />}
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Use PrivateRoute for protected pages */}
            <Route
              path="/developer-card"
              element={<PrivateRoute element={<DeveloperCard />} />}
            />
            <Route
              path="/developer-directory"
              element={<PrivateRoute element={<DeveloperDirectory />} />}
            />
            <Route
              path="/developer-details/:id"
              element={<PrivateRoute element={<DeveloperDetails />} />}
            />
            <Route
              path="/resources"
              element={<PrivateRoute element={<ResourceList />} />}
            />
            <Route
              path="/add-resource"
              element={<PrivateRoute element={<ResourceForm />} />}
            />
            <Route
              path="/home"
              element={<PrivateRoute element={<Home />} />}
            />
            <Route
              path="/job-board"
              element={<PrivateRoute element={<JobBoardList />} />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
