"use client"

import { motion } from "framer-motion"
import { fadeIn } from "@/app/variants/variants"
import { Button } from "@/components/ui/button"
import { Check, Star, Zap } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["Limited practice sessions", "3 AI feedbacks per week", "Basic progress tracking", "Community support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Standard",
    price: "$29",
    period: "per month",
    description: "Ideal for serious preparation",
    features: [
      "Unlimited practice sessions",
      "Unlimited AI feedback",
      "Advanced progress analytics",
      "Priority support",
      "Mock test simulations",
      "Study plan recommendations",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Premium",
    price: "$49",
    period: "per month",
    description: "Complete CELPIP mastery",
    features: [
      "Everything in Standard",
      "Emotional tone analysis",
      "Advanced speaking feedback",
      "Personal coaching sessions",
      "Custom study materials",
      "Priority customer support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            variants={fadeIn('up', 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            Choose Your <span className="gradient-text">Success Plan</span>
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Choose a plan that is right for you and unlock your full potential.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-8 max-820:gap-[5rem]">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={fadeIn('up', 0.1 + index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className={`glass-card rounded-3xl p-8 ${
                plan.popular ? "ring-2 ring-blue-500 scale-105 glow" : "hover:scale-105"
              } transition-transform duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-950 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-600 dark:text-slate-400 ml-2">/{plan.period}</span>
                </div>
              </div>

              <div className="flex items-center justify-center min-h-[22vh]">

                <div className="flex flex-col items-start space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              </div>

              

              <Link href="/auth/signup">
                <Button
                  className={`w-full font-mono ${plan.popular ? "glow hover:text-white" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.popular && <Zap className="mr-2 h-4 w-4" />}
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 dark:text-slate-400">✨ 30-day money-back guarantee on all paid plans</p>
        </motion.div>
      </div>
    </section>
  )
}
