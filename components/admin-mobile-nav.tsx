'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

interface NavItem {
  name: string;
  href: string;
}

const adminNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Content', href: '/admin/content' },
  { name: 'Users', href: '/admin/users' },
  { name: 'System', href: '/admin/system' },
  { name: 'Billing', href: '/admin/billing' },
];

export function AdminMobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogoClick = () => {
    router.push('/');
  };

  const renderNavLinks = () => {
    return adminNavItems.map((item, index) => (
      <motion.div
        key={item.name}
        className="nav-item"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      >
        <Link
          href={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`block w-full py-2 text-left font-mono text-lg font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400`}
        >
          <span className={`${pathname === item.href ? 'active' : ''}`}>{item.name}</span>
        </Link>
      </motion.div>
    ));
  };

  return (
    <div className="lg:hidden">
      <motion.nav
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] }}
        className={`fixed left-0 right-0 top-0 z-50 ${
          isScrolled ? 'glass-card shadow-lg' : 'bg-transparent'
        } mb-[1rem]`}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <button
              onClick={handleLogoClick}
              className="relative z-50 flex items-center sm:ml-[1rem] sm:mt-[1rem] sm:scale-[0.9]"
            >
              <Image
                src="/celpius-ai-logo.png"
                alt="Celpius AI"
                width={160}
                height={54}
                className="h-[2.5rem] w-auto max-435:relative max-435:left-[-20.45%] max-435:scale-[0.5]"
              />
            </button>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50 h-10 w-10 p-0"
              >
                <div className="flex h-5 w-5 flex-col items-center justify-center">
                  <span
                    className={`block h-0.5 w-5 transform bg-current transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-0.5 rotate-45' : '-translate-y-1'}`}
                  />
                  <span
                    className={`block h-0.5 w-5 transform bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <span
                    className={`block h-0.5 w-5 transform bg-current transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-0.5 -rotate-45' : 'translate-y-1'}`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="glass-card fixed right-0 top-0 z-40 h-full w-80 max-w-[80vw] border-l border-white/10 max-435:max-w-[56vw]"
            >
              <div className="flex h-full flex-col px-6 py-6 pt-20">
                <div className="flex-1 space-y-6">{renderNavLinks()}</div>
                <div className="space-y-4 border-t border-white/10 pt-6">
                  {user && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    >
                      <Button
                        variant="ghost"
                        onClick={() => {
                          signOut(router);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start font-mono"
                      >
                        Sign Out
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
