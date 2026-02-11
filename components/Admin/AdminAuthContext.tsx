'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isLoggedIn: boolean;
  adminName: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState<string | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('adminAuth');
    if (stored) {
      try {
        const { isLoggedIn: logged, adminName: name } = JSON.parse(stored);
        setIsLoggedIn(logged);
        setAdminName(name);
      } catch (e) {
        localStorage.removeItem('adminAuth');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simple demo authentication - in production use proper backend
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setAdminName('Admin');
      localStorage.setItem('adminAuth', JSON.stringify({ isLoggedIn: true, adminName: 'Admin' }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAdminName(null);
    localStorage.removeItem('adminAuth');
  };

  return (
    <AdminAuthContext.Provider value={{ isLoggedIn, adminName, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
