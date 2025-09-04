"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTransition } from "@/components/transition-provider"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  nativeLanguage?: string
  targetCLB?: string
  subscription?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signOut: (router: ReturnType<typeof useRouter>) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { showTransition, hideTransition } = useTransition()

  useEffect(() => {

    const checkUser = async () => {
      try {

        const savedUser = localStorage.getItem("currentUser")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Error checking user session:", error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    let userToSignin: User | null = null;

    if (email === "admin@celpius.ai") {
      userToSignin = {
        id: "admin-001",
        email: "admin@celpius.ai",
        firstName: "Admin",
        lastName: "User",
        subscription: "premium",
      };
    } else {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (users[email]) {
        userToSignin = users[email];
      } else {
        setLoading(false)
        return { success: false, error: "User not found. Please sign up." }
      }
    }

    setUser(userToSignin);
    localStorage.setItem("currentUser", JSON.stringify(userToSignin));
    setLoading(false);
    return { success: true };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      nativeLanguage: userData.nativeLanguage,
      targetCLB: userData.targetCLB,
      subscription: "free",
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    users[email] = mockUser;
    localStorage.setItem("users", JSON.stringify(users));

    // Automatically sign in the new user
    setUser(mockUser);
    localStorage.setItem("currentUser", JSON.stringify(mockUser));
  }

  const signOut = async (router: ReturnType<typeof useRouter>) => {
    showTransition()
    await new Promise((resolve) => setTimeout(resolve, 500)) // Wait for transition to animate in

    setUser(null)
    localStorage.removeItem("currentUser")
    router.push("/")

    // Hide the transition after a short delay to allow the new page to render
    setTimeout(() => {
      hideTransition()
    }, 250)
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
