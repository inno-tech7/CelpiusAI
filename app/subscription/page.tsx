"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, X, Users, Shield, Clock, Star, CreditCard, Settings } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Get started with basic CELPIP practice",
    price: { monthly: 0, yearly: 0 },
    badge: null,
    color: "from-gray-500 to-gray-600",
    features: [
      { name: "2 practice tests per month", included: true },
      { name: "Basic score feedback", included: true },
      { name: "Listening & Reading sections", included: true },
      { name: "Community support", included: true },
      { name: "Writing & Speaking sections", included: false },
      { name: "AI-powered feedback", included: false },
      { name: "Detailed analytics", included: false },
      { name: "Progress tracking", included: false },
      { name: "Unlimited practice tests", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Current Plan",
    popular: false,
  },
  {
    id: "standard",
    name: "Standard",
    description: "Perfect for serious CELPIP preparation",
    price: { monthly: 29, yearly: 290 },
    badge: "Most Popular",
    color: "from-blue-500 to-blue-600",
    features: [
      { name: "Unlimited practice tests", included: true },
      { name: "All 4 sections (LRSW)", included: true },
      { name: "AI-powered feedback", included: true },
      { name: "Basic analytics", included: true },
      { name: "Progress tracking", included: true },
      { name: "Email support", included: true },
      { name: "Advanced AI insights", included: false },
      { name: "Personalized study plans", included: false },
      { name: "Speaking emotion analysis", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Upgrade to Standard",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Complete CELPIP mastery with advanced AI",
    price: { monthly: 49, yearly: 490 },
    badge: "Best Value",
    color: "from-purple-500 to-purple-600",
    features: [
      { name: "Everything in Standard", included: true },
      { name: "Advanced AI insights", included: true },
      { name: "Personalized study plans", included: true },
      { name: "Speaking emotion analysis", included: true },
      { name: "Detailed performance analytics", included: true },
      { name: "Priority support", included: true },
      { name: "1-on-1 coaching sessions", included: true },
      { name: "Custom practice materials", included: true },
      { name: "Score prediction", included: true },
      { name: "Exam booking assistance", included: true },
    ],
    cta: "Upgrade to Premium",
    popular: false,
  },
]

const currentSubscription = {
  plan: "free",
  status: "active",
  nextBilling: null,
  cancelAtPeriodEnd: false,
}

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    setIsLoading(planId)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(null)
      // In real app, redirect to Stripe checkout
      console.log(`Subscribing to ${planId}`)
    }, 2000)
  }

  const getSavings = (monthly: number, yearly: number) => {
    if (monthly === 0) return 0
    return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-mono">Choose Your Plan</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Unlock your CELPIP potential with AI-powered practice tests and personalized feedback
          </p>
        </div>

        {/* Current Subscription Status */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white font-mono flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-400" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/30 capitalize">
                    {currentSubscription.plan}
                  </Badge>
                  <Badge
                    className={`${
                      currentSubscription.status === "active"
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : "bg-red-500/20 text-red-300 border-red-500/30"
                    }`}
                  >
                    {currentSubscription.status}
                  </Badge>
                </div>
                <p className="text-blue-200 text-sm">
                  {currentSubscription.nextBilling
                    ? `Next billing: ${currentSubscription.nextBilling}`
                    : "No billing scheduled"}
                </p>
              </div>
              <Button
                variant="outline"
                className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 font-mono bg-transparent"
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Billing
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${billingCycle === "monthly" ? "text-white" : "text-blue-300"}`}>Monthly</span>
          <Switch
            checked={billingCycle === "yearly"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
            className="data-[state=checked]:bg-green-600"
          />
          <span className={`text-sm ${billingCycle === "yearly" ? "text-white" : "text-blue-300"}`}>
            Yearly
            <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30 text-xs">Save up to 17%</Badge>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = plan.price[billingCycle]
            const savings = getSavings(plan.price.monthly, plan.price.yearly)
            const isCurrentPlan = currentSubscription.plan === plan.id

            return (
              <Card
                key={plan.id}
                className={`relative bg-black/20 backdrop-blur-md border rounded-2xl overflow-hidden ${
                  plan.popular ? "border-blue-500/50 ring-2 ring-blue-500/20" : "border-white/10 hover:border-white/20"
                } transition-all duration-300`}
              >
                {plan.badge && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-blue-600 text-white border-blue-500 px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className={`bg-gradient-to-r ${plan.color}/20 pt-8`}>
                  <CardTitle className="text-white font-mono text-2xl text-center">{plan.name}</CardTitle>
                  <CardDescription className="text-blue-200 text-center">{plan.description}</CardDescription>

                  <div className="text-center py-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white font-mono">${price}</span>
                      {price > 0 && (
                        <span className="text-blue-300">/{billingCycle === "monthly" ? "month" : "year"}</span>
                      )}
                    </div>
                    {billingCycle === "yearly" && savings > 0 && (
                      <div className="text-green-400 text-sm mt-1">Save {savings}% annually</div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${feature.included ? "text-blue-100" : "text-gray-500 line-through"}`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full font-mono ${
                      isCurrentPlan
                        ? "bg-gray-600 hover:bg-gray-700 text-gray-300 cursor-not-allowed"
                        : plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                          : `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`
                    }`}
                    onClick={() => !isCurrentPlan && handleSubscribe(plan.id)}
                    disabled={isCurrentPlan || isLoading === plan.id}
                  >
                    {isLoading === plan.id ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : isCurrentPlan ? (
                      "Current Plan"
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Feature Comparison */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white font-mono text-center">Feature Comparison</CardTitle>
            <CardDescription className="text-blue-200 text-center">
              Compare all features across our subscription plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 text-white font-mono">Features</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center py-4 text-white font-mono">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    "Practice tests per month",
                    "AI-powered feedback",
                    "All 4 sections (LRSW)",
                    "Progress tracking",
                    "Detailed analytics",
                    "Speaking emotion analysis",
                    "Personalized study plans",
                    "Priority support",
                  ].map((feature, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-3 text-blue-200">{feature}</td>
                      <td className="text-center py-3">
                        {feature === "Practice tests per month" ? (
                          <span className="text-blue-300">2</span>
                        ) : ["AI-powered feedback", "All 4 sections (LRSW)", "Progress tracking"].includes(feature) ? (
                          <X className="w-4 h-4 text-gray-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-gray-500 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-3">
                        {feature === "Practice tests per month" ? (
                          <span className="text-green-400">Unlimited</span>
                        ) : ["Speaking emotion analysis", "Personalized study plans", "Priority support"].includes(
                            feature,
                          ) ? (
                          <X className="w-4 h-4 text-gray-500 mx-auto" />
                        ) : (
                          <Check className="w-4 h-4 text-green-400 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-3">
                        {feature === "Practice tests per month" ? (
                          <span className="text-green-400">Unlimited</span>
                        ) : (
                          <Check className="w-4 h-4 text-green-400 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white font-mono text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Can I cancel anytime?</h4>
                  <p className="text-blue-200 text-sm">
                    Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                    your billing period.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Is there a free trial?</h4>
                  <p className="text-blue-200 text-sm">
                    Our Free plan gives you access to basic features. You can upgrade anytime to unlock advanced AI
                    feedback and unlimited tests.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">How accurate is the AI scoring?</h4>
                  <p className="text-blue-200 text-sm">
                    Our AI scoring system is trained on thousands of CELPIP responses and provides highly accurate
                    predictions within ±0.5 CLB levels.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Do you offer refunds?</h4>
                  <p className="text-blue-200 text-sm">
                    We offer a 30-day money-back guarantee for all paid subscriptions. Contact support for assistance.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Trust */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-6 text-blue-300">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">10,000+ Students</span>
            </div>
          </div>
          <p className="text-blue-400 text-sm">Powered by Stripe • SSL Encrypted • GDPR Compliant</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
