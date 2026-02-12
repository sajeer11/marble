'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { NAV_LINKS } from '../constants';
import { useCart } from '../app/CartContext';
import { useUserAuth } from '@/contexts/UserAuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [links, setLinks] = useState<{ label: string; path: string }[]>(NAV_LINKS);
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout, isLoading } = useUserAuth();

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/navigation', { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setLinks(data.map((l: any) => ({ label: l.label, path: l.path })));
          }
        }
      } catch {}
    };
    load();
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white dark:bg-surface-dark shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="material-icons-outlined text-primary text-3xl">terrain</span>
          <span className="text-2xl font-bold font-display tracking-tight text-gray-900 dark:text-white">
            MarbleLux
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-10 font-medium text-base">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`hover:text-primary transition-colors ${pathname === link.path
                  ? 'text-primary'
                  : 'text-gray-700 dark:text-gray-200'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-gray-700 dark:text-gray-200">
          {/* User Account - Desktop */}
          {!isLoading && (
            <div className="hidden md:block relative">
              {isLoggedIn ? (
                <>
                  <button
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <span className="material-icons-outlined">account_circle</span>
                    <span className="font-medium text-sm">{user?.name || 'Account'}</span>
                    <span className="material-icons text-sm">expand_more</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span className="material-icons-outlined text-lg">dashboard</span>
                        Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span className="material-icons-outlined text-lg">settings</span>
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 border-t border-gray-200 dark:border-gray-700 mt-2"
                      >
                        <span className="material-icons-outlined text-lg">logout</span>
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Search Icon */}
          <button className="hover:text-primary transition-colors">
            <span className="material-icons-outlined">search</span>
          </button>

          {/* Favorites Icon - Hidden on mobile */}
          <button className="hidden sm:block hover:text-primary transition-colors">
            <span className="material-icons-outlined">favorite_border</span>
          </button>

          {/* Cart Icon */}
          <Link href="/cart" className="hover:text-primary transition-colors relative">
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
          {/* User Account - Mobile */}
          {!isLoading && (
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-icons-outlined text-3xl text-primary">account_circle</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-900 dark:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="material-icons-outlined">dashboard</span>
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-900 dark:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="material-icons-outlined">settings</span>
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm font-medium text-red-600 dark:text-red-400"
                  >
                    <span className="material-icons-outlined">logout</span>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    className="block w-full text-center px-4 py-3 border-2 border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg text-sm font-semibold transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Nav Links */}
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="block text-lg font-medium hover:text-primary transition-colors dark:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Backdrop for user menu dropdown - Desktop */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
