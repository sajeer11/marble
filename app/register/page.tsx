'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 min-h-screen">
      {/* Left: Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-md space-y-10">
          <div>
            <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-2">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400">Join our exclusive stone collection community.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-3">
                <span className="material-icons text-sm">error</span>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold dark:text-white">Full Name</label>
              <div className="relative">
                <span className="material-icons-outlined absolute left-4 top-4 text-gray-400">person</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-14 pl-12 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold dark:text-white">Email Address</label>
              <div className="relative">
                <span className="material-icons-outlined absolute left-4 top-4 text-gray-400">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-14 pl-12 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold dark:text-white">Password</label>
              <div className="relative">
                <span className="material-icons-outlined absolute left-4 top-4 text-gray-400">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-12 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold dark:text-white">Confirm Password</label>
              <div className="relative">
                <span className="material-icons-outlined absolute left-4 top-4 text-gray-400">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark focus:ring-primary focus:border-primary transition-all"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white font-bold rounded-lg shadow-lg transition-all active:scale-95"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>

      {/* Right: Image Overlay */}
      <div className="hidden lg:block w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover" alt="Stone" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
        <div className="absolute bottom-20 left-20 right-20 text-white space-y-6">
          <blockquote className="text-4xl font-display font-medium leading-tight">
            "Join our community of stone enthusiasts and designers."
          </blockquote>
          <p className="text-sm font-bold uppercase tracking-widest opacity-80">Premium Membership</p>
        </div>
      </div>
    </div>
  );
}
