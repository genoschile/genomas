"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-color-primary shadow-md text-color-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-text">
          <a href="#">Genomas</a>
        </div>

        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:flex space-x-8 text-white">
          <a href="#" className="hover:text-text">
            Company
          </a>
          <a href="#" className="hover:text-text">
            Services
          </a>
          <a href="#" className="hover:text-text">
            Resources
          </a>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Login
          </a>
          <a
            href="#"
            className="px-4 py-2 text-white bg-color-secondary rounded-md hover:outline-double"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-gray-600 hover:text-gray-800"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-2">
            <a href="#" className="block text-gray-600 hover:text-gray-800">
              Company
            </a>
            <a href="#" className="block text-gray-600 hover:text-gray-800">
              Services
            </a>
            <a href="#" className="block text-gray-600 hover:text-gray-800">
              Resources
            </a>
            <div className="mt-4 flex flex-col space-y-2">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Login
              </a>
              <a
                href="#"
                className="px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
