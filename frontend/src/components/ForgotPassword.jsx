import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 3: New Password

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (step === 1) {
        await axios.post("http://localhost:5000/api/auth/forgot-password", {
          email,
          newPassword,
        });
        toast.success("Password reset successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred during password reset.");
    }
  };
  
  const handleNextStep = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setStep(1);
  };
  

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/06/91/05/19/240_F_691051962_GFhQPOAXABmf7l706q89b2PFh6FnB1kI.jpg')",
      }}
    >
      <div className="max-w-sm lg:w-[40%] mx-auto p-6 bg-white rounded-lg shadow-md border border-md border-gray-200">
        <h2 className="text-center text-2xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password *
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Re-enter New Password *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
              <button
                type="submit"
                onClick={handleNextStep}
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Reset Password
              </button>
            </>
          )}
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 mb-4">
              Login
            </Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
