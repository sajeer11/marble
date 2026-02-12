'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: number | string;
    name: string | null;
    email: string;
    role: string;
}

interface UserAuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
            try {
                const res = await fetch('/api/auth/me', { method: 'GET', credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    if (data.authenticated && data.user) {
                        setUser(data.user);
                        setIsLoggedIn(true);
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('userAuth', JSON.stringify({ user: data.user, timestamp: Date.now() }));
                        }
                    }
                } else {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('userAuth');
                    }
                }
            } catch (e) {
                // Fallback to localStorage if API fails
                if (typeof window !== 'undefined') {
                    const stored = localStorage.getItem('userAuth');
                    if (stored) {
                        try {
                            const data = JSON.parse(stored);
                            setUser(data.user);
                            setIsLoggedIn(true);
                        } catch {
                            localStorage.removeItem('userAuth');
                        }
                    }
                }
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const userData = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                };

                setUser(userData);
                setIsLoggedIn(true);
                localStorage.setItem('userAuth', JSON.stringify({
                    user: userData,
                    timestamp: Date.now(),
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
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('userAuth');
        fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
            router.push('/');
        });
    };

    return (
        <UserAuthContext.Provider value={{ user, isLoggedIn, login, logout, isLoading }}>
            {children}
        </UserAuthContext.Provider>
    );
}

export function useUserAuth() {
    const context = useContext(UserAuthContext);
    if (context === undefined) {
        throw new Error('useUserAuth must be used within a UserAuthProvider');
    }
    return context;
}
