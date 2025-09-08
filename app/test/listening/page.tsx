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
import { Slider } from "@/components/ui/slider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Play, Pause, Volume2, Clock, Headphones, CheckCircle, XCircle, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
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
    title: "Listen to the question. You will hear it only once.",
    description: "",
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
        explanation: "The conversation centers around a malfunctioning computer system, which is the primary issue being discussed."
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
        explanation: "The woman suggests that the IT department should be contacted to resolve the computer system issue."
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
        explanation: "The man agrees with the woman's suggestion, stating that it is a good idea to involve the IT department."
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
        explanation: "The conversation explicitly mentions that they plan to meet at Sarah's house before heading out."
      },
      {
        id: 5,
        question: "What time do they agree to meet?",
        options: ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"],
        correctAnswer: 2,
        explanation: "After some discussion, the speakers decide that 3:00 PM is the most convenient time for both of them to meet."
      },
      {
        id: 6,
        question: "What does Tom need to do before meeting?",
        options: ["Buy tickets online", "Pick up his sister", "Finish his homework", "Go to the bank"],
        correctAnswer: 2,
        explanation: "Tom mentions that he needs to complete his homework before he can join the planned weekend activity."
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
        explanation: "The announcement's primary goal is to inform listeners about the upcoming changes to the library's operating hours."
      },
      {
        id: 8,
        question: "When will the new hours take effect?",
        options: ["Immediately", "Next Monday", "Next month", "After the holidays"],
        correctAnswer: 1,
        explanation: "The announcement clearly states that the new library hours will begin on the upcoming Monday."
      },
      {
        id: 9,
        question: "What should students do if they have questions?",
        options: ["Call the main office", "Visit the information desk", "Send an email", "Check the website"],
        correctAnswer: 1,
        explanation: "Listeners are advised to go to the information desk for any further questions or clarifications."
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
        explanation: "The news report describes a community event that was organized to raise funds for a charitable cause."
      },
      {
        id: 11,
        question: "How much money was raised?",
        options: ["$15,000", "$25,000", "$35,000", "$45,000"],
        correctAnswer: 2,
        explanation: "The report specifies that the fundraiser successfully collected a total of $35,000 for the cause."
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
        explanation: "The funds raised are designated to provide financial assistance to families in the local community."
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
        explanation: "Maria expresses a preference for studying in groups, as she finds it more engaging and collaborative."
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
        explanation: "John states that he finds group study sessions distracting, which hinders his ability to concentrate effectively."
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
        explanation: "Despite their different study preferences, both Maria and John acknowledge the importance of using practice tests to prepare."
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
        explanation: "The woman argues that remote work allows for a better balance between professional and personal life."
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
        explanation: "The man is concerned that remote work can make it more challenging for team members to collaborate effectively."
      },
      {
        id: 18,
        question: "What solution do they both consider reasonable?",
        options: ["Fully remote work", "Traditional office work", "Hybrid work arrangement", "Flexible working hours"],
        correctAnswer: 2,
        explanation: "Both speakers agree that a hybrid model, combining remote and in-office work, is a practical compromise."
      },
    ],
  },
]

