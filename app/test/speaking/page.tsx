"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, Clock, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Play, Square } from "lucide-react"

interface SpeakingTask {
  id: number
  title: string
  description: string
  prompt: string
  instructions: string[]
  preparationTime: number
  speakingTime: number
  imageUrl?: string
}

const speakingTasks: SpeakingTask[] = [
  {
    id: 1,
    title: "Task 1: Giving Advice",
    description: "Give advice to someone about a situation.",
    preparationTime: 30,
    speakingTime: 90,
    prompt: `A friend is looking for a summer job. Advise him about different ways he can find work for the summer.`,
    instructions: [
      "You have 30 seconds to prepare your response",
      "You have 90 seconds to speak",
      "Give specific and practical advice",
      "Explain why your advice would be helpful",
      "Use examples if possible",
    ],
  },
  {
    id: 2,
    title: "Task 2: Talking about a Personal Experience",
    description: "Describe a personal experience related to the topic.",
    preparationTime: 30,
    speakingTime: 60,
    prompt: `Talk about a time when you had to learn something new that was challenging for you.

You should say:
• What you had to learn
• Why it was challenging
• How you overcame the difficulties
• How you felt when you finally mastered it`,
    instructions: [
      "You have 30 seconds to prepare your response",
      "You have 60 seconds to speak",
      "Describe a specific personal experience",
      "Include details about the challenges you faced",
      "Explain how you overcame the difficulties",
    ],
  },
  {
    id: 3,
    title: "Task 3: Describing a Scene",
    description: "Describe what you see in the image in detail.",
    preparationTime: 30,
    speakingTime: 60,
    imageUrl: "/busy-office.png",
    prompt: `Look at the image and describe what you see.

Describe the scene in detail. You might want to talk about:
• What the people are doing
• What the setting looks like
• What objects you can see
• What might be happening in this situation`,
    instructions: [
      "You have 30 seconds to prepare your response",
      "You have 60 seconds to speak",
      "Describe what you see in the image",
      "Include specific details about people, objects, and activities",
      "Use descriptive language",
    ],
  },
  {
    id: 4,
    title: "Task 4: Making Predictions",
    description: "Make predictions about what might happen next.",
    preparationTime: 30,
    speakingTime: 60,
    prompt: `Look at the situation described below and make predictions about what might happen next.

Situation: A small local bookstore has been struggling to compete with large online retailers. The owner has noticed that fewer customers are visiting the store, and sales have been declining for the past two years. However, the bookstore is located in a busy neighborhood with many cafes and restaurants, and there's a university nearby.

What do you think might happen to this bookstore in the future? What could the owner do to improve the situation?`,
    instructions: [
      "You have 30 seconds to prepare your response",
      "You have 60 seconds to speak",
      "Make realistic predictions about the future",
      "Suggest possible solutions or actions",
      "Explain your reasoning",
    ],
  },
  {
    id: 5,
    title: "Task 5: Comparing and Persuading",
    description: "Compare two options and persuade someone to choose one.",
    preparationTime: 60,
    speakingTime: 60,
    prompt: `Your company is planning a team-building event and has asked employees to choose between two options:

Option A: A weekend camping trip in the mountains
- Outdoor activities like hiking and campfire cooking
- Team challenges and group games
- Accommodation in tents
- Cost: $200 per person

Option B: A day at a luxury resort and spa
- Relaxation activities like spa treatments and pool time
- Fine dining experience
- Professional team-building workshops
- Cost: $300 per person

Which option do you think would be better for your team? Convince your manager to choose this option.`,
    instructions: [
      "You have 60 seconds to prepare your response",
      "You have 60 seconds to speak",
      "Compare both options fairly",
      "Choose one option and persuade others",
      "Give specific reasons for your choice",
    ],
  },
  {
    id: 6,
    title: "Task 6: Dealing with a Difficult Situation",
    description: "Explain how you would handle a challenging situation.",
    preparationTime: 60,
    speakingTime: 60,
    prompt: `You are organizing a surprise birthday party for your best friend. You have invited 20 people and booked a private room at a restaurant for Saturday evening. However, on Friday afternoon, the restaurant calls to inform you that they have to cancel your reservation due to a kitchen emergency.

The party is supposed to be tomorrow evening, and you have already confirmed with all the guests. Your friend doesn't know about the party yet.

What would you do in this situation? Explain your solution step by step.`,
    instructions: [
      "You have 60 seconds to prepare your response",
      "You have 60 seconds to speak",
      "Explain your solution step by step",
      "Consider all the people involved",
      "Show problem-solving skills",
    ],
  },
  {
    id: 7,
    title: "Task 7: Expressing Opinions",
    description: "Express and support your opinion on a topic.",
    preparationTime: 30,
    speakingTime: 90,
    prompt: `Some people believe that social media has had a mostly positive impact on society, while others think it has been mostly negative.

What is your opinion? Do you think social media has had a positive or negative impact on society?

Support your opinion with specific reasons and examples.`,
    instructions: [
      "You have 30 seconds to prepare your response",
      "You have 90 seconds to speak",
      "State your opinion clearly",
      "Give specific reasons and examples",
      "Consider different aspects of the topic",
    ],
  },
  {
    id: 8,
    title: "Task 8: Describing an Unusual Situation",
    description: "Describe an unusual or interesting situation.",
    preparationTime: 30,
    speakingTime: 60,
    prompt: `Imagine you wake up one morning and discover that you can understand and communicate with animals. This ability lasts for only one day.

Describe what you would do with this special ability. What animals would you want to talk to, and what would you ask them?

Be creative and explain your choices.`,
    instructions: [
      "You have 30 seconds to prepare your response",
      "You have 60 seconds to speak",
      "Be creative and imaginative",
      "Explain your choices clearly",
      "Make your response interesting and engaging",
    ],
  },
]

