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
    prompt: `Your friend Alex has just started a new job at a large company. Alex is feeling overwhelmed because there are many new procedures to learn, and the workload seems very heavy. Alex is also having trouble getting to know the other employees and feels quite isolated.

Alex has asked you for advice on how to handle this situation.

What advice would you give to Alex?`,
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
  const [activeTab, setActiveTab] = useState("prompt")
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
      setActiveTab("prompt")
      setIsPlaying(false)
    } else {
      handleTestComplete()
    }
  }

  const handlePreviousTask = () => {
    if (currentTask > 0) {
      setCurrentTask(currentTask - 1)
      setPhase("completed")
      setActiveTab("prompt")
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
                <Mic className="h-8 w-8 text-blue-400" />
                <div>
                  <CardTitle className="dark:text-white text-gray-500 text-2xl">CELPIP Speaking Test</CardTitle>
                  <CardDescription className="text-gray-400">
                    Task {currentTask + 1} of {speakingTasks.length} • {currentTaskData?.title}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge
                  variant="secondary"
                  className={`${
                    phase === "preparation"
                      ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                      : phase === "speaking"
                        ? "bg-red-500/20 dark:text-red-300 text-red-600 border-red-500/30"
                        : "bg-green-500/20 dark:text-green-300 text-green-700 border-green-500/30"
                  }`}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {phase === "preparation"
                    ? `Prep: ${formatTime(timeRemaining)}`
                    : phase === "speaking"
                      ? `Speaking: ${formatTime(timeRemaining)}`
                      : "Completed"}
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
                Task {currentTask + 1} of {speakingTasks.length}
              </span>
            </div>
            <Progress value={((currentTask + 1) / speakingTasks.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-1024:grid-cols-1">
          {/* Task Information */}
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-300 text-lg">{currentTaskData?.title}</CardTitle>
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
                    <div className="space-y-4">
                      {currentTaskData?.imageUrl && (
                        <div className="bg-blue-400/25 p-4 rounded-lg">
                          <img
                            src={currentTaskData.imageUrl || "/placeholder.svg"}
                            alt="Task image"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="bg-blue-400/25 p-4 rounded-lg">
                        <div className="dark:text-gray-300 text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                          {currentTaskData?.prompt}
                        </div>
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

          {/* Recording Area */}
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-300 text-lg">Recording</CardTitle>
              <CardDescription className="text-gray-400">
                {phase === "preparation"
                  ? "Prepare your response"
                  : phase === "speaking"
                    ? "Record your response"
                    : "Review your recording"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recording Status */}
              <div className="text-center space-y-4">
                <div
                  className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
                    phase === "preparation"
                      ? "bg-yellow-500/20 border-4 border-yellow-500/30"
                      : phase === "speaking"
                        ? isRecording
                          ? "bg-red-500/20 border-4 border-red-500/30 animate-pulse"
                          : "bg-blue-500/20 border-4 border-blue-500/30"
                        : "bg-green-500/20 border-4 border-green-500/30"
                  }`}
                >
                  {phase === "preparation" ? (
                    <Clock className="h-12 w-12 text-yellow-400" />
                  ) : phase === "speaking" ? (
                    isRecording ? (
                      <Mic className="h-12 w-12 text-red-400" />
                    ) : (
                      <MicOff className="h-12 w-12 text-blue-400" />
                    )
                  ) : (
                    <CheckCircle className="h-12 w-12 text-green-400" />
                  )}
                </div>

                <div className="text-2xl font-bold text-white">
                  {phase === "preparation"
                    ? "Preparation Time"
                    : phase === "speaking"
                      ? "Speaking Time"
                      : "Task Completed"}
                </div>

                {timeRemaining > 0 && (
                  <div className="text-4xl font-mono text-blue-400">{formatTime(timeRemaining)}</div>
                )}
              </div>

              {/* Recording Controls */}
              <div className="flex justify-center space-x-4">
                {phase === "preparation" && (
                  <Button onClick={startRecording} className="bg-red-600 hover:bg-red-700 font-mono">
                    <Mic className="h-4 w-4 mr-2" />
                    Start Recording
                  </Button>
                )}

                {phase === "speaking" && !isRecording && (
                  <Button onClick={startRecording} className="bg-red-600 hover:bg-red-700 font-mono">
                    <Mic className="h-4 w-4 mr-2" />
                    Start Recording
                  </Button>
                )}

                {phase === "speaking" && isRecording && (
                  <Button onClick={handleStopRecording} className="bg-gray-600 hover:bg-gray-700 font-mono">
                    <Square className="h-4 w-4 mr-2" />
                    Stop Recording
                  </Button>
                )}

                {phase === "completed" && recordings[currentTaskData?.id] && (
                  <Button
                    onClick={() => playRecording(currentTaskData?.id)}
                    className="bg-blue-600 hover:bg-blue-700 font-mono"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Play Recording
                  </Button>
                )}
              </div>

              {/* Navigation */}
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
                  disabled={phase !== "completed"}
                  className="bg-blue-600 hover:bg-blue-700 font-mono"
                >
                  {currentTask === speakingTasks.length - 1 ? (
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
                <strong className="text-blue-500">Speaking Tips:</strong> Use your preparation time to organize your
                thoughts. Speak clearly and at a natural pace. Don't worry about perfect grammar - focus on
                communicating your ideas effectively. You can record multiple times during the speaking phase if needed.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hidden audio element for playback */}
        <audio
          ref={audioRef}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          style={{ display: "none" }}
        />
      </motion.div>
    </DashboardLayout>
  )
}
