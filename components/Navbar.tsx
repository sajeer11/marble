
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { useCart } from '../CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  return (
    <nav className="w-full bg-white dark:bg-surface-dark shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="material-icons-outlined text-primary text-3xl">terrain</span>
          <span className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white">MarbleLux</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10 font-medium text-base">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-primary transition-colors ${
                location.pathname === link.path ? 'text-primary' : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-700 dark:text-gray-200">
          <Link to="/login" className="hover:text-primary transition-colors">
            <span className="material-icons-outlined">person_outline</span>
          </Link>
          <button className="hover:text-primary transition-colors">
            <span className="material-icons-outlined">search</span>
          </button>
          <button className="hover:text-primary transition-colors">
            <span className="material-icons-outlined">favorite_border</span>
          </button>
          <Link to="/cart" className="hover:text-primary transition-colors relative">
            <span className="material-icons-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
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
  );
};

export default Navbar;
