import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy-loaded components
const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
const DeveloperCard = lazy(() => import('./components/DeveloperCard'));
const DeveloperDirectory = lazy(() => import('./components/DeveloperDirectory'));
const DeveloperDetails = lazy(() => import('./components/DeveloperDetail'));
const ResourceList = lazy(() => import('./components/ResourceList'));
const ResourceForm = lazy(() => import('./components/ResourceForm'));
const JobBoardList = lazy(() => import('./components/JobBoardList'));
const Home = lazy(() => import('./pages/Home'));

const App = () => {
  const location = useLocation();

  // Defined the paths where the Navbar should not be displayed
  const excludedPaths = ['/', '/register', '/forgot-password'];

  // Checks if the current path matches any of the excluded paths
  const shouldShowNavbar = !excludedPaths.includes(location.pathname);

  return (
    <>
      <ToastContainer autoClose={3000} />
      {shouldShowNavbar && <Navbar />}
      <div className="App">
        <main>
          {/* Wrap the routes with Suspense for lazy loading */}
          <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
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
          </Suspense>
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
