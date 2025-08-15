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
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Clock, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, FileText } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface ReadingPart {
  id: number
  title: string
  description: string
  passage: string
  questions: Question[]
  timeLimit: number
}

const readingParts: ReadingPart[] = [
  {
    id: 1,
    title: "Part 1: Reading Correspondence",
    description: "Read the email and answer the questions.",
    timeLimit: 11,
    passage: `From: sarah.johnson@techcorp.com
To: team-leads@techcorp.com
Subject: Quarterly Team Meeting - Schedule Change
Date: March 15, 2024

Dear Team Leaders,

I hope this email finds you well. I'm writing to inform you of an important change to our upcoming quarterly team meeting.

Due to unexpected scheduling conflicts with several key stakeholders, we need to reschedule our quarterly meeting originally planned for March 22nd. After consulting with the executive team and checking everyone's availability, we have decided to move the meeting to March 29th at 2:00 PM.

The meeting will still be held in Conference Room A on the 5th floor, and we will continue with our planned agenda:
• Q1 performance review
• Q2 goals and objectives
• Budget allocation discussion
• New project assignments

Please note that attendance is mandatory for all team leaders. If you have any scheduling conflicts with the new date, please contact me immediately so we can discuss alternative arrangements.

Additionally, I'd like to remind everyone to submit their quarterly reports by March 27th, two days before the meeting. This will give us time to review all materials beforehand and ensure a productive discussion.

If you have any questions or concerns, please don't hesitate to reach out to me directly.

Best regards,
Sarah Johnson
Director of Operations
TechCorp Solutions`,
    questions: [
      {
        id: 1,
        question: "What is the main purpose of this email?",
        options: [
          "To announce a new quarterly meeting",
          "To inform about a meeting schedule change",
          "To request quarterly reports from team leaders",
          "To discuss budget allocation for Q2",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "When was the meeting originally scheduled?",
        options: ["March 15th", "March 22nd", "March 27th", "March 29th"],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Where will the rescheduled meeting take place?",
        options: [
          "Conference Room A on the 5th floor",
          "Conference Room B on the 4th floor",
          "The executive boardroom",
          "The location is not specified",
        ],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: "When should team leaders submit their quarterly reports?",
        options: ["March 22nd", "March 25th", "March 27th", "March 29th"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Part 2: Reading to Apply a Diagram",
    description: "Read the instructions and refer to the floor plan to answer the questions.",
    timeLimit: 10,
    passage: `WESTFIELD COMMUNITY CENTER - FLOOR PLAN GUIDE

Welcome to Westfield Community Center! Please use this guide to navigate our facilities.

MAIN FLOOR:
- Reception Desk: Located immediately to your right as you enter the main entrance
- Gymnasium: Large space at the back of the building, accessible through the main hallway
- Multipurpose Room 1: First door on the left after passing reception
- Multipurpose Room 2: Second door on the left, next to Room 1
- Kitchen: Located behind Multipurpose Room 2, accessible through Room 2 or the side corridor
- Restrooms: Located in the center of the building, between the multipurpose rooms and gymnasium

SECOND FLOOR (accessible via stairs near reception):
- Library: Large room overlooking the front parking lot
- Computer Lab: Adjacent to the library, equipped with 20 workstations
- Meeting Room A: Small conference room at the end of the hallway
- Meeting Room B: Across from Meeting Room A
- Storage Room: Located next to the stairs

BASEMENT LEVEL (accessible via stairs near the gymnasium):
- Art Studio: Creative space with natural lighting from ground-level windows
- Music Room: Soundproofed room for musical activities
- Storage Areas: Multiple storage spaces for equipment and supplies

PARKING:
- Main parking lot is located in front of the building
- Additional parking is available on the east side of the building
- Handicapped parking spaces are located closest to the main entrance

For emergencies, fire exits are located at the rear of the gymnasium and at the end of the second-floor hallway.`,
    questions: [
      {
        id: 5,
        question: "If you enter through the main entrance, where is the reception desk located?",
        options: ["Straight ahead", "To your left", "To your right", "At the back of the building"],
        correctAnswer: 2,
      },
      {
        id: 6,
        question: "How can you access the kitchen?",
        options: [
          "Only through Multipurpose Room 2",
          "Only through the side corridor",
          "Through Multipurpose Room 2 or the side corridor",
          "Directly from the main hallway",
        ],
        correctAnswer: 2,
      },
      {
        id: 7,
        question: "Which rooms are located on the second floor?",
        options: [
          "Library, Computer Lab, and two meeting rooms",
          "Art Studio, Music Room, and storage areas",
          "Gymnasium and multipurpose rooms",
          "Reception desk and restrooms",
        ],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: "Where are the handicapped parking spaces located?",
        options: [
          "At the back of the building",
          "On the east side of the building",
          "Closest to the main entrance",
          "In the basement level",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Part 3: Reading for Information",
    description: "Read the article about renewable energy and answer the questions.",
    timeLimit: 20,
    passage: `The Future of Renewable Energy: Challenges and Opportunities

As the world grapples with climate change and the urgent need to reduce greenhouse gas emissions, renewable energy has emerged as a critical solution. Solar, wind, hydroelectric, and other renewable sources now account for approximately 30% of global electricity generation, a significant increase from just 10% two decades ago.

Solar energy has experienced the most dramatic growth, with costs falling by over 80% since 2010. This remarkable decrease has made solar power competitive with fossil fuels in many regions. Large-scale solar installations, known as solar farms, can now generate electricity at costs below $0.05 per kilowatt-hour in sunny locations. Additionally, improvements in battery technology have addressed one of solar energy's main limitations: the inability to generate power when the sun isn't shining.

Wind energy has also seen substantial development, particularly offshore wind farms. These installations can harness stronger and more consistent winds than their onshore counterparts, leading to higher energy output. Countries like Denmark and the United Kingdom have become leaders in offshore wind technology, with Denmark generating over 50% of its electricity from wind power.

However, the transition to renewable energy faces several challenges. Grid integration remains a significant hurdle, as traditional power grids were designed for consistent, predictable energy sources like coal and natural gas plants. Renewable sources, particularly solar and wind, produce variable amounts of energy depending on weather conditions. This variability requires sophisticated grid management systems and energy storage solutions.

Energy storage technology, while improving rapidly, still represents a considerable expense. Large-scale battery installations can cost millions of dollars, though prices are declining as technology advances and production scales up. Alternative storage methods, such as pumped hydro storage and compressed air energy storage, offer promising solutions but require specific geographical conditions.

Despite these challenges, the economic benefits of renewable energy are becoming increasingly clear. The renewable energy sector now employs over 12 million people worldwide, with job growth significantly outpacing traditional energy sectors. Moreover, as renewable technology costs continue to decline and fossil fuel prices remain volatile, the economic case for renewable energy strengthens.

Government policies play a crucial role in accelerating renewable energy adoption. Feed-in tariffs, tax incentives, and renewable energy standards have proven effective in many countries. However, policy consistency is essential, as uncertainty can discourage long-term investments in renewable infrastructure.

Looking ahead, experts predict that renewable energy could account for 80% of global electricity generation by 2050, provided that current trends continue and supportive policies remain in place. This transition would not only help address climate change but also create energy independence for many nations currently reliant on fossil fuel imports.`,
    questions: [
      {
        id: 9,
        question: "What percentage of global electricity generation do renewable sources currently account for?",
        options: ["10%", "20%", "30%", "50%"],
        correctAnswer: 2,
      },
      {
        id: 10,
        question: "By how much have solar energy costs fallen since 2010?",
        options: ["Over 50%", "Over 60%", "Over 70%", "Over 80%"],
        correctAnswer: 3,
      },
      {
        id: 11,
        question: "What is mentioned as a main advantage of offshore wind farms?",
        options: [
          "They are cheaper to build",
          "They have stronger and more consistent winds",
          "They require less maintenance",
          "They are closer to urban areas",
        ],
        correctAnswer: 1,
      },
      {
        id: 12,
        question: "According to the article, what is a significant challenge for renewable energy?",
        options: [
          "Lack of government support",
          "High maintenance costs",
          "Grid integration difficulties",
          "Limited geographical availability",
        ],
        correctAnswer: 2,
      },
      {
        id: 13,
        question: "How many people does the renewable energy sector employ worldwide?",
        options: ["Over 8 million", "Over 10 million", "Over 12 million", "Over 15 million"],
        correctAnswer: 2,
      },
      {
        id: 14,
        question: "What percentage of electricity generation could renewables reach by 2050?",
        options: ["60%", "70%", "80%", "90%"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 4,
    title: "Part 4: Reading for Viewpoints",
    description: "Read the two viewpoints about remote work and answer the questions.",
    timeLimit: 14,
    passage: `VIEWPOINT A: The Case for Remote Work

Remote work has revolutionized the modern workplace, offering unprecedented benefits for both employees and employers. As someone who has managed remote teams for over five years, I can confidently say that the advantages far outweigh any perceived drawbacks.

First and foremost, remote work dramatically improves work-life balance. Employees no longer waste hours commuting, giving them more time for family, personal interests, and rest. This improved balance leads to higher job satisfaction and reduced burnout rates. In my experience, remote employees are often more motivated and productive because they feel trusted and valued by their employers.

From a business perspective, remote work opens up access to global talent pools. Companies are no longer limited to hiring within their geographical area and can recruit the best candidates regardless of location. This has been particularly beneficial for specialized roles where local talent may be scarce.

Cost savings are another significant advantage. Companies can reduce overhead expenses related to office space, utilities, and equipment. Many organizations have reported savings of 20-30% on operational costs after transitioning to remote work models. These savings can be reinvested in employee development, technology improvements, or business expansion.

Environmental benefits cannot be ignored either. Reduced commuting leads to lower carbon emissions, contributing to sustainability goals. A study by Global Workplace Analytics found that if everyone who could work remotely did so just half the time, it would reduce greenhouse gas emissions equivalent to taking 10 million cars off the road.

VIEWPOINT B: The Importance of In-Person Collaboration

While remote work offers certain conveniences, I believe that in-person collaboration remains essential for organizational success and employee development. Having led teams in both remote and traditional office settings, I've observed significant advantages to physical workplace presence.

Face-to-face interaction fosters creativity and innovation in ways that virtual meetings simply cannot replicate. Spontaneous conversations, brainstorming sessions, and the ability to read body language and non-verbal cues are crucial for effective teamwork. Some of the best ideas emerge from casual hallway conversations or impromptu discussions that rarely occur in remote settings.

Mentorship and professional development suffer in remote environments. Junior employees particularly benefit from observing experienced colleagues, learning through informal interactions, and receiving immediate feedback. The apprenticeship model of learning, which has been effective for centuries, becomes nearly impossible to implement remotely.

Company culture is another casualty of remote work. Building strong organizational culture requires shared experiences, team bonding, and a sense of belonging that is difficult to achieve through video calls. Employee loyalty and engagement often decline when workers feel disconnected from their colleagues and company mission.

Furthermore, not all employees thrive in remote environments. Some individuals need structure, supervision, and social interaction to perform their best. Remote work can lead to isolation, depression, and decreased motivation for these employees. The assumption that everyone prefers remote work is simply incorrect.

From a practical standpoint, certain tasks and projects require immediate collaboration, access to specialized equipment, or security measures that are only available in office settings. Industries such as manufacturing, healthcare, and research often cannot function effectively with fully remote teams.`,
    questions: [
      {
        id: 15,
        question: "According to Viewpoint A, what is a primary benefit of remote work for employees?",
        options: ["Higher salaries", "Better career advancement", "Improved work-life balance", "More job security"],
        correctAnswer: 2,
      },
      {
        id: 16,
        question: "What cost savings percentage does Viewpoint A mention for companies?",
        options: ["10-20%", "20-30%", "30-40%", "40-50%"],
        correctAnswer: 1,
      },
      {
        id: 17,
        question: "According to Viewpoint B, what suffers most in remote environments?",
        options: [
          "Employee productivity",
          "Company profits",
          "Mentorship and professional development",
          "Technology infrastructure",
        ],
        correctAnswer: 2,
      },
      {
        id: 18,
        question: "What does Viewpoint B suggest about company culture in remote settings?",
        options: [
          "It becomes stronger",
          "It remains unchanged",
          "It becomes more difficult to build",
          "It improves through technology",
        ],
        correctAnswer: 2,
      },
      {
        id: 19,
        question: "Which viewpoint mentions environmental benefits?",
        options: ["Viewpoint A only", "Viewpoint B only", "Both viewpoints", "Neither viewpoint"],
        correctAnswer: 0,
      },
      {
        id: 20,
        question: "What do both viewpoints agree on?",
        options: [
          "Remote work is always better",
          "In-person work is always better",
          "Different approaches work for different situations",
          "The viewpoints do not agree on anything",
        ],
        correctAnswer: 3,
      },
    ],
  },
]

export default function ReadingTestPage() {
  const [currentPart, setCurrentPart] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(55 * 60) // 55 minutes in seconds
  const [partTimeRemaining, setPartTimeRemaining] = useState(readingParts[0].timeLimit * 60)
  const [testCompleted, setTestCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const timerRef = useRef<NodeJS.Timeout>()
  const partTimerRef = useRef<NodeJS.Timeout>()

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
    if (partTimeRemaining > 0 && !testCompleted) {
      partTimerRef.current = setTimeout(() => {
        setPartTimeRemaining(partTimeRemaining - 1)
      }, 1000)
    } else if (partTimeRemaining === 0) {
      handleNextPart()
    }

    return () => {
      if (partTimerRef.current) {
        clearTimeout(partTimerRef.current)
      }
    }
  }, [partTimeRemaining, testCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleNextQuestion = () => {
    const currentPartData = readingParts[currentPart]
    if (currentQuestion < currentPartData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleNextPart()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (currentPart > 0) {
      setCurrentPart(currentPart - 1)
      const prevPartData = readingParts[currentPart - 1]
      setCurrentQuestion(prevPartData.questions.length - 1)
      setPartTimeRemaining(prevPartData.timeLimit * 60)
    }
  }

  const handleNextPart = () => {
    if (currentPart < readingParts.length - 1) {
      setCurrentPart(currentPart + 1)
      setCurrentQuestion(0)
      setPartTimeRemaining(readingParts[currentPart + 1].timeLimit * 60)
    } else {
      handleTestComplete()
    }
  }

  const handleTestComplete = () => {
    setTestCompleted(true)
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    readingParts.forEach((part) => {
      part.questions.forEach((question) => {
        if (answers[question.id] === question.correctAnswer) {
          correct++
        }
      })
    })
    return correct
  }

  const totalQuestions = readingParts.reduce((total, part) => total + part.questions.length, 0)
  const currentPartData = readingParts[currentPart]
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
              <CardTitle className="text-white text-3xl">Reading Test Results</CardTitle>
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
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <div>
                  <CardTitle className="dark:text-white text-gray-500 text-2xl">CELPIP Reading Test</CardTitle>
                  <CardDescription className="text-gray-400">
                    Part {currentPart + 1} of {readingParts.length} • Question {currentQuestion + 1} of{" "}
                    {currentPartData?.questions.length}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-red-500/20 dark:text-red-300 text-red-600 border-red-500/30">
                  <Clock className="h-4 w-4 mr-2" />
                  Part: {formatTime(partTimeRemaining)}
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
              <span className="text-sm text-gray-400">Overall Progress</span>
              <span className="text-sm dark:text-gray-400 text-gray-700">
                {readingParts.slice(0, currentPart).reduce((sum, part) => sum + part.questions.length, 0) +
                  currentQuestion +
                  1}{" "}
                / {totalQuestions}
              </span>
            </div>
            <Progress
              value={
                ((readingParts.slice(0, currentPart).reduce((sum, part) => sum + part.questions.length, 0) +
                  currentQuestion +
                  1) /
                  totalQuestions) *
                100
              }
              className="h-2"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-1024:grid-cols-1">
          {/* Reading Passage */}
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-300 text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                {currentPartData?.title}
              </CardTitle>
              <CardDescription className="text-gray-400">{currentPartData?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] w-full">
                <div className="bg-blue-400/25 p-6 rounded-lg">
                  <div className="dark:text-gray-300 text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                    {currentPartData?.passage}
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-300 text-lg">Question {currentQuestion + 1}</CardTitle>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                  Part {currentPart + 1} Time: {formatTime(partTimeRemaining)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="dark:text-gray-300 text-gray-400 text-lg leading-relaxed">{currentQuestionData?.question}</div>

              <RadioGroup
                value={answers[currentQuestionData?.id]?.toString()}
                onValueChange={(value) => handleAnswerChange(currentQuestionData?.id, Number.parseInt(value))}
                className="space-y-4"
              >
                {currentQuestionData?.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
                    <Label htmlFor={`option-${index}`} className="dark:text-gray-300 text-gray-100 cursor-pointer flex-1 leading-relaxed">
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
                  disabled={answers[currentQuestionData?.id] === undefined}
                  className="bg-blue-600 hover:bg-blue-700 font-mono"
                >
                  {currentPart === readingParts.length - 1 &&
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

        {/* Instructions */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div className="text-sm text-gray-400">
                <strong className="text-blue-500">Instructions:</strong> Read each passage carefully and answer all
                questions. Each part has a time limit. You can navigate between questions within the current part, but
                cannot return to previous parts once completed.
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  )
}
