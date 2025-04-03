import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Congratulations from "./Congratulations";
import { useAuthForm } from '../../contexts/AuthFormContext';
import { useUser } from '../../contexts/userContext';

const SignupForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const { formData, updateFormData } = useAuthForm();
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate first step
      if (!formData.fullName || !formData.username || !formData.phone) {
        alert('Please fill all fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Create user account
      const userId = `user${Date.now()}`; // Generate dummy ID
      const newUser = {
        id: userId,
        ...formData,
        createdAt: new Date().toISOString(),
        // profile: {
        //   verificationStatus: 'pending',
        // }
      };
      setUser(newUser);
      setStep(3);
    }
  };

  const goToLogin = () => {
    navigate("/signin"); // Redirect to the login page when "Log in" is clicked
  };

  // If step is 3, show the Congratulations component
  if (step === 3) {
    return <Congratulations />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Create an account</h2>
        <p className="text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={goToLogin}
            className="text-green-500 cursor-pointer"
          >
            Log in
          </span>
        </p>

        {/* Progress Bar */}
        <div className="flex justify-evenly items-center mt-6 mb-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex text-center">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                  s <= step
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-gray-300 text-gray-500 border-gray-300"
                }`}
              >
                {s}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1 - User Info */}
        {step === 1 && (
          <div>
            <input
              name="fullName"
              type="text"
              placeholder="Enter full name"
              className="w-full p-3 border rounded-md mb-3"
              onChange={handleChange}
            />
            <input
              name="username"
              type="text"
              placeholder="Enter username"
              className="w-full p-3 border rounded-md mb-3"
              onChange={handleChange}
            />
            <input
              name="phone"
              type="text"
              placeholder="Enter phone number"
              className="w-full p-3 border rounded-md mb-3"
              onChange={handleChange}
            />
          </div>
        )}

        {/* Step 2 - Password Info */}
        {step === 2 && (
          <div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full p-3 border rounded-md mb-3"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter password again"
                className="w-full p-3 border rounded-md mb-3"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-3 top-4"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <ul className="text-xs text-gray-500">
              <li>• Use 8 or more characters</li>
              <li>• Use a number (e.g., 1234)</li>
              <li>• Use upper and lowercase letters</li>
              <li>• Use a symbol (e.g., @#$)</li>
            </ul>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={nextStep}
          className={`w-full p-3 rounded-md mt-4 ${
            step < 2 ? "bg-gray-300" : "bg-green-500 text-white"
          }`}
          disabled={step < 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
