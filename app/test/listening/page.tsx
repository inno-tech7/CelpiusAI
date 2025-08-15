"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Play, Pause, Volume2, Clock, Headphones, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface ListeningPart {
  id: number
  title: string
  description: string
  audioUrl: string
  duration: number
  questions: Question[]
}

const listeningParts: ListeningPart[] = [
  {
    id: 1,
    title: "Part 1: Problem Solving",
    description: "Listen to a conversation about a workplace problem and answer the questions.",
    audioUrl: "/audio/listening-part1.mp3",
    duration: 180,
    questions: [
      {
        id: 1,
        question: "What is the main problem discussed in the conversation?",
        options: [
          "The computer system is not working properly",
          "There are not enough staff members available",
          "The deadline for the project has been moved up",
          "The client has changed their requirements",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What solution does the woman suggest?",
        options: [
          "Hiring temporary staff",
          "Extending the deadline",
          "Working overtime",
          "Contacting the IT department",
        ],
        correctAnswer: 3,
      },
      {
        id: 3,
        question: "How does the man respond to the suggestion?",
        options: [
          "He disagrees completely",
          "He thinks it's a good idea",
          "He suggests an alternative",
          "He needs time to consider it",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Part 2: Daily Life Conversation",
    description: "Listen to a conversation between two friends planning a weekend activity.",
    audioUrl: "/audio/listening-part2.mp3",
    duration: 200,
    questions: [
      {
        id: 4,
        question: "Where do the speakers plan to meet?",
        options: ["At the movie theater", "At Sarah's house", "At the shopping mall", "At the coffee shop"],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "What time do they agree to meet?",
        options: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"],
        correctAnswer: 2,
      },
      {
        id: 6,
        question: "What does Tom need to do before meeting?",
        options: ["Buy tickets online", "Pick up his sister", "Finish his homework", "Go to the bank"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Part 3: Information",
    description: "Listen to an announcement about library services and answer the questions.",
    audioUrl: "/audio/listening-part3.mp3",
    duration: 150,
    questions: [
      {
        id: 7,
        question: "What is the main purpose of this announcement?",
        options: [
          "To inform about new library hours",
          "To announce a book sale",
          "To explain new borrowing policies",
          "To promote library programs",
        ],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: "When will the new hours take effect?",
        options: ["Immediately", "Next Monday", "Next month", "After the holidays"],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: "What should students do if they have questions?",
        options: ["Call the main office", "Visit the information desk", "Send an email", "Check the website"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 4,
    title: "Part 4: News Item",
    description: "Listen to a news report about a local community event.",
    audioUrl: "/audio/listening-part4.mp3",
    duration: 220,
    questions: [
      {
        id: 10,
        question: "What type of event is being reported?",
        options: ["A charity fundraiser", "A music festival", "A sports competition", "A cultural celebration"],
        correctAnswer: 0,
      },
      {
        id: 11,
        question: "How much money was raised?",
        options: ["$15,000", "$25,000", "$35,000", "$45,000"],
        correctAnswer: 2,
      },
      {
        id: 12,
        question: "What will the money be used for?",
        options: [
          "Building a new playground",
          "Renovating the community center",
          "Supporting local families",
          "Buying new equipment",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 5,
    title: "Part 5: Discussion",
    description: "Listen to a discussion between students about study methods.",
    audioUrl: "/audio/listening-part5.mp3",
    duration: 240,
    questions: [
      {
        id: 13,
        question: "What study method does Maria prefer?",
        options: [
          "Group study sessions",
          "Individual study with flashcards",
          "Online video tutorials",
          "Reading textbooks quietly",
        ],
        correctAnswer: 0,
      },
      {
        id: 14,
        question: "Why doesn't John like group study?",
        options: [
          "It's too noisy",
          "He gets distracted easily",
          "He prefers to work alone",
          "The schedule doesn't work for him",
        ],
        correctAnswer: 1,
      },
      {
        id: 15,
        question: "What do both speakers agree on?",
        options: [
          "The importance of taking breaks",
          "The need for a quiet environment",
          "The value of practice tests",
          "The benefit of study groups",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 6,
    title: "Part 6: Viewpoints",
    description: "Listen to two people discussing different opinions about remote work.",
    audioUrl: "/audio/listening-part6.mp3",
    duration: 260,
    questions: [
      {
        id: 16,
        question: "What is the woman's main argument for remote work?",
        options: [
          "It saves money on transportation",
          "It provides better work-life balance",
          "It increases productivity",
          "It reduces office expenses",
        ],
        correctAnswer: 1,
      },
      {
        id: 17,
        question: "What concern does the man express about remote work?",
        options: [
          "Difficulty in team collaboration",
          "Lack of proper equipment",
          "Reduced job security",
          "Limited career advancement",
        ],
        correctAnswer: 0,
      },
      {
        id: 18,
        question: "What solution do they both consider reasonable?",
        options: ["Fully remote work", "Traditional office work", "Hybrid work arrangement", "Flexible working hours"],
        correctAnswer: 2,
      },
    ],
  },
]

export default function ListeningTestPage() {
  const [currentPart, setCurrentPart] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(47 * 60) // 47 minutes in seconds
  const [audioProgress, setAudioProgress] = useState(0)
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const timerRef = useRef<NodeJS.Timeout>()

  // Timer effect
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
        setHasPlayedAudio(true)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleNextQuestion = () => {
    const currentPartData = listeningParts[currentPart]
    if (currentQuestion < currentPartData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentPart < listeningParts.length - 1) {
      setCurrentPart(currentPart + 1)
      setCurrentQuestion(0)
      setHasPlayedAudio(false)
      setAudioProgress(0)
      setIsPlaying(false)
    } else {
      handleTestComplete()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (currentPart > 0) {
      setCurrentPart(currentPart - 1)
      const prevPartData = listeningParts[currentPart - 1]
      setCurrentQuestion(prevPartData.questions.length - 1)
    }
  }

  const handleTestComplete = () => {
    setTestCompleted(true)
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    listeningParts.forEach((part) => {
      part.questions.forEach((question) => {
        if (answers[question.id] === question.correctAnswer) {
          correct++
        }
      })
    })
    return correct
  }

  const totalQuestions = listeningParts.reduce((total, part) => total + part.questions.length, 0)
  const currentPartData = listeningParts[currentPart]
  const currentQuestionData = currentPartData?.questions[currentQuestion]

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / totalQuestions) * 100)
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
              <CardTitle className="text-white text-3xl">Listening Test Results</CardTitle>
              <CardDescription className="text-gray-400">Your performance summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-blue-400">CLB {clbScore}</div>
                <div className="text-xl text-gray-300">
                  {score} out of {totalQuestions} correct ({percentage}%)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                  <div className="text-sm text-gray-400">Correct Answers</div>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-400">{totalQuestions - score}</div>
                  <div className="text-sm text-gray-400">Incorrect Answers</div>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">{percentage}%</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
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
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Headphones className="h-8 w-8 text-blue-400" />
                <div>
                  <CardTitle className="dark:text-white text-gray-500 text-2xl">CELPIP Listening Test</CardTitle>
                  <CardDescription className="text-gray-400">
                    Part {currentPart + 1} of {listeningParts.length} • Question {currentQuestion + 1} of{" "}
                    {currentPartData?.questions.length}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-blue-500/20 dark:text-blue-300 text-blue-800 border-blue-500/30">
                  <Clock className="h-4 w-4 mr-2" />
                  {formatTime(timeRemaining)}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Progress */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Overall Progress</span>
              <span className="text-sm dark:text-gray-400 text-gray-700">
                {currentPart * listeningParts[0].questions.length + currentQuestion + 1} / {totalQuestions}
              </span>
            </div>
            <Progress
              value={((currentPart * listeningParts[0].questions.length + currentQuestion + 1) / totalQuestions) * 100}
              className="h-2"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-1024:grid-cols-1">
          {/* Audio Player */}
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-300 text-lg">{currentPartData?.title}</CardTitle>
              <CardDescription className="text-gray-400">{currentPartData?.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-400/25 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Button onClick={handlePlayAudio} size="lg" className="bg-blue-600 hover:bg-blue-700 font-mono">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Volume2 className="h-6 w-6 dark:text-gray-400 text-gray-500" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm dark:text-gray-400 text-gray-500">
                    <span>Audio Progress</span>
                    <span>{Math.round(audioProgress)}%</span>
                  </div>
                  <Progress value={audioProgress} className="h-2" />
                </div>

                {!hasPlayedAudio && (
                  <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 dark:text-yellow-300 text-yellow-600" />
                      <span className="text-sm dark:text-yellow-300 text-yellow-600">
                        You must play the audio before answering questions
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <audio
                ref={audioRef}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={(e) => {
                  const audio = e.target as HTMLAudioElement
                  const progress = (audio.currentTime / audio.duration) * 100
                  setAudioProgress(progress)
                }}
                onEnded={() => {
                  setIsPlaying(false)
                  setAudioProgress(100)
                }}
              >
                <source src={currentPartData?.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </CardContent>
          </Card>

          {/* Question */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-300 text-lg">Question {currentQuestion + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="dark:text-gray-300 text-gray-400 text-lg leading-relaxed">{currentQuestionData?.question}</div>

                <RadioGroup
                  value={answers[currentQuestionData?.id]?.toString()}
                  onValueChange={(value) => handleAnswerChange(currentQuestionData?.id, Number.parseInt(value))}
                  disabled={!hasPlayedAudio}
                  className="space-y-4"
                >
                  {currentQuestionData?.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="dark:text-gray-300 text-gray-100 cursor-pointer flex-1">
                        {String.fromCharCode(65 + index)}. {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentPart === 0 && currentQuestion === 0}
                    className="border-slate-600 dark:text-white text-gray-500 hover:bg-blue-300 bg-transparent font-mono"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={handleNextQuestion}
                    disabled={!hasPlayedAudio || answers[currentQuestionData?.id] === undefined}
                    className="bg-blue-600 hover:bg-blue-700 font-mono"
                  >
                    {currentPart === listeningParts.length - 1 &&
                    currentQuestion === currentPartData?.questions.length - 1 ? (
                      <>
                        Complete Test
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div className="text-sm dark:text-gray-400 text-gray-600">
                <strong className="text-blue-500">Instructions:</strong> Listen to each audio clip carefully. You can play
                the audio multiple times, but in the real test, you may only hear it once. Answer all questions before
                moving to the next part.
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  )
}