export default function ListeningTestPage() {
  const [currentPart, setCurrentPart] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(2820) // 47 minutes
  const [audioProgress, setAudioProgress] = useState(0)
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [furthestQuestionReached, setFurthestQuestionReached] = useState({ part: 0, question: 0 })
  const [showWarning, setShowWarning] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0)
  const [isAudioFinished, setIsAudioFinished] = useState(false)

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
    if (audioRef.current && !isAudioFinished) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
        setHasPlayedAudio(true)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    if (audioRef.current) {
      const volumeValue = newVolume[0];
      audioRef.current.volume = volumeValue;
      setVolume(volumeValue);
    }
  };

  const handleSeek = (newProgress: number[]) => {
    if (audioRef.current && audioRef.current.duration) {
      const newTime = (newProgress[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setAudioCurrentTime(newTime);
    }
  };

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const proceedToNextQuestion = () => {
    const currentPartData = listeningParts[currentPart]

    // Update the furthest question reached
    if (currentPart > furthestQuestionReached.part || (currentPart === furthestQuestionReached.part && currentQuestion >= furthestQuestionReached.question)) {
      const nextQuestionIndex = currentQuestion + 1
      if (nextQuestionIndex < currentPartData.questions.length) {
        setFurthestQuestionReached({ part: currentPart, question: nextQuestionIndex })
      } else if (currentPart + 1 < listeningParts.length) {
        setFurthestQuestionReached({ part: currentPart + 1, question: 0 })
      }
    }

    if (currentQuestion < currentPartData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentPart < listeningParts.length - 1) {
      setCurrentPart(currentPart + 1)
      setCurrentQuestion(0)
      setHasPlayedAudio(false)
      setAudioProgress(0)
      setIsPlaying(false)
      setIsAudioFinished(false)
      setAudioCurrentTime(0)
      setAudioDuration(0)
    } else {
      handleTestComplete()
    }
  }

  const handleNextQuestion = () => {
    const currentQuestionData = listeningParts[currentPart]?.questions[currentQuestion]
    const isAnswered = Object.prototype.hasOwnProperty.call(answers, currentQuestionData.id)

    if (!isAnswered && !(currentPart === listeningParts.length - 1 && currentQuestion === listeningParts[currentPart]?.questions.length - 1)) {
      setShowWarning(true)
    } else {
      proceedToNextQuestion()
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
                  <p className="text-slate-400 max-w-md mx-auto">{/* proficiency.description */}</p>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-2xl font-bold text-center mb-4 text-blue-400">Detailed Feedback</h3>
                <Accordion type="single" collapsible className="w-full">
                  {listeningParts.flatMap(part => part.questions).map((question, index) => {
                    const userAnswerIndex = answers[question.id];
                    const isCorrect = userAnswerIndex === question.correctAnswer;

                    return (
                      <AccordionItem key={question.id} value={`item-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-left">{index + 1}. {question.question}</span>
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-500 ml-4" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 ml-4" />
                            )}
                          </div>
                        </AccordionTrigger>
                                                <AccordionContent className="text-slate-300 space-y-2 card-outline p-4">
                          <p className="flex">
                            <strong className="text-blue-400 flex-shrink-0 mr-2">Your Answer:</strong>
                            <span className={`break-words ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                              {question.options[userAnswerIndex] ?? "Not answered"}
                            </span>
                          </p>
                          <hr className="border-slate-700" />
                          {!isCorrect && (
                            <>
                              <p className="flex">
                                <strong className="text-blue-400 flex-shrink-0 mr-2">Correct Answer:</strong>
                                <span className="text-green-400 break-words">
                                  {question.options[question.correctAnswer]}
                                </span>
                              </p>
                              <hr className="border-slate-700" />
                            </>
                          )}
                          <p className="pt-2 flex">
                            <strong className="text-blue-400 flex-shrink-0 mr-2">Explanation:</strong>
                            <span className="break-words">{question.explanation}</span>
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>

              <div className="flex justify-center space-x-4 pt-4">
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
        <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
          <AlertDialogContent className="bg-slate-800 text-white border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-mono">No Answer Selected</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                You have not selected an answer for this question. On the official test, you will not be able to return to this question after moving to the next page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-slate-700 hover:bg-slate-600 border-slate-600 font-mono">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setShowWarning(false)
                  proceedToNextQuestion()
                }}
                className="bg-blue-600 hover:bg-blue-700 font-mono"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <header className="flex justify-between items-center p-4 bg-blue-950 max-435:flex-col max-435:items-start rounded-t-[23px]">
          <h1 className="text-lg font-semibold text-blue-400 font-mono max-w-[70%] max-435:pb-[2rem]">Practice Test A - Listening Part {currentPart + 1}: Listening to Problem Solving</h1>
          <div className="flex items-center space-x-4 max-435:space-x-40">
            <span className="text-sm text-slate-400 max-435:flex max-435:flex-col">Time remaining: <span className="font-bold text-red-500">{formatTime(timeRemaining)}</span></span>
            <Button onClick={handleNextQuestion} className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-6 font-mono">
              {currentPart === listeningParts.length - 1 && currentQuestion === currentPartData?.questions.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </header>

        <main className="grid md:grid-cols-2 gap-6 max-1024:grid-cols-1">
          {/* Left Column */}
          <div className="border-r border-slate-700 flex flex-col max-1024:border-r-0 p-4 sm:p-6 md:p-8">
            <div className="flex-grow">
              <div className="flex items-center bg-blue-900/60 p-3 rounded-md mb-4">
                <AlertCircle className="text-blue-400 mr-3" />
                <p className="text-blue-400 font-semibold font-mono">{currentPartData.title}</p>
              </div>

              <div className="border border-slate-700 rounded-md p-4 space-y-4 bg-slate-800/50">
                <div className="bg-slate-700/50 p-4 rounded-lg flex items-center justify-center h-24">
                  {!hasPlayedAudio ? (
                    <div className="text-center text-slate-400">
                      <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                      <p>Click the play button to start the audio.</p>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-4 w-full">
                      <Volume2 className="h-8 w-8 text-slate-400" />
                      <div className="w-full">
                        <p className="text-slate-300 mb-1 text-center pb-[0.5rem]">Playing...</p>
                        <Progress value={audioProgress} className="h-2 bg-slate-600 mb-[2rem]" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-slate-900/70 p-3 rounded-lg flex items-center">
                  <button onClick={handlePlayAudio} disabled={isAudioFinished} className="bg-transparent hover:bg-slate-700 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed scale-[0.6]">
                    {isPlaying ? <Pause className="h-8 w-8 text-slate-400" /> : <Play className="h-8 w-8 text-slate-400" />}
                  </button>

                  <Slider
                    value={[audioProgress]}
                    onValueChange={handleSeek}
                    max={100}
                    step={1}
                    className="w-[25%]"
                  />

                  <span className="text-sm text-slate-400 font-mono w-[8rem] text-center ">
                    {formatTime(audioCurrentTime)} / {formatTime(audioDuration)}
                  </span>

                  <div className="flex items-center space-x-2 w-32 ml-auto">
                    <Volume2 className="text-slate-400 h-5 w-5" />
                    <Slider
                      value={[volume]}
                      onValueChange={handleVolumeChange}
                      max={1}
                      step={0.01}
                      className="w-full"
                    />
                  </div>
                </div>
                <audio
                  ref={audioRef}
                  src={currentPartData.audioUrl}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={(e) => {
                    const audio = e.target as HTMLAudioElement
                    if (audio.duration) {
                      setAudioProgress((audio.currentTime / audio.duration) * 100)
                      setAudioCurrentTime(audio.currentTime)
                    }
                  }}
                  onEnded={() => {
                    setIsPlaying(false)
                    setIsAudioFinished(true)
                  }}
                  onLoadedMetadata={(e) => {
                    const audio = e.target as HTMLAudioElement
                    if (audioRef.current) {
                      audioRef.current.volume = volume
                    }
                    setAudioDuration(audio.duration)
                  }}
                />
                <p className="text-center text-sm text-slate-400 border border-slate-600 p-2 rounded-md">
                  This playbar will not appear in the official test.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-slate-800/50 p-4 sm:p-6 md:p-8 rounded-md flex flex-col">
            <div className="flex-grow">
              <p className="font-semibold mb-2 text-blue-400 font-mono">Question {currentQuestion + 1} of {currentPartData.questions.length}</p>
              <div className="flex items-center mb-4 text-blue-300">
                <AlertCircle className="text-blue-400 mr-3" />
                <p className="font-semibold font-mono text-blue-400">Choose the best answer to each question.</p>
              </div>

              <RadioGroup
                value={answers[currentQuestionData.id]?.toString()}
                onValueChange={(value) => handleAnswerChange(currentQuestionData.id, parseInt(value))}
                className="space-y-4"
                disabled={currentPart < furthestQuestionReached.part || (currentPart === furthestQuestionReached.part && currentQuestion < furthestQuestionReached.question)}
              >
                {currentQuestionData.options.map((option, index) => (
                  <div key={index} className="flex items-center p-2 rounded-md hover:bg-slate-700/50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mr-3 border-slate-600" />
                    <Label htmlFor={`option-${index}`} className="font-normal text-slate-300">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </main>

        <footer className="flex justify-between items-center p-4 bg-blue-950 rounded-b-[23px]">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-6 font-mono">
            Answer Key
          </Button>
          <Button onClick={handlePreviousQuestion} disabled={currentPart === 0 && currentQuestion === 0} className="bg-red-700 text-white hover:bg-red-800 font-mono">
            Back
          </Button>
        </footer>
      </div>
    </DashboardLayout>
  )
}
