import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useCart } from '../CartContext';
import Sidebar from './Profile/Sidebar'; // your Sidebar component
import Dashboard from './Profile/Dashboard';
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <>
      <nav className="w-full bg-white dark:bg-surface-dark shadow-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="material-icons-outlined text-primary text-3xl">terrain</span>
            <span className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white">
              MarbleLux
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-10 font-medium text-base">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-primary transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6 text-gray-700 dark:text-gray-200">
            {/* Profile Icon */}
            <button
              className="hover:text-primary transition-colors relative"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="material-icons-outlined">account_circle</span>
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent-gold rounded-full"></span>
            </button>

            {/* Search Icon */}
            <button className="hover:text-primary transition-colors">
              <span className="material-icons-outlined">search</span>
            </button>

            {/* Favorites Icon */}
            <button className="hover:text-primary transition-colors">
              <span className="material-icons-outlined">favorite_border</span>
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="hover:text-primary transition-colors relative">
              <span className="material-icons-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-icons-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 p-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block text-lg font-medium hover:text-primary transition-colors dark:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-surface-dark shadow-2xl z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Optional: backdrop overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
