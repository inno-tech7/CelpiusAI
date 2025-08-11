"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Mic,
  PenTool,
  Headphones,
  Play,
  Calendar,
  Award,
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function DashboardPage() {
  const { user } = useAuth()

  const recentTests = [
    {
      id: 1,
      type: "Complete Test",
      score: 8.5,
      date: "2024-01-15",
      sections: { listening: 9, reading: 8, writing: 8, speaking: 9 },
    },
    { id: 2, type: "Writing Practice", score: 7.5, date: "2024-01-12", sections: { writing: 7.5 } },
    { id: 3, type: "Speaking Practice", score: 8.0, date: "2024-01-10", sections: { speaking: 8 } },
  ]

  const weakAreas = [
    { area: "Past Tense Usage", frequency: 15, improvement: "+20%" },
    { area: "Pronunciation /th/", frequency: 8, improvement: "+15%" },
    { area: "Essay Structure", frequency: 6, improvement: "+10%" },
  ]

  const recommendations = [
    "Practice more complex sentence structures in writing",
    "Focus on pronunciation drills for /th/ sounds",
    "Review past tense irregular verbs",
    "Work on speaking fluency with timed exercises",
  ]

  return (
    <DashboardLayout>
      <motion.div initial="initial" animate="animate" variants={staggerChildren} className="space-y-8">

        <motion.div variants={fadeInUp}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.firstName || "Student"} !</h1>
              <p className="text-muted-foreground mt-2">Continue your CELPIP preparation journey</p>
            </div>
            <Badge variant="secondary" className="glass-card">
              <Award className="h-4 md:w-4 max-435:w-[3rem] mr-2" />
              Target: CLB {user?.targetCLB || "9"}
            </Badge>
          </div>
        </motion.div>


        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current CLB</p>
                  <p className="text-2xl font-bold">8.5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Study Time</p>
                  <p className="text-2xl font-bold">24h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tests Taken</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Improvement</p>
                  <p className="text-2xl font-bold">+1.2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>


        <motion.div variants={fadeInUp}>
          <Card className="glass-dashboard">

            <Image
                src="/section-images/flare (horizontal).png"
                alt="flare"
                width={500} 
                height={3500} 
                quality={100} 
                className="absolute top-[-21%] xl:left-[33.55%] lg:left-[25.55%] max-820:top-[-11%] max-820:left-[18.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none scale-[1.8] max-820:scale-[1.4] max-768:top-[-10.7%] max-435:top-[-7.2%] max-435:left-[-14.45%] max-435:scale-[0.7]"
            />

            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Choose your practice mode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Link href="/test/complete" className="group">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 glass-card bg-transparent glow-before glow-after"
                  >
                    <Play className="h-6 w-6" />
                    <span className="font-mono text-sm">Complete Test</span>
                  </Button>
                </Link>

                <Link href="/test/listening" className="group">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 glass-card bg-transparent glow-before glow-after"
                  >
                    <Headphones className="h-6 w-6" />
                    <span className="font-mono text-sm">Listening</span>
                  </Button>
                </Link>

                <Link href="/test/reading" className="group">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 glass-card bg-transparent glow-before glow-after"
                  >
                    <BookOpen className="h-6 w-6" />
                    <span className="font-mono text-sm">Reading</span>
                  </Button>
                </Link>

                <Link href="/test/writing" className="group">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 glass-card bg-transparent glow-before glow-after"
                  >
                    <PenTool className="h-6 w-6" />
                    <span className="font-mono text-sm">Writing</span>
                  </Button>
                </Link>

                <Link href="/test/speaking" className="group">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center space-y-2 glass-card bg-transparent glow-before glow-after"
                  >
                    <Mic className="h-6 w-6" />
                    <span className="font-mono text-sm">Speaking</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          

          <motion.div variants={fadeInUp}>
            <Card className="glass-dashboard">

              <Image
                src="/section-images/flare (horizontal).png"
                alt="flare"
                width={500} 
                height={3500} 
                quality={100} 
                className="absolute top-[-10.2%] xl:left-[9.55%] lg:left-[-5.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none xl:scale-[1.15] lg:scale-[0.9] max-820:top-[-10.5%] max-820:left-[18.55%] max-820:scale-[1.4] max-435:top-[-10.4%] max-435:left-[-14.45%] max-435:scale-[0.7] max-415:top-[-10%] max-415:left-[-18%]"
              />

              <CardHeader>
                <CardTitle>Recent Tests</CardTitle>
                <CardDescription>Your latest practice sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 glass rounded-lg">
                    <div>
                      <p className="font-medium">{test.type}</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {test.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">CLB {test.score}</p>
                      <div className="flex space-x-1">
                        {Object.entries(test.sections).map(([section, score]) => (
                          <Badge key={section} variant="secondary" className="text-xs">
                            {section.charAt(0).toUpperCase()}: {score}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>


          <motion.div variants={fadeInUp}>
            <Card className="glass-dashboard">

              <Image
                src="/section-images/flare (horizontal).png"
                alt="flare"
                width={500} 
                height={3500} 
                quality={100} 
                className="absolute top-[-13.2%] xl:left-[9.55%] lg:left-[-5.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none xl:scale-[1.15] lg:scale-[0.9] max-820:top-[-13.5%] max-820:left-[18.55%]  max-820:scale-[1.4] max-435:top-[-13.4%] max-435:left-[-14.45%] max-435:scale-[0.7] max-415:left-[-19%]"
              />

              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
                <CardDescription>Your improvement across all sections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-mono">Listening</span>
                      <span>CLB 9.0</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-mono">Reading</span>
                      <span>CLB 8.5</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-mono">Writing</span>
                      <span>CLB 8.0</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-mono">Speaking</span>
                      <span>CLB 8.5</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <motion.div variants={fadeInUp}>
            <Card className="glass-dashboard">

              <Image
                src="/section-images/flare (horizontal).png"
                alt="flare"
                width={500} 
                height={3500} 
                quality={100} 
                className="absolute top-[-11.5%] xl:left-[7.55%] lg:left-[-7.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none xl:scale-[1.15] lg:scale-[0.9] max-820:top-[-11.5%] max-820:left-[18.55%]  max-820:scale-[1.4] max-435:top-[-11.4%] max-435:left-[-14.45%] max-435:scale-[0.7] max-415:top-[-11.5%] max-415:left-[-19%]"
              />

              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>AI-identified focus areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {weakAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
                    <div>
                      <p className="font-medium">{area.area}</p>
                      <p className="text-sm text-muted-foreground">{area.frequency} occurrences</p>
                    </div>
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      {area.improvement}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>


          <motion.div variants={fadeInUp}>
            <Card className="glass-dashboard">

              <Image
                src="/section-images/flare (horizontal).png"
                alt="flare"
                width={500} 
                height={3500} 
                quality={100} 
                className="absolute xl:top-[-12.5%] lg:top-[-12.5%] xl:left-[7.55%] lg:left-[-1%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none xl:scale-[1.15] lg:scale-[0.9] max-820:top-[-12.5%] max-820:left-[18.55%]  max-820:scale-[1.4] max-435:top-[-10.5%] max-435:left-[-14.45%] max-435:scale-[0.7] max-415:left-[-19%]"
              />

              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Personalized study suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 glass rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
