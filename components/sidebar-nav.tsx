"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BookOpen, BarChart3, CreditCard, User, LogOut, Headphones, Mic, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/use-auth"
import { motion } from "framer-motion";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Practice",
    href: "/practice",
    icon: BookOpen,
  },
  {
    title: "Results",
    href: "/results",
    icon: BarChart3,
  },
  // {
  //   title: "Subscription",
  //   href: "/subscription",
  //   icon: CreditCard,
  // },
]

const sidebarVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  return (
    <motion.div
      className="fixed left-0 top-0 z-40 h-screen w-64 pl-4 pt-10 pr-4 pb-[2.9rem] max-820:hidden"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <div className="h-[41rem] w-[17rem] glass-dashboard flex flex-col max-1024:h-[80rem]">

        <Image
            src="/section-images/flare (vertical).png"
            alt="flare"
            width={500} 
            height={3500} 
            quality={100} 
            className="absolute top-[-203.5%] max-1024:top-[-55.5%] max-1024:left-[6.55%] xl:left-[7%] lg:left-[25.55%] max-820:top-[-11%]  max-820:left-[18.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none scale-[0.10] max-820:scale-[1.4] max-768:top-[-10.7%] max-435:top-[-7.2%] max-435:left-[-14.45%] max-435:scale-[0.7]"
        />

        {/* Logo Section */}
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/" className="flex items-center justify-center">
            <Image src="/celpius-ai-logo.png" alt="Celpius AI" width={160} height={54} className="h-[2.5rem] w-auto max-435:relative max-435:left-[-20.45%] scale-[0.8]  max-435:scale-[0.5]" />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 pt-6 pb-6 overflow-y-auto">
          <div className="px-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden glass font-mono",
                    {
                      "nav-item-active": isActive,
                      "smooth-gradient-hover": !isActive,
                    },
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0 mr-3 transition-colors duration-200",
                      isActive
                        ? "text-black"
                        : "text-slate-600 dark:text-slate-400 group-hover:text-black",
                    )}
                  />
                  <span
                    className={cn(
                      "truncate transition-colors duration-200",
                      isActive
                        ? "text-black"
                        : "text-slate-600 dark:text-slate-100 group-hover:text-black",
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom Section - User Info, Theme Toggle, Sign Out */}
        <div className="px-3 pb-4 border-t border-white/10 pt-4 space-y-3">
          {/* Welcome User */}
          {user && (
            <div className="flex flex-col items-start justify-center px-3 py-2 h-[6rem] rounded-lg glass spotty-cta pointer-events-none">
              <div className="flex flex-row items-center">
                <p className="text-[1rem] leading-[2rem] font-mono text-slate-600 dark:text-slate-100">
                  Welcome,
                </p>
                <p className="text-[1rem] leading-[2rem] font-mono text-slate-600 dark:text-slate-100">
                  {user.firstName || "User"}
                </p>
              </div>
              <p className="text-[0.7rem]  dark:text-gray-400 text-blue-700 truncate mt-2">{user.email}</p>
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
              className="w-full justify-start font-mono dark:text-slate-100 dark:hover:text-blue-400 text-gray-800 hover:text-blue-400 hover:bg-white/5"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
