'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  CreditCard,
  User,
  LogOut,
  Headphones,
  Mic,
  PenTool,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import BorderSpotlight from '@/components/BorderSpotlight';

const navItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Practice',
    href: '/practice',
    icon: BookOpen,
  },
  {
    title: 'Results',
    href: '/results',
    icon: BarChart3,
  },
  // {
  //   title: "Subscription",
  //   href: "/subscription",
  //   icon: CreditCard,
  // },
];

const sidebarVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <motion.div
      className="fixed left-0 top-0 z-40 flex h-screen w-64 pb-[2rem] pl-[1rem] pt-[2.5rem] max-820:hidden"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <style jsx global>{`
        .sidebar-nav::-webkit-scrollbar {
          width: 8px;
        }
        .sidebar-nav::-webkit-scrollbar-track {
          background-color: transparent;
        }
        .sidebar-nav::-webkit-scrollbar-thumb {
          background-color: #60a5fa;
          border-radius: 10px;
          border-top: 2px solid transparent;
          border-bottom: 2px solid transparent;
          border-left: 3px solid transparent;
          border-right: 4px solid transparent;
          background-clip: content-box;
        }
        .sidebar-nav::-webkit-scrollbar-thumb:hover {
          background-color: #a8cfff;
        }
      `}</style>
      <BorderSpotlight
        color="#5ea0ff"
        brightness={1}
        feather={80}
        borderWidth={7}
        borderRadius="2rem"
      >
        <div className="glassmorphic-dashboard flex h-full w-[16rem] flex-col justify-between rounded-[2rem]">
          {/* Logo Section */}
          <div className="border-b border-white/10 px-6 py-6">
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/celpius-ai-logo.png"
                alt="Celpius AI"
                width={160}
                height={54}
                className="h-[2.5rem] w-auto scale-[0.8] max-435:relative max-435:left-[-20.45%] max-435:scale-[0.5]"
              />
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="sidebar-nav flex-1 overflow-y-auto pb-6 pt-6">
            <div className="space-y-2 px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'glass group relative flex items-center overflow-hidden rounded-lg px-3 py-3 font-mono text-sm font-medium transition-all duration-200',
                      {
                        'nav-item-active': isActive,
                        'smooth-gradient-hover': !isActive,
                      }
                    )}
                  >
                    <Icon
                      className={cn(
                        'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200',
                        isActive
                          ? 'text-black'
                          : 'text-slate-600 group-hover:text-black dark:text-slate-400'
                      )}
                    />
                    <span
                      className={cn(
                        'truncate transition-colors duration-200',
                        isActive
                          ? 'text-black'
                          : 'text-slate-600 group-hover:text-black dark:text-slate-100'
                      )}
                    >
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Bottom Section - User Info, Theme Toggle, Sign Out */}
          <div className="space-y-3 border-t border-white/10 px-3 pb-7 pt-4">
            {/* Welcome User */}
            {user && (
              <div className="glass spotty-cta pointer-events-none flex h-[6rem] flex-col items-start justify-center rounded-lg px-3 py-2">
                <div className="flex flex-row items-center">
                  <p className="font-mono text-[1rem] leading-[2rem] text-slate-600 dark:text-slate-100">
                    Welcome,
                  </p>
                  <p className="font-mono text-[1rem] leading-[2rem] text-slate-600 dark:text-slate-100">
                    {user.firstName || 'User'}
                  </p>
                </div>
                <p className="mt-2 truncate text-[0.7rem] text-blue-700 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            )}

            {/* Theme Toggle */}
            {/* <div className="flex justify-center px-3 py-1 rounded-lg glass">
            <ThemeToggle />
          </div> */}

            {/* Sign Out Button */}
            {user && (
              <Button
                variant="ghost"
                onClick={() => signOut(router)}
                className="w-full justify-start font-mono text-gray-800 hover:bg-white/5 hover:text-blue-400 dark:text-slate-100 dark:hover:text-blue-400"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </BorderSpotlight>
    </motion.div>
  );
}
