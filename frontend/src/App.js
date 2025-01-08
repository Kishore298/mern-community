import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import DeveloperCard from './components/DeveloperCard';
import DeveloperDirectory from './components/DeveloperDirectory';
import DeveloperDetails from './components/DeveloperDetail';
import ResourceList from './components/ResourceList';
import AddResourceForm from './components/AddResourceForm';
import JobBoardList from './components/JobBoardList';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
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
            <Route path="/developer-card" element={<PrivateRoute><DeveloperCard /></PrivateRoute>} />
            <Route path="/developer-directory" element={<PrivateRoute><DeveloperDirectory /></PrivateRoute>} />
            <Route path="/developer-details/:id" element={<PrivateRoute><DeveloperDetails /></PrivateRoute>} />
            <Route path="/resources" element={<PrivateRoute><ResourceList /></PrivateRoute>} />
            <Route path="/add-resource" element={<PrivateRoute><AddResourceForm /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/job-board" element={<PrivateRoute><JobBoardList /></PrivateRoute>} />
            <Route path="/project-list" element={<PrivateRoute><ProjectList /></PrivateRoute>} />
            <Route path="/project-form" element={<PrivateRoute><ProjectForm /></PrivateRoute>} />
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
