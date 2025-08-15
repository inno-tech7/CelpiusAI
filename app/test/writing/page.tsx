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
  prompt: string
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
    prompt: `You recently moved to a new apartment and discovered that the internet connection is not working properly. The connection is very slow and frequently disconnects, making it difficult for you to work from home.

Write an email to your internet service provider to report this problem.

In your email, you should:
• Explain the problem you are experiencing
• Describe how this affects your daily activities
• Request specific action to resolve the issue
• Suggest a reasonable timeline for the solution`,
    instructions: [
      "Write an email of 150-200 words",
      "Use appropriate email format and tone",
      "Address all points mentioned in the prompt",
      "Use proper grammar and vocabulary",
      "Organize your ideas clearly and logically",
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
    prompt: `A local community center is considering implementing a new policy that would require all visitors to show identification before entering the facility. This policy is being proposed to improve security and safety for all users.

Some people believe this policy is necessary for everyone's safety and security. Others think it is unnecessary and may discourage people from using the community center.

What is your opinion? Do you think the community center should require identification from all visitors?

Choose the option that you prefer. Explain the reasons for your choice. Write about 150-200 words.`,
    instructions: [
      "Write 150-200 words expressing your opinion",
      "Choose one side of the argument clearly",
      "Provide specific reasons and examples to support your position",
      "Consider the opposing viewpoint briefly",
      "Use appropriate connecting words and phrases",
      "Organize your response with clear introduction, body, and conclusion",
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
  const [activeTab, setActiveTab] = useState("prompt")

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
      setActiveTab("prompt")
    } else {
      handleTestComplete()
    }
  }

  const handlePreviousTask = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1)
      setTaskTimeRemaining(writingTasks[currentTask - 1].timeLimit * 60)
      setActiveTab("prompt")
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <PenTool className="h-8 w-8 text-blue-400" />
                <div>
                  <CardTitle className="dark:text-white text-gray-500 text-2xl max-435:w-[70%]">CELPIP Writing Test</CardTitle>
                  <CardDescription className="text-gray-400">
                    Task {currentTask + 1} of {writingTasks.length} • {currentTaskData?.title}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-red-500/20 dark:text-red-300 text-red-600 border-red-500/30">
                  <Clock className="h-4 w-4 mr-2" />
                  Task: {formatTime(taskTimeRemaining)}
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 dark:text-blue-300 text-blue-700 border-blue-500/30">
                  <Clock className="h-4 w-4 mr-2" />
                  Total: {formatTime(timeRemaining)}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Progress */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Test Progress</span>
              <span className="text-sm dark:text-gray-400 text-gray-700">
                Task {currentTask + 1} of {writingTasks.length}
              </span>
            </div>
            <Progress value={((currentTask + 1) / writingTasks.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-1024:grid-cols-1">
          {/* Task Information */}
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-300 text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                {currentTaskData?.title}
              </CardTitle>
              <CardDescription className="text-gray-400">{currentTaskData?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 dark:bg-slate-700/60 bg-blue-300">
                  <TabsTrigger value="prompt" className="data-[state=active]:bg-blue-700/50">
                    Prompt
                  </TabsTrigger>
                  <TabsTrigger value="instructions" className="data-[state=active]:bg-blue-700/50">
                    Instructions
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="prompt" className="mt-4">
                  <ScrollArea className="h-[400px] w-full">
                    <div className="bg-blue-400/25 p-4 rounded-lg">
                      <div className="dark:text-gray-300 text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                        {currentTaskData?.prompt}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="instructions" className="mt-4">
                  <ScrollArea className="h-[400px] w-full">
                    <div className="bg-blue-400/25 p-4 rounded-lg">
                      <div className="space-y-3">
                        {currentTaskData?.instructions.map((instruction, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm dark:text-gray-300 text-gray-700">{instruction}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Writing Area */}
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-300 text-lg">Your Response</CardTitle>
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="outline"
                    className={`${
                      wordCount >= currentTaskData?.wordCountMin && wordCount <= currentTaskData?.wordCountMax
                        ? "border-green-500/50 text-green-300"
                        : wordCount < currentTaskData?.wordCountMin
                          ? "border-yellow-500/50 dark:text-yellow-300 text-yellow-600"
                          : "border-red-500/50 text-red-300"
                    }`}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    {wordCount} / {currentTaskData?.wordCountMin}-{currentTaskData?.wordCountMax} words
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={
                  currentTaskData?.type === "email"
                    ? "Subject: Internet Connection Issues\n\nDear Customer Service Team,\n\nI am writing to report..."
                    : "In my opinion, I believe that..."
                }
                value={currentResponse}
                onChange={(e) => handleResponseChange(currentTaskData?.id, e.target.value)}
                className="min-h-[400px] bg-blue-400/25 text-gray-300 resize-none"
              />

              <div className="flex items-center justify-between text-sm dark:text-gray-400 text-gray-600">
                <div className="flex items-center space-x-4">
                  <span>Characters: {currentResponse.length}</span>
                  <span>Words: {wordCount}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Time remaining: {formatTime(taskTimeRemaining)}</span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePreviousTask}
                  disabled={currentTask === 0}
                  className="border-slate-600 dark:text-white text-gray-500 hover:bg-blue-300 bg-transparent font-mono"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Task
                </Button>

                <Button
                  onClick={handleNextTask}
                  disabled={wordCount < currentTaskData?.wordCountMin}
                  className="bg-blue-600 hover:bg-blue-700 font-mono"
                >
                  {currentTask === writingTasks.length - 1 ? (
                    <>
                      Complete Test
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next Task
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div className="text-sm text-gray-400">
                <strong className="text-blue-500">Writing Tips:</strong> Plan your response before writing. Use appropriate
                tone and format for each task type. Check your word count regularly and ensure you meet the minimum
                requirement before proceeding to the next task.
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  )
}
