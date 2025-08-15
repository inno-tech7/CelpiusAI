"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/use-auth"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  const [activeLink, setActiveLink] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])



  useEffect(() => {
    const scrollConfig = {
      observer: {
        rootMargin: "-40% 0px -60% 0px",
        threshold: 0,
      },
    }

    const firstSection = document.querySelector(navItems[0].href)
    if (!firstSection) return

    const firstSectionTop = firstSection.getBoundingClientRect().top + window.scrollY - 80

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting)

        if (intersectingEntry) {
          setActiveLink(`#${intersectingEntry.target.id}`)
        } else {
          if (window.scrollY < firstSectionTop) {
            setActiveLink(null)
          }
        }
      },
      scrollConfig.observer
    )

    const elementsToObserve = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    elementsToObserve.forEach((el) => observer.observe(el as Element))

    return () => {
      elementsToObserve.forEach((el) => observer.unobserve(el as Element))
    }
  }, [navItems])

  const handleNavClick = (href: string) => {
    const scrollConfig = {
      offsets: {
        '#features': -68,
        '#pricing': -75,
        '#about': -70,
        '#contact': -68,
      } as { [key: string]: number },
    }

    const element = document.querySelector(href)
    if (element) {
      const offset = scrollConfig.offsets[href] ?? -80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition + offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })


      setTimeout(() => setActiveLink(href), 100) 
    }
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/")
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: [0.25, 0.25, 0.25, 0.75] }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled ? "glass-card shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button onClick={handleLogoClick} className="flex items-center space-x-2 z-50 relative">
              <Image src="/celpius-ai-logo.png" alt="Celpius AI" width={160} height={54} className="h-[2.5rem] w-auto max-435:relative max-435:left-[-20.45%] max-435:scale-[0.5]" />
            </button>

            <div className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <div className="relative flex items-center space-x-8">
                {!user ? (
                  navItems.map((item) => (
                    <div key={item.name} className="nav-item">
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className={`relative px-3 py-2 font-mono text-sm font-medium transition-colors cursor-pointer ${
                          activeLink === item.href
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400"
                        }`}
                      >
                        <span className={`${activeLink === item.href ? "active" : ""}`}>{item.name}</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="nav-item">
                      <Link
                        href="/dashboard"
                        className={`font-mono text-sm font-medium transition-colors ${
                          pathname === "/dashboard"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                      >
                        <span className={pathname === "/dashboard" ? "active" : ""}>Dashboard</span>
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link
                        href="/practice"
                        className={`font-mono text-sm font-medium transition-colors ${
                          pathname.startsWith("/practice")
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                      >
                        <span className={pathname.startsWith("/practice") ? "active" : ""}>Practice</span>
                      </Link>
                    </div>
                    <div className="nav-item">
                      <Link
                        href="/results"
                        className={`font-mono text-sm font-medium transition-colors ${
                          pathname.startsWith("/results")
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                      >
                        <span className={pathname.startsWith("/results") ? "active" : ""}>Results</span>
                      </Link>
                    </div>
                    <div className="nav-item">
                      {/* <Link
                        href="/subscription"
                        className={`font-mono text-sm font-medium transition-colors ${
                          pathname === "/subscription"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                      >
                        <span className={pathname === "/subscription" ? "active" : ""}>Subscription</span>
                      </Link> */}
                    </div>
                    {user.email === "admin@celpius.ai" && (
                      <div className="nav-item">
                        <Link
                          href="/admin"
                          className={`font-mono text-sm font-medium transition-colors ${
                            pathname.startsWith("/admin")
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                          }`}
                        >
                          <span className={pathname.startsWith("/admin") ? "active" : ""}>Admin</span>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle />
              {!user ? (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm" className="font-mono">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm" className="glow font-mono gradient-btn text-white btn-gradient-border">
                      Get Started
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-sm text-muted-foreground">Welcome, {user.firstName}</span>
                  <Button variant="ghost" size="sm" onClick={signOut} className="font-mono">
                    Sign Out
                  </Button>
                </>
              )}
            </div>

            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50 w-10 h-10 p-0"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <span
                    className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                    }`}
                  />
                  <span
                    className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
                    }`}
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-80 max-w-[80vw] max-435:max-w-[56vw] glass-card border-l border-white/10 z-40 lg:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6 py-6">
                <div className="flex-1 space-y-6">
                  {!user ? (
                    navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        className="nav-item"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                      >
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className="block w-full text-left font-mono text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                        >
                          <span className={`${activeLink === item.href ? "active" : ""}`}>{item.name}</span>
                        </button>
                      </motion.div>
                    ))
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Link
                          href="/dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block font-mono text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                        >
                          Dashboard
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
                          className="block font-mono text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                        >
                          Practice
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
                          className="block font-mono text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                        >
                          Results
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        {/* <Link
                          href="/subscription"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block font-mono text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                        >
                          Subscription
                        </Link> */}
                      </motion.div>
                      {user.email === "admin@celpius.ai" && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 }}
                        >
                          <Link
                            href="/admin"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block font-mono text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                          >
                            Admin
                          </Link>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4">
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
                          <Button className="w-full glow font-mono bg-gradient-primary text-white btn-gradient-border">Get Started</Button>
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
                          signOut()
                          setIsMobileMenuOpen(false)
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
  )
}
