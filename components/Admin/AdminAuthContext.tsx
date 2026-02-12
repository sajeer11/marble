'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isLoggedIn: boolean;
  adminName: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const getInitialAuth = () => {
    if (typeof window === 'undefined') {
      return { isLoggedIn: false, adminName: null as string | null };
    }
    try {
      const stored = localStorage.getItem('adminAuth');
      if (stored) {
        const { isLoggedIn: logged, adminName: name } = JSON.parse(stored);
        return { isLoggedIn: !!logged, adminName: name || null };
      }
    } catch {
      localStorage.removeItem('adminAuth');
    }
    return { isLoggedIn: false, adminName: null as string | null };
  };

  const initial = getInitialAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(initial.isLoggedIn);
  const [adminName, setAdminName] = useState<string | null>(initial.adminName);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch('/api/auth/me', { method: 'GET', credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user?.role === 'ADMIN') {
            setIsLoggedIn(true);
            setAdminName(data.user.name || 'Admin');
            if (typeof window !== 'undefined') {
              localStorage.setItem('adminAuth', JSON.stringify({ isLoggedIn: true, adminName: data.user.name || 'Admin', role: 'ADMIN' }));
            }
            return;
          }
        }
      } catch {}
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('adminAuth');
        if (stored) {
          try {
            const { isLoggedIn: logged, adminName: name } = JSON.parse(stored);
            setIsLoggedIn(!!logged);
            setAdminName(name || null);
          } catch {
            localStorage.removeItem('adminAuth');
          }
        }
      }
    };
    init();
  }, [isLoggedIn]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setAdminName(data.user.name || 'User');
        localStorage.setItem('adminAuth', JSON.stringify({
          isLoggedIn: true,
          adminName: data.user.name || 'User',
          role: data.user.role
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAdminName(null);
    localStorage.removeItem('adminAuth');
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
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
