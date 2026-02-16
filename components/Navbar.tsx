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
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [links, setLinks] = useState<{ label: string; path: string }[]>(NAV_LINKS);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout, isLoading } = useUserAuth();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('search');
    if (query) setSearchQuery(query);
  }, [pathname]);

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
      } catch { }
    };
    load();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn && user?.id) {
      const fetchNotifications = async () => {
        try {
          const res = await fetch(`/api/notifications?userId=${user.id}`);
          if (res.ok) setNotifications(await res.json());
        } catch { }
      };
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    } else {
      setNotifications([]);
    }
  }, [isLoggedIn, user?.id]);

  const markAsRead = async (id: number) => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: true }),
      });
      if (res.ok) {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
      }
    } catch { }
  };

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
        <div className="hidden lg:flex space-x-10 font-medium text-base">
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

        {/* Icons & Search */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-gray-700 dark:text-gray-200">
          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm w-40 lg:w-60 text-gray-900 dark:text-white"
            />
            <button type="submit" className="hover:text-primary transition-colors">
              <span className="material-icons-outlined text-lg">search</span>
            </button>
          </form>

          {/* User Account - Desktop */}
          {!isLoading && (
            <div className="hidden md:block relative">
              {isLoggedIn ? (
                <div className="flex items-center gap-6">
                  {/* Notification Bell */}
                  <div className="relative">
                    <button
                      className="hover:text-primary transition-colors flex items-center relative"
                      onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    >
                      <span className="material-icons-outlined">notifications</span>
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[9px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-black animate-pulse">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {isNotificationsOpen && (
                      <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-[100] animate-fadeIn">
                        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                          <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                            Notifications
                          </h3>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{unreadCount} New</span>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto scrollbar-hide divide-y divide-gray-50 dark:divide-gray-700">
                          {notifications.length > 0 ? (
                            notifications.map((n) => (
                              <div
                                key={n.id}
                                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer relative group ${!n.read ? 'bg-blue-50/30' : ''}`}
                                onClick={() => {
                                  if (!n.read) markAsRead(n.id);
                                  if (n.link) router.push(n.link);
                                  setIsNotificationsOpen(false);
                                }}
                              >
                                <div className="flex gap-3">
                                  <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${n.type === 'order_status' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                    <span className="material-icons text-base">
                                      {n.type === 'order_status' ? 'shopping_bag' : 'notifications'}
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-xs font-bold truncate ${n.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>{n.title}</p>
                                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{n.message}</p>
                                    <p className="text-[9px] text-gray-400 mt-1 font-medium">{new Date(n.createdAt).toLocaleString()}</p>
                                  </div>
                                  {!n.read && (
                                    <div className="size-2 rounded-full bg-blue-500 shrink-0 mt-1" />
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-12 px-6 text-center">
                              <span className="material-icons-outlined text-4xl text-gray-200 mb-3 block">notifications_off</span>
                              <p className="text-sm font-medium text-gray-400">No notifications yet.</p>
                            </div>
                          )}
                        </div>
                        {notifications.length > 0 && (
                          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700 text-center">
                            <button
                              className="text-[11px] font-bold text-brand-blue hover:text-blue-800 transition-colors"
                              onClick={() => setIsNotificationsOpen(false)}
                            >
                              Close Panel
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                      <span className="material-icons-outlined">account_circle</span>
                      <span className="font-medium text-sm">{user?.name || 'Account'}</span>
                      <span className="material-icons text-sm">expand_more</span>
                    </button>

                    {/* User Dropdown Menu */}
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
                  </div>
                </div>
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

          {/* Mobile Search Toggle */}
          <button className="md:hidden hover:text-primary transition-colors" onClick={() => (document.getElementById('mobile-search') as any)?.focus()}>
            <span className="material-icons-outlined">search</span>
          </button>

          {/* Favorites Icon */}
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
            className="lg:hidden hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-icons-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 p-6 space-y-4">
          <form onSubmit={handleSearch} className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mb-4">
            <input
              id="mobile-search"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm flex-1 text-gray-900 dark:text-white"
            />
            <button type="submit" className="text-gray-500">
              <span className="material-icons-outlined">search</span>
            </button>
          </form>

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

      {/* Backdrop for menus - Desktop */}
      {(isUserMenuOpen || isNotificationsOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
