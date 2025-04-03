// src/components/Footer.tsx
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto px-4">
        {/* Top row: columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#freelance" className="hover:text-white">
                  Freelance Services
                </a>
              </li>
              <li>
                <a href="#jobboard" className="hover:text-white">
                  Job Board
                </a>
              </li>
              <li>
                <a href="#marketplace" className="hover:text-white">
                  Marketplace
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#help" className="hover:text-white">
                  Help & FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row: social + copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-700 pt-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Bug Busters. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" className="hover:text-white">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" className="hover:text-white">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
