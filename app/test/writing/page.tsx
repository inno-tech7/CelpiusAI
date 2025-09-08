"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenTool, Clock, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, FileText, Target } from "lucide-react"

interface WritingTask {
  id: number
  title: string
  description: string
  information: string
  taskPrompt: string
  instructions: string[]
  timeLimit: number
  wordCountMin: number
  wordCountMax: number
  type: "email" | "survey"
}

const writingTasks: WritingTask[] = [
  {
    id: 1,
    title: "Task 1: Writing an Email",
    description: "Write an email responding to the given situation.",
    timeLimit: 27,
    wordCountMin: 150,
    wordCountMax: 200,
    type: "email",
    backgroundInformation: `You recently moved to a new apartment and discovered that the internet connection is not working properly. The connection is very slow and frequently disconnects, making it difficult for you to work from home.`,
    taskPrompt: `Write an email to your internet service provider to report this problem. In your email, you should do the following things:`,
    instructions: [
      "Explain the problem you are experiencing",
      "Describe how this affects your daily activities",
      "Request specific action to resolve the issue",
      "Suggest a reasonable timeline for the solution",
    ],
  },
  {
    id: 2,
    title: "Task 2: Responding to Survey Questions",
    description: "Express and support your opinion on the given topic.",
    timeLimit: 26,
    wordCountMin: 150,
    wordCountMax: 200,
    type: "survey",
    backgroundInformation: `A local community center is considering implementing a new policy that would require all visitors to show identification before entering the facility. This policy is being proposed to improve security and safety for all users.\n\nSome people believe this policy is necessary for everyone's safety and security. Others think it is unnecessary and may discourage people from using the community center.`,
    taskPrompt: `What is your opinion? Do you think the community center should require identification from all visitors? Choose the option that you prefer. Explain the reasons for your choice. Write about 150-200 words.`,
    instructions: [
      "State your opinion clearly.",
      "Explain the reasons for your choice.",
      "Support your opinion with details and examples.",
    ],
  },
]

