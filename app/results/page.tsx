"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CircularProgress } from "@/components/circular-progress"
import {
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  BarChart3,
  Download,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

// Mock data - in real app this would come from API/database
const testResults = {
  overall: {
    clb: 8.5,
    score: 85,
    testDate: "2024-01-15",
    duration: "2h 39m",
    improvement: "+1.2",
  },
  sections: [
    {
      name: "Listening",
      icon: Headphones,
      clb: 9.0,
      score: 90,
      maxScore: 100,
      color: "from-blue-500 to-cyan-500",
      questions: 38,
      correct: 34,
      improvement: "+0.5",
    },
    {
      name: "Reading",
      icon: BookOpen,
      clb: 8.5,
      score: 85,
      maxScore: 100,
      color: "from-green-500 to-emerald-500",
      questions: 38,
      correct: 32,
      improvement: "+0.3",
    },
    {
      name: "Writing",
      icon: PenTool,
      clb: 8.0,
      score: 80,
      maxScore: 100,
      color: "from-orange-500 to-red-500",
      tasks: 2,
      completed: 2,
      improvement: "+1.5",
    },
    {
      name: "Speaking",
      icon: Mic,
      clb: 8.5,
      score: 85,
      maxScore: 100,
      color: "from-purple-500 to-pink-500",
      tasks: 8,
      completed: 8,
      improvement: "+2.1",
    },
  ],
  feedback: {
    writing: {
      task1: {
        title: "Email Writing",
        score: 8.2,
        feedback: [
          { type: "positive", text: "Excellent use of formal email structure and appropriate tone" },
          { type: "positive", text: "Clear problem identification and solution proposal" },
          { type: "improvement", text: "Consider using more varied sentence structures" },
          { type: "grammar", text: "Minor issue: 'you was' should be 'you were' (line 3)" },
        ],
      },
      task2: {
        title: "Survey Response",
        score: 7.8,
        feedback: [
          { type: "positive", text: "Strong opinion with well-supported arguments" },
          { type: "positive", text: "Good use of examples and personal experience" },
          { type: "improvement", text: "Work on paragraph transitions for better flow" },
          { type: "vocabulary", text: "Try using more advanced vocabulary (e.g., 'furthermore' instead of 'also')" },
        ],
      },
    },
    speaking: {
      overall: {
        fluency: 8.5,
        pronunciation: 8.0,
        vocabulary: 8.2,
        grammar: 7.8,
        confidence: 85,
        enthusiasm: 72,
      },
      tasks: [
        { task: "Giving Advice", score: 8.5, feedback: "Clear delivery with good use of examples" },
        { task: "Personal Experience", score: 8.0, feedback: "Engaging story but watch past tense consistency" },
        { task: "Describing Scene", score: 8.2, feedback: "Detailed description with good vocabulary" },
        { task: "Making Predictions", score: 7.5, feedback: "Good ideas but could be more confident in delivery" },
      ],
    },
  },
  recommendations: [
    "Practice more complex sentence structures in writing",
    "Focus on pronunciation drills for /th/ sounds",
    "Review past tense irregular verbs",
    "Work on speaking fluency with timed exercises",
  ],
  strengths: [
    "Excellent listening comprehension",
    "Strong vocabulary usage",
    "Clear communication of ideas",
    "Good understanding of formal writing structure",
  ],
}

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <DashboardLayout>
      <div className="space-y-8 fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-[400] gradient-title text-[1.5rem] font-mono">Test Results</h1>
          <p className="text-xl text-slate-800/70 dark:text-gray-500">Comprehensive analysis of your CELPIP practice test performance</p>
        </div>

        {/* Overall Score Card */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-white font-mono flex items-center gap-3">
                  <Award className="w-6 h-6 dark:text-yellow-400 text-yellow-500 " />
                  Overall Performance
                </CardTitle>
                <CardDescription className="text-slate-800/70 dark:text-gray-100 pl-[37px] pt-[9px]">
                  Test completed on {testResults.overall.testDate}
                </CardDescription>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="dark:border-blue-500/30 border-blue-500 dark:text-blue-300 text-blue-600 hover:bg-blue-500/10 font-mono bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button
                  variant="outline"
                  className="dark:border-blue-500/30 border-blue-500 dark:text-blue-300 text-blue-600 hover:bg-blue-500/10 font-mono bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white font-mono mb-2">CLB {testResults.overall.clb}</div>
                <div className="dark:text-blue-300 text-blue-500 text-sm">Canadian Language Benchmark</div>
                <Badge className="mt-2 bg-green-500/20 dark:text-green-300 text-green-600 border-green-500/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {testResults.overall.improvement}
                </Badge>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white font-mono mb-2">{testResults.overall.score}%</div>
                <div className="dark:text-blue-300 text-blue-500 text-sm">Overall Score</div>
                <div className="dark:text-green-400 text-green-600 text-sm mt-2">Excellent Performance</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white font-mono mb-2">{testResults.overall.duration}</div>
                <div className="dark:text-blue-300 text-blue-500 text-sm">Test Duration</div>
                <div className="text-blue-400 text-sm mt-2">Within Time Limit</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white font-mono mb-2">A+</div>
                <div className="dark:text-blue-300 text-blue-500 text-sm">Grade</div>
                <div className="dark:text-yellow-400 text-yellow-200 text-sm mt-2">Ready for Immigration</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Breakdown */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-1024:grid-cols-2 max-640:grid-cols-1">
          {testResults.sections.map((section) => {
            const IconComponent = section.icon
            return (
              <Card
                key={section.name}
                className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
              >
                <CardHeader className={`bg-gradient-to-r ${section.color}/20`}>
                  <CardTitle className="text-white font-mono flex items-center gap-2 text-lg">
                    <IconComponent className="w-5 h-5" />
                    {section.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <CircularProgress
                      value={section.score}
                      size={80}
                      strokeWidth={8}
                      className="mx-auto"
                      gradient={section.color}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-white font-mono">CLB {section.clb}</div>
                    <div className="dark:text-blue-300 text-blue-500 text-sm">
                      {section.questions
                        ? `${section.correct}/${section.questions} correct`
                        : `${section.completed}/${section.tasks} tasks`}
                    </div>
                    <Badge className="bg-green-500/20 dark:text-green-300 text-green-600 border-green-500/30">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {section.improvement}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Detailed Analysis Tabs */}
        <Card className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4 dark:bg-black/30 bg-white/50">
                <TabsTrigger value="overview" className="font-mono data-[state=active]:bg-blue-600/30">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="writing" className="font-mono data-[state=active]:bg-blue-600/30">
                  Writing
                </TabsTrigger>
                <TabsTrigger value="speaking" className="font-mono data-[state=active]:bg-blue-600/30">
                  Speaking
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="font-mono data-[state=active]:bg-blue-600/30">
                  Insights
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="p-6">
              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold dark:text-green-400 text-green-500 font-mono">Strengths</h3>
                    <div className="space-y-2">
                      {testResults.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2 dark:text-green-400 text-green-500">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold dark:text-orange-400 text-orange-400 font-mono">Areas for Improvement</h3>
                    <div className="space-y-2">
                      {testResults.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center gap-2 dark:text-orange-400 text-orange-400">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="writing" className="space-y-6">
                <div className="space-y-6">
                  {Object.entries(testResults.feedback.writing).map(([taskKey, task]) => (
                    <Card key={taskKey} className="bg-black/10 border border-white/5">
                      <CardHeader>
                        <CardTitle className="text-blue-300 font-mono flex items-center justify-between">
                          {task.title}
                          <Badge className="bg-blue-500/20 dark:text-blue-300 text-blue-700 border-blue-500/30">
                            Score: {task.score}/10
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {task.feedback.map((item, index) => (
                          <div
                            key={index}
                            className={`flex items-start gap-2 p-3 rounded-lg ${
                              item.type === "positive"
                                ? "bg-green-500/10 border border-green-500/20"
                                : item.type === "improvement"
                                  ? "bg-orange-500/10 border border-orange-500/20"
                                  : "bg-red-500/10 border border-red-500/20"
                            }`}
                          >
                            {item.type === "positive" ? (
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5" />
                            )}
                            <span className="text-sm dark:text-blue-100 text-gray-500">{item.text}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="speaking" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card className="bg-black/10 border border-white/5">
                    <CardHeader>
                      <CardTitle className="dark:text-white text-blue-300 font-mono">Speaking Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(testResults.feedback.speaking.overall).map(([key, value]) => {
                        if (key === "confidence" || key === "enthusiasm") return null
                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="dark:text-blue-300 text-blue-500 capitalize">{key}</span>
                              <span className="text-white">{value}/10</span>
                            </div>
                            <Progress value={value * 10} className="h-2" />
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>

                  <Card className="bg-black/10 border border-white/5">
                    <CardHeader>
                      <CardTitle className="dark:text-white text-blue-300 font-mono">Emotional Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="dark:text-blue-300 text-blue-500">Confidence</span>
                          <span className="text-white">{testResults.feedback.speaking.overall.confidence}%</span>
                        </div>
                        <Progress value={testResults.feedback.speaking.overall.confidence} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="dark:text-blue-300 text-blue-500">Enthusiasm</span>
                          <span className="text-white">{testResults.feedback.speaking.overall.enthusiasm}%</span>
                        </div>
                        <Progress value={testResults.feedback.speaking.overall.enthusiasm} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold dark:text-white text-blue-300 font-mono">Task-by-Task Feedback</h3>
                  <div className="grid gap-4">
                    {testResults.feedback.speaking.tasks.map((task, index) => (
                      <Card key={index} className="bg-black/10 border border-white/5">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold dark:text-white text-gray-400">{task.task}</span>
                            <Badge className="bg-blue-500/20 dark:text-blue-300 border-purple-500/30">
                              {task.score}/10
                            </Badge>
                          </div>
                          <p className="text-sm text-blue-400">{task.feedback}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-black/10 border border-white/5">
                    <CardHeader>
                      <CardTitle className="dark:text-white text-blue-300 font-mono flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-300" />
                        Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {testResults.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs dark:text-blue-300 text-blue-600 font-mono mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm dark:text-blue-100 text-gray-400">{rec}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-black/10 border border-white/5">
                    <CardHeader>
                      <CardTitle className="dark:text-white text-blue-300 font-mono flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-300" />
                        Study Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <Button
                          className="w-full justify-start bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border-blue-500/30 font-mono"
                          asChild
                        >
                          <Link href="/practice">Take Another Practice Test</Link>
                        </Button>
                        <Button
                          className="w-full justify-start bg-green-500/10 hover:bg-green-500/20 text-blue-300 border-green-500/30 font-mono"
                          asChild
                        >
                          <Link href="/test/writing">Focus on Writing</Link>
                        </Button>
                        <Button
                          className="w-full justify-start bg-purple-500/10 hover:bg-purple-500/20 text-blue-300 border-purple-500/30 font-mono"
                          asChild
                        >
                          <Link href="/test/speaking">Practice Speaking</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  )
}
