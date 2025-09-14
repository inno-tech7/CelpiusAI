"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Pencil,
  Users,
  Server,
  CreditCard,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { motion } from "framer-motion";
import BorderSpotlight from "@/components/BorderSpotlight"


const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Content", href: "/admin/content", icon: Pencil },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "System", href: "/admin/system", icon: Server },
  { title: "Billing", href: "/admin/billing", icon: CreditCard },
]

const sidebarVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  return (
    <motion.div
      className="fixed left-0 top-0 z-40 w-64 h-screen max-820:hidden flex pt-[2.5rem] pb-[2rem] pl-[1rem]"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <style jsx global>{`
        .admin-sidebar-nav::-webkit-scrollbar {
          width: 8px;
        }
        .admin-sidebar-nav::-webkit-scrollbar-track {
          background-color: transparent;
        }
        .admin-sidebar-nav::-webkit-scrollbar-thumb {
          background-color: #60a5fa;
          border-radius: 10px;
          border-top: 2px solid transparent;
          border-bottom: 2px solid transparent;
          border-left: 3px solid transparent;
          border-right: 4px solid transparent;
          background-clip: content-box;
        }
        .admin-sidebar-nav::-webkit-scrollbar-thumb:hover {
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
    
    <div className="h-full w-[16rem] glassmorphic-dashboard rounded-[2rem] flex flex-col justify-between">

        

        {/* Logo Section */}
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/" className="flex items-center justify-center">
            <Image src="/celpius-ai-logo.png" alt="Celpius AI" width={160} height={54} className="h-[2.5rem] w-auto scale-[0.8]" />
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 pt-6 pb-6 overflow-y-auto admin-sidebar-nav">
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
        <div className="px-3 pb-7 border-t border-white/10 pt-4 space-y-3">
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
      </BorderSpotlight>
    </motion.div>
  )
}
