'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import SpottyBtn from './spotty-btn';
import BorderSpotlight from './BorderSpotlight';

interface NavItem {
  name: string;
  href: string;
}

const mainSiteNavItems: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

interface NavigationProps {
  onSignOut?: () => void;
  navItems?: NavItem[];
  isLandingPage?: boolean;
}

export function Navigation({
  onSignOut,
  navItems = mainSiteNavItems,
  isLandingPage = false,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial width
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
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

  useEffect(() => {
    if (!isLandingPage || navItems.length === 0) return;

    const scrollConfig = {
      observer: {
        rootMargin: '-40% 0px -60% 0px',
        threshold: 0,
      },
    };

    const firstSection = document.querySelector(navItems[0].href);
    if (!firstSection) return;

    const firstSectionTop = firstSection.getBoundingClientRect().top + window.scrollY - 80;

    const observer = new IntersectionObserver((entries) => {
      const intersectingEntry = entries.find((entry) => entry.isIntersecting);
      if (intersectingEntry) {
        setActiveLink(`#${intersectingEntry.target.id}`);
      } else if (window.scrollY < firstSectionTop) {
        setActiveLink(null);
      }
    }, scrollConfig.observer);

    const elementsToObserve = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    elementsToObserve.forEach((el) => observer.observe(el as Element));

    return () => {
      elementsToObserve.forEach((el) => observer.unobserve(el as Element));
    };
  }, [navItems, isLandingPage]);

  const handleNavClick = (href: string) => {
    if (!isLandingPage) {
      setIsMobileMenuOpen(false);
      router.push(href);
      return;
    }

    const scrollConfig = {
      default: {
        '#about': -300,
        '#features': -110,
        '#pricing': -125,
        '#testimonials': -115,
        '#contact': -218,
      } as { [key: string]: number },
      'max-435': {
        '#about': -200,
        '#features': -130,
        '#pricing': -125,
        '#testimonials': -105,
        '#contact': -198,
      } as { [key: string]: number },
      'max-415': {
        '#about': -200,
        '#features': -130,
        '#pricing': -125,
        '#testimonials': -105,
        '#contact': -198,
      } as { [key: string]: number },
    };

    const getOffsets = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 415) {
        return scrollConfig['max-415'];
      } else if (screenWidth <= 435) {
        return scrollConfig['max-435'];
      }

      return scrollConfig.default;
    };

    const element = document.querySelector(href);
    if (element) {
      const currentOffsets = getOffsets();
      const offset = currentOffsets[href] ?? -80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setTimeout(() => setActiveLink(href), 100);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (pathname !== '/') {
      router.push('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderNavLinks = (isMobile: boolean) => {
    const linkClass = isMobile
      ? 'block w-full text-left font-mono text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2'
      : `relative px-3 py-2 font-mono text-sm font-medium transition-colors cursor-pointer`;

    const activeClass = isMobile ? '' : 'text-blue-600 dark:text-blue-400';
    const inactiveClass = isMobile
      ? ''
      : 'text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400';

    return navItems.map((item, index) => {
      const motionProps = isMobile
        ? {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: index * 0.1 + 0.2 },
          }
        : {};

      const content = isLandingPage ? (
        <button
          onClick={() => handleNavClick(item.href)}
          className={`${linkClass} ${activeLink === item.href ? activeClass : inactiveClass}`}
        >
          <span className={`${activeLink === item.href ? 'active' : ''}`}>{item.name}</span>
        </button>
      ) : (
        <Link
          href={item.href}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
          className={`${linkClass} ${pathname === item.href ? activeClass : inactiveClass}`}
        >
          <span className={`${pathname === item.href ? 'active' : ''}`}>{item.name}</span>
        </Link>
      );

      return isMobile ? (
        <motion.div key={item.name} className="nav-item" {...motionProps}>
          {content}
        </motion.div>
      ) : (
        <div key={item.name} className="nav-item">
          {content}
        </div>
      );
    });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: [0.25, 0.25, 0.25, 0.75] }}
        className={`fixed left-0 right-0 top-0 z-50 ${
          isScrolled && windowWidth <= 1024 ? 'glass-card shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Glassmorphic container - only visible on lg+ screens */}

          <div className="mx-4 mb-2 mt-4 hidden xl:block">
            <BorderSpotlight
              color="#5ea0ff"
              brightness={1}
              feather={80}
              borderWidth={7}
              borderRadius="5rem"
            >
              <div className="glassmorphic-nav">
                <div className="flex h-16 items-center justify-between px-6 lg:h-20">
                  <button
                    onClick={handleLogoClick}
                    className="relative z-50 flex items-center sm:ml-[1rem] sm:mt-[0rem] sm:scale-[0.9]"
                  >
                    <Image
                      src="/celpius-ai-logo.png"
                      alt="Celpius AI"
                      width={160}
                      height={54}
                      className="h-[2.5rem] w-auto max-435:relative max-435:left-[-20.45%] max-435:scale-[0.5]"
                    />
                  </button>

                  <div className="absolute left-1/2 hidden -translate-x-1/2 transform items-center justify-center xl:flex">
                    <div className="relative flex items-center space-x-8">
                      {user && navItems === mainSiteNavItems ? (
                        <>
                          <div className="nav-item">
                            <Link
                              href="/dashboard"
                              className={`font-mono text-sm font-medium transition-colors ${pathname === '/dashboard' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'}`}
                            >
                              <span className={pathname === '/dashboard' ? 'active' : ''}>
                                Dashboard
                              </span>
                            </Link>
                          </div>
                          <div className="nav-item">
                            <Link
                              href="/practice"
                              className={`font-mono text-sm font-medium transition-colors ${pathname.startsWith('/practice') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'}`}
                            >
                              <span className={pathname.startsWith('/practice') ? 'active' : ''}>
                                Practice
                              </span>
                            </Link>
                          </div>
                          <div className="nav-item">
                            <Link
                              href="/results"
                              className={`font-mono text-sm font-medium transition-colors ${pathname.startsWith('/results') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'}`}
                            >
                              <span className={pathname.startsWith('/results') ? 'active' : ''}>
                                Results
                              </span>
                            </Link>
                          </div>
                          {user.email === 'admin@celpius.ai' && (
                            <div className="nav-item">
                              <Link
                                href="/admin"
                                className={`font-mono text-sm font-medium transition-colors ${pathname.startsWith('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'}`}
                              >
                                <span className={pathname.startsWith('/admin') ? 'active' : ''}>
                                  Admin
                                </span>
                              </Link>
                            </div>
                          )}
                        </>
                      ) : (
                        renderNavLinks(false)
                      )}
                    </div>
                  </div>

                  <div className="hidden items-center space-x-4 xl:flex">
                    {!user ? (
                      <>
                        <Link href="/auth/login">
                          <Button variant="ghost" size="sm" className="font-mono">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/auth/signup">
                          <SpottyBtn className="nav-glow scale-[0.85] transform font-mono text-white transition-transform hover:scale-[0.9]">
                            Get Started
                          </SpottyBtn>
                        </Link>
                      </>
                    ) : (
                      <>
                        <span className="text-sm text-muted-foreground">
                          Welcome, {user.firstName}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => (onSignOut ? onSignOut() : signOut(router))}
                          className="font-mono"
                        >
                          Sign Out
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 xl:hidden">
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
            </BorderSpotlight>
          </div>

          {/* Fallback navigation for screens < 1024px */}
          <div className="flex h-16 items-center justify-between lg:h-20 xl:hidden">
            <button
              onClick={handleLogoClick}
              className="relative z-50 flex items-center sm:ml-[1rem] sm:mt-[0rem] sm:scale-[0.9]"
            >
              <Image
                src="/celpius-ai-logo.png"
                alt="Celpius AI"
                width={160}
                height={54}
                className="h-[2.5rem] w-auto max-435:relative max-435:left-[-20.45%] max-435:scale-[0.5]"
              />
            </button>

            <div className="flex items-center space-x-2 xl:hidden">
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
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="glass-card fixed right-0 top-0 z-40 h-full w-80 max-w-[80vw] border-l border-white/10 xl:hidden max-435:max-w-[56vw]"
            >
              <div className="flex h-full flex-col px-6 py-6 pt-20">
                <div className="flex-1 space-y-6">
                  {user && navItems === mainSiteNavItems ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Link
                          href="/dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="nav-item block py-2 font-mono text-lg font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                        >
                          <span className={pathname === '/dashboard' ? 'active' : ''}>
                            Dashboard
                          </span>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <Link
                          href="/practice"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="nav-item block py-2 font-mono text-lg font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                        >
                          <span className={pathname.startsWith('/practice') ? 'active' : ''}>
                            Practice
                          </span>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <Link
                          href="/results"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="nav-item block py-2 font-mono text-lg font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                        >
                          <span className={pathname.startsWith('/results') ? 'active' : ''}>
                            Results
                          </span>
                        </Link>
                      </motion.div>
                      {user.email === 'admin@celpius.ai' && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 }}
                        >
                          <Link
                            href="/admin"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 font-mono text-lg font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                          >
                            Admin
                          </Link>
                        </motion.div>
                      )}
                    </>
                  ) : (
                    renderNavLinks(true)
                  )}
                </div>
                <div className="space-y-4 border-t border-white/10 pt-6">
                  {!user ? (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start font-mono">
                            Sign In
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                      >
                        <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button className="glow btn-gradient-border w-full bg-gradient-primary font-mono text-white">
                            Get Started
                          </Button>
                        </Link>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    >
                      <Button
                        variant="ghost"
                        onClick={() => {
                          if (onSignOut) onSignOut();
                          else signOut(router);
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
    </>
  );
}
