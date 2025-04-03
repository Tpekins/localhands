// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-3xl font-bold text-green-600">
          <Link to="/">Bug Busters</Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/pro" className="hover:text-green-600 transition-colors">
            Busters Pro
          </Link>
          <Link to="/search" className="hover:text-green-600 transition-colors">
            Explore
          </Link>
          {/* <Link to="/docs" className="hover:text-green-600 transition-colors">
            Docs
          </Link> */}
          <Link
            to="/signup"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            Sign Up
          </Link>
          <Link to="/signin" className="hover:text-green-600 transition-colors">
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle (optional) */}
        <div className="md:hidden flex items-center">
          {/* Implement a mobile menu if desired */}
          <button className="text-green-600 focus:outline-none">
            {/* Icon or hamburger menu */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 5h16M4 12h16M4 19h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
