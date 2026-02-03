
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">MarbleLux.</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              400 University Drive Suite 200 Coral Gables,<br />
              FL 33134 USA
            </p>
          </div>
          <div>
            <h4 className="text-gray-400 font-medium mb-6 uppercase tracking-wider text-xs">Links</h4>
            <ul className="space-y-4 text-gray-900 dark:text-white font-medium">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-400 font-medium mb-6 uppercase tracking-wider text-xs">Help</h4>
            <ul className="space-y-4 text-gray-900 dark:text-white font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Payment Options</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-400 font-medium mb-6 uppercase tracking-wider text-xs">Newsletter</h4>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                className="bg-transparent border-b border-gray-900 dark:border-white focus:outline-none py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 w-full"
                placeholder="Enter Your Email Address"
                type="email"
              />
              <button className="text-sm font-bold uppercase border-b border-gray-900 dark:border-white py-2 hover:text-primary hover:border-primary transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-between items-center">
          <p className="text-gray-900 dark:text-white text-sm">2023 MarbleLux. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
