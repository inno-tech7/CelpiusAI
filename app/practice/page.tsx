"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Play, Headphones, Mic, PenTool, BookOpen, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

const testSections = [
  {
    id: "listening",
    name: "Listening",
    icon: Headphones,
    duration: "47-55 minutes",
    parts: 6,
    description: "Listen to conversations, discussions, and presentations",
    color: "from-blue-500 to-cyan-500",
    href: "/test/listening",
  },
  {
    id: "reading",
    name: "Reading",
    icon: BookOpen,
    duration: "55-60 minutes",
    parts: 4,
    description: "Read correspondence, diagrams, information, and viewpoints",
    color: "from-blue-500 to-cyan-500",
    href: "/test/reading",
  },
  {
    id: "writing",
    name: "Writing",
    icon: PenTool,
    duration: "53-60 minutes",
    parts: 2,
    description: "Write an email and respond to survey questions",
    color: "from-blue-500 to-cyan-500",
    href: "/test/writing",
  },
  {
    id: "speaking",
    name: "Speaking",
    icon: Mic,
    duration: "15-20 minutes",
    parts: 8,
    description: "Speak about various topics and situations",
    color: "from-blue-500 to-cyan-500",
    href: "/test/speaking",
  },
]

export default function PracticePage() {
  const [selectedTest, setSelectedTest] = useState<string>("complete")

  return (
    <DashboardLayout>
      <div className="space-y-8 fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="gradient-text text-[2rem] font-[500] font-mono">CELPIP Practice Test</h1>
          <p className="text-xl text-slate-800/70 dark:text-gray-500 max-w-3xl mx-auto">
            Take a complete practice test or focus on individual sections. Get instant AI-powered feedback on your
            performance.
          </p>
        </div>

        {/* Test Instructions */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl">
          <CardHeader>
            <CardTitle className="hero-card-font-sh-features font-mono flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-400" />
              Important Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-blue-100">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800/70 dark:text-gray-100">Before You Begin:</h4>
                <ul className="space-y-1 text-sm text-slate-800/70 dark:text-gray-100">
                  <li>• Ensure you have a quiet environment</li>
                  <li>• Use headphones or speakers for audio sections</li>
                  <li>• Have paper and pen ready for notes</li>
                  <li>• Check your microphone for speaking tasks</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800/70 dark:text-gray-100">Test Format:</h4>
                <ul className="space-y-1 text-sm text-slate-800/70 dark:text-gray-100">
                  <li>• Complete test takes approximately 3 hours</li>
                  <li>• Each section has strict time limits</li>
                  <li>• No going back once you move forward</li>
                  <li>• Immediate AI feedback after completion</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Selection */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold hero-card-font-sh-features font-mono text-center">Choose Your Practice Mode</h2>

          {/* Complete Test Option */}
          <Card className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20">
              <CardTitle className="text-blue-500 dark:text-blue-400 font-mono flex items-center gap-3">
                <Play className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                Complete Practice Test
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  Recommended
                </Badge>
              </CardTitle>
              <CardDescription className="dark:text-blue-200 text-blue-500">
                Take all four sections in sequence - the full CELPIP experience
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 dark:text-gray-400 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Total Duration: 2 hours 39 minutes</span>
                  </div>
                  <p className="text-sm dark:text-blue-300 text-gray-900">
                    Includes all sections: Listening → Reading → Writing → Speaking
                  </p>
                </div>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-mono px-8 py-3 rounded-xl"
                  asChild
                >
                  <Link href="/test/complete">Start Complete Test</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Individual Sections */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold hero-card-font-sh-features font-mono text-center">Or Practice Individual Sections</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {testSections.map((section) => {
                const IconComponent = section.icon
                return (
                  <Card
                    key={section.id}
                    className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <CardHeader className={`bg-gradient-to-r ${section.color}/20`}>
                      <CardTitle className="text-white font-mono flex items-center gap-3">
                        <IconComponent className="w-5 h-5" />
                        {section.name}
                      </CardTitle>
                      <CardDescription className="text-gray-50">{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="dark:text-blue-300 text-blue-600">Duration:</span>
                          <span className="dark:text-white text-gray-700">{section.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="dark:text-blue-300 text-blue-600">Parts:</span>
                          <span className="dark:text-white text-gray-700">{section.parts} tasks</span>
                        </div>
                      </div>

                      <Button
                        className={`w-full bg-gradient-to-r ${section.color} hover:opacity-90 text-white font-mono rounded-xl`}
                        asChild
                      >
                        <Link href={section.href}>Start {section.name}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Performance Standards */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl">
          <CardHeader>
            <CardTitle className="hero-card-font-sh-features font-mono flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Performance Standards
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-800/70 dark:text-gray-100">
            <p className="mb-4">
              After completing your test, you can review detailed performance standards to understand how your responses
              would be evaluated by CELPIP raters.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-blue-500/30 text-blue-500 hover:bg-blue-500/10 font-mono bg-transparent"
                asChild
              >
                <Link href="/standards/writing">Writing Standards</Link>
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/30 text-blue-500 hover:bg-blue-500/10 font-mono bg-transparent"
                asChild
              >
                <Link href="/standards/speaking">Speaking Standards</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