export default function WritingTestPage() {
  const [currentTask, setCurrentTask] = useState(0)
  const [responses, setResponses] = useState<{ [key: number]: string }>({})
  const [timeRemaining, setTimeRemaining] = useState(53 * 60) // 53 minutes total
  const [taskTimeRemaining, setTaskTimeRemaining] = useState(writingTasks[0].timeLimit * 60)
  const [testCompleted, setTestCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const timerRef = useRef<NodeJS.Timeout>()
  const taskTimerRef = useRef<NodeJS.Timeout>()

  // Timer effects
  useEffect(() => {
    if (timeRemaining > 0 && !testCompleted) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      handleTestComplete()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timeRemaining, testCompleted])

  useEffect(() => {
    if (taskTimeRemaining > 0 && !testCompleted) {
      taskTimerRef.current = setTimeout(() => {
        setTaskTimeRemaining(taskTimeRemaining - 1)
      }, 1000)
    } else if (taskTimeRemaining === 0) {
      handleNextTask()
    }

    return () => {
      if (taskTimerRef.current) {
        clearTimeout(taskTimerRef.current)
      }
    }
  }, [taskTimeRemaining, testCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const countWords = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
  }

  const handleResponseChange = (taskId: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [taskId]: value,
    }))
  }

  const handleNextTask = () => {
    if (currentTask < writingTasks.length - 1) {
      setCurrentTask(currentTask + 1)
      setTaskTimeRemaining(writingTasks[currentTask + 1].timeLimit * 60)
    } else {
      handleTestComplete()
    }
  }

  const handlePreviousTask = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1)
      setTaskTimeRemaining(writingTasks[currentTask - 1].timeLimit * 60)
    }
  }

  const handleTestComplete = () => {
    setTestCompleted(true)
    setShowResults(true)
  }

  const evaluateResponse = (taskId: number) => {
    const response = responses[taskId] || ""
    const wordCount = countWords(response)
    const task = writingTasks.find((t) => t.id === taskId)

    if (!task) return { score: 0, feedback: [] }

    const feedback = []
    let score = 0

    // Word count evaluation
    if (wordCount >= task.wordCountMin && wordCount <= task.wordCountMax) {
      score += 2
      feedback.push("✓ Appropriate word count")
    } else if (wordCount < task.wordCountMin) {
      feedback.push("⚠ Response is too short")
    } else {
      feedback.push("⚠ Response is too long")
    }

    // Content evaluation (basic)
    if (response.length > 50) {
      score += 2
      feedback.push("✓ Substantial content provided")
    }

    // Structure evaluation (basic)
    const sentences = response.split(/[.!?]+/).filter((s) => s.trim().length > 0)
    if (sentences.length >= 3) {
      score += 2
      feedback.push("✓ Good sentence variety")
    }

    return { score: Math.min(score, 6), feedback }
  }

  const currentTaskData = writingTasks[currentTask]
  const currentResponse = responses[currentTaskData?.id] || ""
  const wordCount = countWords(currentResponse)

  if (showResults) {
    const task1Eval = evaluateResponse(1)
    const task2Eval = evaluateResponse(2)
    const totalScore = task1Eval.score + task2Eval.score
    const percentage = Math.round((totalScore / 12) * 100)
    const clbScore = percentage >= 90 ? 9 : percentage >= 80 ? 8 : percentage >= 70 ? 7 : percentage >= 60 ? 6 : 5

    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-3xl">Writing Test Results</CardTitle>
              <CardDescription className="text-gray-400">Your performance summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-blue-400">CLB {clbScore}</div>
                <div className="text-xl text-gray-300">
                  {totalScore} out of 12 points ({percentage}%)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-700/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Task 1: Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-blue-400">{task1Eval.score}/6</div>
                      <div className="text-sm text-gray-400">Word count: {countWords(responses[1] || "")} words</div>
                      <div className="space-y-1">
                        {task1Eval.feedback.map((item, index) => (
                          <div key={index} className="text-xs text-gray-300">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-700/30 border-slate-600/30">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Task 2: Survey Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-blue-400">{task2Eval.score}/6</div>
                      <div className="text-sm text-gray-400">Word count: {countWords(responses[2] || "")} words</div>
                      <div className="space-y-1">
                        {task2Eval.feedback.map((item, index) => (
                          <div key={index} className="text-xs text-gray-300">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="bg-blue-600 hover:bg-blue-700 font-mono"
                >
                  Return to Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-slate-600 text-white hover:bg-slate-700 font-mono"
                >
                  Retake Test
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
      <div className="card-outline text-white font-sans">
        <header className="flex justify-between items-center p-4 bg-blue-950 max-435:flex-col max-435:items-start rounded-t-[23px]">
          <h1 className="text-lg font-semibold text-blue-400 font-mono max-w-[70%] max-435:pb-[2rem]">Practice Test A - Writing {currentTaskData.title}</h1>
          <div className="flex items-center space-x-4 max-435:space-x-32">
            <span className="text-sm text-slate-400">Time remaining: <span className="font-bold text-red-500">{formatTime(taskTimeRemaining)}</span></span>
            <Button onClick={handleNextTask} disabled={wordCount < currentTaskData?.wordCountMin} className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-6 font-mono">
              {currentTask === writingTasks.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </header>

        <main className="grid grid-cols-3 gap-6 max-1024:grid-cols-1">
          {/* Left Column */}
          <div className="col-span-1 border-r border-slate-700 flex flex-col max-1024:border-r-0 p-4 sm:p-6 md:p-8">
            <div className="flex-grow">
              <div className="flex items-center bg-blue-900/60 p-3 rounded-md mb-4">
                <AlertCircle className="text-blue-400 mr-3" />
                <p className="text-blue-400 font-semibold font-mono">Read the following information.</p>
              </div>
              <ScrollArea className="h-[calc(100vh-250px)] max-1024:h-[calc(35vh-250px)]">
                <div className="text-slate-300 leading-relaxed whitespace-pre-line p-4 bg-slate-800/50 rounded-md">
                  {currentTaskData.backgroundInformation}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2 flex flex-col p-4 sm:p-6 md:p-8">
            <div className="flex-grow">
              <div className="flex items-center bg-blue-900/60 p-3 rounded-md mb-4">
                <AlertCircle className="text-blue-400 mr-3" />
                <p className="text-blue-400 font-semibold font-mono whitespace-pre-line">{currentTaskData.taskPrompt}</p>
              </div>
              <ul className="list-disc list-outside text-slate-300 space-y-2 mb-4 pl-6">
                {currentTaskData.instructions.map((item, index) => (
                  <li key={index} className="pl-2">
                    {item}
                  </li>
                ))}
              </ul>
              <Textarea
                placeholder={
                  currentTaskData?.type === "email"
                    ? "Subject: Internet Connection Issues\n\nDear Customer Service Team,\n\nI am writing to report..."
                    : "In my opinion, I believe that..."
                }
                value={currentResponse}
                onChange={(e) => handleResponseChange(currentTaskData?.id, e.target.value)}
                className="min-h-[300px] bg-slate-800/50 text-gray-300 resize-none border-slate-700"
              />
              <div className="text-sm text-slate-400 mt-2">Word Count: {wordCount}</div>
            </div>
          </div>
        </main>

        <footer className="flex justify-between items-center p-4 bg-blue-950 rounded-b-[23px]">
          <div></div>
          <Button onClick={handlePreviousTask} disabled={currentTask === 0} className="bg-red-700 text-white hover:bg-red-800 font-mono">
            Back
          </Button>
        </footer>
      </div>
    </DashboardLayout>
  )
}
