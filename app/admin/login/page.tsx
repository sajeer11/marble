'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/components/Admin/AdminAuthContext';

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Call async login
    const success = await login(username, password);
    if (success) {
      router.push('/admin');
    } else {
      setError('Invalid username or password');
      setPassword('');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-1 min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="p-3 bg-yellow-600 rounded-lg">
                <span className="material-icons text-white">admin_panel_settings</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Manage MarbleLux Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-3">
                <span className="material-icons text-sm">error</span>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Username</label>
              <div className="relative">
                <span className="material-icons absolute left-4 top-4 text-gray-400">person</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full h-12 pl-12 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <span className="material-icons absolute left-4 top-4 text-gray-400">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-12 pl-12 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="material-icons">{showPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                <span className="material-icons text-sm">info</span>
                Demo Credentials
              </p>
              <div className="space-y-1 text-xs text-blue-600 dark:text-blue-300">
                <p><span className="font-semibold">Username:</span> admin</p>
                <p><span className="font-semibold">Password:</span> admin123</p>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Logging in...
                </>
              ) : (
                <>
                  <span className="material-icons text-sm">login</span>
                  Login to Admin
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-600 dark:text-gray-400">
            Secure admin access for MarbleLux staff only
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-yellow-500 to-yellow-700">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=1200&q=80"
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative text-center text-white space-y-6 px-12">
          <div className="text-6xl">🏢</div>
          <div>
            <h2 className="text-4xl font-bold mb-3">Admin Dashboard</h2>
            <p className="text-lg text-yellow-100">Manage products, categories, sections, and all site content</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-white">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">6</p>
                <p className="text-sm mt-1">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4</p>
                <p className="text-sm mt-1">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-bold">6</p>
                <p className="text-sm mt-1">Sections</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
