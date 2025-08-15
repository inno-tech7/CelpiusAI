"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { SidebarNav } from "@/components/sidebar-nav"
import { useAuth } from "@/hooks/use-auth"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

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
    '/test/speaking'
  ]

  const isDashboardRoute = dashboardRoutes.some(route => pathname.startsWith(route))

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen body-gradient-bg flex items-center justify-center">
        <div className="glass-card rounded-lg p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-center mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen body-gradient-bg flex">
      {/* Conditionally render SidebarNav for dashboard routes */}
      {isDashboardRoute && <SidebarNav />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Show Navigation only on small screens for dashboard routes, or always for non-dashboard routes */}
        <div className={isDashboardRoute ? "lg:hidden" : ""}>
          <Navigation />
        </div>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`pb-12 lg:pl-[20rem] lg:pr-[6rem] relative z-10 w-full max-820:px-10 max-435:px-4 ${
          isDashboardRoute
            ? "pt-24 lg:pt-12 lg:pl-72" // Adjust padding for persistent sidebar
            : "pt-24"
        }`}
      >
        <div className="max-w-7xl mx-auto">{children}</div>
      </motion.main>
      </div>
    </div>
  )
}