type Phase = "preparation" | "speaking" | "completed"

export default function SpeakingTestPage() {
  const [currentTask, setCurrentTask] = useState(0)
  const [phase, setPhase] = useState<Phase>("preparation")
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState<{ [key: number]: Blob }>({})
  const [testCompleted, setTestCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout>()
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTaskData = speakingTasks[currentTask]

  // Initialize preparation phase
  useEffect(() => {
    if (currentTaskData && phase === "preparation") {
      setTimeRemaining(currentTaskData.preparationTime)
    }
  }, [currentTask, currentTaskData, phase])

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      if (phase === "preparation") {
        setPhase("speaking")
        setTimeRemaining(currentTaskData.speakingTime)
      } else if (phase === "speaking") {
        handleStopRecording()
        setPhase("completed")
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timeRemaining, phase, currentTaskData])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        setRecordings((prev) => ({
          ...prev,
          [currentTaskData.id]: audioBlob,
        }))
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playRecording = (taskId: number) => {
    const recording = recordings[taskId]
    if (recording && audioRef.current) {
      const audioUrl = URL.createObjectURL(recording)
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleNextTask = () => {
    if (currentTask < speakingTasks.length - 1) {
      setCurrentTask(currentTask + 1)
      setPhase("preparation")
      setIsPlaying(false)
    } else {
      handleTestComplete()
    }
  }

  const handlePreviousTask = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1)
      setPhase("completed")
      setIsPlaying(false)
    }
  }

  const handleTestComplete = () => {
    setTestCompleted(true)
    setShowResults(true)
  }

  if (showResults) {
    const completedTasks = Object.keys(recordings).length
    const percentage = Math.round((completedTasks / speakingTasks.length) * 100)
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
              <CardTitle className="text-white text-3xl">Speaking Test Results</CardTitle>
              <CardDescription className="text-gray-400">Your performance summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-blue-400">CLB {clbScore}</div>
                <div className="text-xl text-gray-300">
                  {completedTasks} out of {speakingTasks.length} tasks completed ({percentage}%)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">{completedTasks}</div>
                  <div className="text-sm text-gray-400">Tasks Completed</div>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">{speakingTasks.length - completedTasks}</div>
                  <div className="text-sm text-gray-400">Tasks Remaining</div>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-400">{percentage}%</div>
                  <div className="text-sm text-gray-400">Completion Rate</div>
                </div>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-3">AI Feedback (Simulated)</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>• Your responses showed good fluency and natural speech patterns</p>
                  <p>• Consider working on pronunciation of specific sounds</p>
                  <p>• Your ideas were well-organized and clearly expressed</p>
                  <p>• Try to use more varied vocabulary in future responses</p>
                </div>
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
      <div className="card-outline dark:bg-slate-900 text-slate-900 dark:text-white  font-sans h-full flex flex-col">
        <header className="flex justify-between items-center p-4 bg-blue-950/0 max-435:flex-col max-435:items-start rounded-t-[23px] border-[1px] border-b-[#3b4687]">
          <h1 className="text-lg font-semibold text-blue-400 font-mono max-w-[50%] max-435:pb-[2rem] max-435:max-w-[90%]">Practice Test A - {currentTaskData.title}</h1>
          <div className="flex items-center space-x-4 max-435:space-x-14">

          
            <span className="text-sm text-slate-500 dark:text-slate-400 max-820:flex max-820:flex-col">
              Preparation: <span className="font-bold text-slate-700 dark:text-slate-200">{currentTaskData.preparationTime} seconds</span>
            </span>
          

            <span className="text-sm text-slate-500 dark:text-slate-400 max-820:flex max-820:flex-col">
              Recording: <span className="font-bold text-slate-700 dark:text-slate-200">{currentTaskData.speakingTime} seconds</span>
            </span>
            <Button onClick={handleNextTask} disabled={phase !== 'completed'} className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-6 font-mono">
              {currentTask === speakingTasks.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </header>

        <main className="flex-grow flex flex-col justify-center items-center pt-6">
          <div className="w-full max-w-[96%]">
            <div className="flex items-start bg-blue-100 dark:bg-blue-900/0 p-3 rounded-md mb-8">
              <AlertCircle className="text-blue-500 dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />
              <p className="text-blue-800 dark:text-blue-300 font-semibold">{currentTaskData.prompt}</p>
            </div>

            <div className="card-outline p-8 rounded-lg flex items-center justify-center space-x-8 w-full max-w-md mx-auto my-8">
              <Clock className="h-12 w-12 text-slate-500 dark:text-slate-400" />
              <div className="text-center">
                <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 capitalize">{phase} Time</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 font-mono">{formatTime(timeRemaining)}</p>
              </div>
            </div>

            <p className="text-left text-sm text-slate-500 dark:text-slate-400 mt-8 mb-[12.5rem]">
              *NOTE: This sample test is not recording your response.
            </p>
          </div>
        </main>

        <footer className="flex justify-between items-center p-4 bg-blue-950/0 rounded-b-[23px] border-[1px] border-t-[#3b4687]">
            <div></div>
            <Button onClick={handlePreviousTask} disabled={currentTask === 0} className="bg-red-700 text-white hover:bg-red-800 font-mono">
              Back
            </Button>
        </footer>
        
        <audio
          ref={audioRef}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          style={{ display: "none" }}
        />
      </div>
    </DashboardLayout>
  )
}
