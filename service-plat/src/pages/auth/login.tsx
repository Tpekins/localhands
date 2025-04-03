import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../../contexts/userContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login with dummy data
    const dummyUser = {
      id: `user${Date.now()}`,
      email,
      role: 'freelancer' as const,
      fullName: 'John Doe',
      username: 'johndoe',
      createdAt: new Date().toISOString(),
      // profile: {
      //   verificationStatus: 'verified',
      // }
    };

    setUser(dummyUser);
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-md mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-md mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-4"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md mt-4 transition-colors duration-300 hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-green-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
