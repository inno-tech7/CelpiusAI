'use client';

import type React from 'react';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { SidebarNav } from '@/components/sidebar-nav';
import { useAuth } from '@/hooks/use-auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Define dashboard-related routes where navbar should be hidden on large screens
  const dashboardRoutes = [
    '/dashboard',
    '/practice',
    '/results',
    '/subscription',
    '/test/complete',
    '/test/listening',
    '/test/reading',
    '/test/writing',
    '/test/speaking',
  ];

  const isDashboardRoute = dashboardRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="body-gradient-bg flex min-h-screen items-center justify-center">
        <div className="glass-card rounded-lg p-8">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="mt-4 text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="body-gradient-bg flex min-h-screen">
      {/* Conditionally render SidebarNav for dashboard routes */}
      {isDashboardRoute && <SidebarNav />}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Show Navigation only on small screens for dashboard routes, or always for non-dashboard routes */}
        <div className={isDashboardRoute ? 'lg:hidden' : ''}>
          <Navigation onSignOut={() => signOut(router)} />
        </div>
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`relative z-10 w-full pb-12 lg:pl-[20rem] lg:pr-[6rem] max-1024:pl-[21rem] max-1024:pr-[2rem] max-820:px-10 max-435:px-4 ${
            isDashboardRoute
              ? 'pt-24 lg:pl-72 lg:pt-12' // Adjust padding for persistent sidebar
              : 'pt-24'
          }`}
        >
          <div className="mx-auto max-w-7xl">{children}</div>
        </motion.main>
      </div>
    </div>
  );
}
