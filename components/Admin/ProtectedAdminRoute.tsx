'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from './AdminAuthContext';

export function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn } = useAdminAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/admin/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
