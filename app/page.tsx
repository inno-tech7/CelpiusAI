"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { fadeIn } from "@/app/variants/variants"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

import Link from "next/link"

export default function HomePage() {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { user, signOut } = useAuth()

  useEffect(() => {
    if (isSigningOut) {
      const timer = setTimeout(() => {
        signOut()
      }, 750)
      return () => clearTimeout(timer)
    }
  }, [isSigningOut, signOut])

  useEffect(() => {
    if (!user && isSigningOut) {
      setIsSigningOut(false)
    }
  }, [user, isSigningOut])

  const handleSignOut = () => {
    setIsSigningOut(true)
  }
  return (
    <motion.div
      className="min-h-screen body-gradient-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: isSigningOut ? 0 : 1 }}
      transition={{ duration: 0.75 }}
    >
      <Navigation onSignOut={handleSignOut} />
      

      <motion.div
        variants={fadeIn('up', 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <HeroSection />
      </motion.div>

      <motion.section
        // id="about"
        // variants={fadeIn('up', 0.5)}
        // initial="hidden"
        // whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        // className="py-20 lg:py-32"
      >
      </motion.section>
        <AboutSection />

      <motion.div
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <FeaturesSection />
      </motion.div>

      <motion.div
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <PricingSection />
      </motion.div>

      

      <motion.section
        id="contact"
        variants={fadeIn('up', 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="py-20 lg:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              Have questions about Celpius AI? We're here to help you succeed in your CELPIP journey and achieve your
              Canadian immigration goals.
            </p>
            <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-slate-600 dark:text-slate-400 mb-4">Contact us at:</p>
              <Link href="mailto:support@celpius.ai" className="font-mono text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-lg mb-4 block transition-colors">
                support@celpius.ai
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400">We typically respond within 24 hours</p>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  )
}
