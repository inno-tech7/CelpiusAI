"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Timer } from "@/components/timer"
import { Clock, Headphones, BookOpen, PenTool, Mic, Play, AlertTriangle, CheckCircle } from "lucide-react"

const testSections = [
  {
    id: "listening",
    name: "Listening",
    icon: Headphones,
    duration: 47,
    description: "6 parts with audio clips and questions",
  },
  {
    id: "reading",
    name: "Reading",
    icon: BookOpen,
    duration: 55,
    description: "4 parts with passages and comprehension questions",
  },
  { id: "writing", name: "Writing", icon: PenTool, duration: 53, description: "2 tasks: Email and Opinion essay" },
  { id: "speaking", name: "Speaking", icon: Mic, duration: 20, description: "8 tasks with voice recording" },
]

export default function CompleteTestPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [testStarted, setTestStarted] = useState(false)
  const [sectionStarted, setSectionStarted] = useState(false)
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [timeRemaining, setTimeRemaining] = useState(0)
  const router = useRouter()

  const totalDuration = testSections.reduce((acc, section) => acc + section.duration, 0)
  const currentSectionData = testSections[currentSection]

  const startTest = () => {
    setTestStarted(true)
    startCurrentSection()
  }

  const startCurrentSection = () => {
    setSectionStarted(true)
    setTimeRemaining(currentSectionData.duration * 60)
  }

  const completeSection = () => {
    setCompletedSections((prev) => [...prev, currentSectionData.id])
    setSectionStarted(false)

    if (currentSection < testSections.length - 1) {
      setCurrentSection((prev) => prev + 1)
    } else {

      router.push("/results/complete-test")
    }
  }

  const navigateToSection = () => {
    router.push(`/test/${currentSectionData.id}`)
  }

  useEffect(() => {
    if (sectionStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            completeSection()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [sectionStarted, timeRemaining])

  if (!testStarted) {
    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-8 xl:mt-0 lg:mt-[11rem]"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Complete CELPIP Practice Test</h1>
            <p className="text-muted-foreground">
              This is a full-length practice test that mirrors the actual CELPIP exam format.
            </p>
          </div>

          <Card className="glass-dashboard">

            <Image
                src="/section-images/flare (horizontal).png"
                alt="flare"
                width={500} 
                height={3500} 
                quality={100} 
                className="absolute top-[-7%] left-[21.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none md:scale-[1.8] max-435:top-[-5%] max-435:left-[-14.45%] max-435:scale-[0.7] max-415:top-[-4.65%] max-415:left-[-16%]"
              />

            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Test Overview</span>
              </CardTitle>
              <CardDescription>
                Total duration: {totalDuration} minutes (~{Math.round((totalDuration / 60) * 10) / 10} hours)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testSections.map((section, index) => (
                  <div key={section.id} className="flex items-center space-x-4 p-4 glass rounded-lg">
                    <section.icon className="h-8 w-8 text-blue-500" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{section.name}</h3>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                      <p className="text-sm font-mono text-blue-500">{section.duration} minutes</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dark:bg-blue-700/30 bg-blue-700/20 border border-blue-400/60 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 dark:text-blue-500 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold dark:text-blue-500 text-blue-500">Important Instructions</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Once you start, you cannot pause or go back to previous sections</li>
                      <li>• Each section has a strict time limit</li>
                      <li>• Make sure you have a quiet environment for the speaking section</li>
                      <li>• Your progress will be automatically saved</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={startTest} size="lg" className="glow">
                  <Play className="mr-2 h-5 w-5" />
                  Start Complete Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="glass-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Complete CELPIP Test</h1>
            <Badge variant="secondary" className="font-mono">
              Section {currentSection + 1} of {testSections.length}
            </Badge>
          </div>

          <Progress value={(currentSection / testSections.length) * 100} className="h-2 mb-4" />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Progress: {currentSection}/{testSections.length} sections completed
            </span>
            <span>{completedSections.length} sections finished</span>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <currentSectionData.icon className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle>{currentSectionData.name} Section</CardTitle>
                  <CardDescription>{currentSectionData.description}</CardDescription>
                </div>
              </div>

              {sectionStarted && (
                <div className="text-right">
                  <Timer
                    initialTime={timeRemaining}
                    onTimeUp={completeSection}
                    className="text-2xl font-mono font-bold"
                  />
                  <p className="text-sm text-muted-foreground">Time remaining</p>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!sectionStarted ? (
              <div className="text-center space-y-4">
                <div className="glass rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Ready to start {currentSectionData.name}?</h3>
                  <p className="text-muted-foreground mb-4">
                    You have {currentSectionData.duration} minutes to complete this section.
                  </p>
                  <p className="text-sm text-yellow-500">⚠️ Once started, the timer cannot be paused</p>
                </div>

                <Button onClick={startCurrentSection} size="lg" className="glow">
                  <Play className="mr-2 h-5 w-5" />
                  Start {currentSectionData.name} Section
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="glass rounded-lg p-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Section Active</h3>
                  <p className="text-muted-foreground mb-4">
                    Click below to navigate to the {currentSectionData.name} test interface.
                  </p>
                </div>

                <Button onClick={navigateToSection} size="lg" className="glow">
                  Go to {currentSectionData.name} Test
                </Button>
              </div>
            )}

            {completedSections.length > 0 && (
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">Completed Sections</h4>
                <div className="flex flex-wrap gap-2">
                  {completedSections.map((sectionId) => {
                    const section = testSections.find((s) => s.id === sectionId)
                    return (
                      <Badge key={sectionId} variant="secondary" className="glass-card">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {section?.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  )
}
