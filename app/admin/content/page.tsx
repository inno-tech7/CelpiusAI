"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff, Upload, Clock, FileText, Image, Video, Volume2 } from "lucide-react"
import BorderSpotlight from "@/components/BorderSpotlight"


interface CELPIPQuestion {
  id: string
  section: 'listening' | 'reading' | 'writing' | 'speaking'
  part: number
  partName: string
  taskType: string
  prompt: string
  instructions?: string
  options?: string[]
  correctAnswer?: string
  mediaFiles?: {
    audio?: File | string
    video?: File | string
    image?: File | string
  }
  timing?: {
    preparationTime?: number // in seconds
    responseTime?: number // in seconds
    totalTime?: number // in seconds
  }
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  points: number
  wordCount?: {
    min?: number
    max?: number
  }
  metadata?: {
    scenario?: string
    context?: string
    targetSkills?: string[]
  }
}

// CELPIP Test Structure Constants
const CELPIP_STRUCTURE = {
  listening: {
    parts: [
      { number: 1, name: 'Listening to Problem Solving', description: 'A conversation between two or more people trying to solve a problem' },
      { number: 2, name: 'Listening to a Daily Life Conversation', description: 'An informal conversation about an everyday topic' },
      { number: 3, name: 'Listening for Information', description: 'A monologue, such as an announcement or news report' },
      { number: 4, name: 'Listening to a News Item', description: 'A short news broadcast' },
      { number: 5, name: 'Listening to a Discussion', description: 'Audio and Video: Discussion among several people with video component' },
      { number: 6, name: 'Listening to Viewpoints', description: 'A monologue or discussion where speakers present and defend opinions' }
    ]
  },
  reading: {
    parts: [
      { number: 1, name: 'Reading Correspondence', description: 'Read an email or letter and answer questions, including choosing best response' },
      { number: 2, name: 'Reading to Apply a Diagram', description: 'Use both diagram/chart/schedule and related text to answer questions' },
      { number: 3, name: 'Reading for Information', description: 'Read informational text like news article and answer factual questions' },
      { number: 4, name: 'Reading for Viewpoints', description: 'Complex text with different opinions, identify viewpoints and supporting details' }
    ]
  },
  speaking: {
    parts: [
      { number: 1, name: 'Giving Advice', description: 'Give advice to a friend or family member about a problem' },
      { number: 2, name: 'Talking about a Personal Experience', description: 'Tell a short story about a personal experience' },
      { number: 3, name: 'Describing a Scene', description: 'Describe what is happening in a picture in detail' },
      { number: 4, name: 'Making Predictions', description: 'Predict what will happen next based on the image from Task 3' },
      { number: 5, name: 'Comparing and Persuading', description: 'Choose one option and persuade someone it is better, comparing two options' },
      { number: 6, name: 'Dealing with a Difficult Situation', description: 'Resolve a difficult situation in a polite and effective way' },
      { number: 7, name: 'Expressing Opinions', description: 'State your opinion and provide reasons and examples to support it' },
      { number: 8, name: 'Describing an Unusual Situation', description: 'Describe an unusual object/scene to someone who cannot see it' }
    ]
  },
  writing: {
    parts: [
      { number: 1, name: 'Writing an Email', description: '27 minutes, 150-200 words. Write email response with appropriate tone' },
      { number: 2, name: 'Responding to Survey Questions', description: '26 minutes, 150-200 words. Choose and justify one option from survey' }
    ]
  }
}

const initialMockQuestions: CELPIPQuestion[] = [
  {
    id: "1",
    section: "listening",
    part: 1,
    partName: "Listening to Problem Solving",
    taskType: "mcq",
    prompt: "What is the main problem the speakers are trying to solve?",
    instructions: "Listen to the conversation between two people discussing a problem. Answer the questions based on what you hear.",
    options: ["Finding a new apartment", "Planning a work presentation", "Organizing a family event", "Choosing a vacation destination"],
    correctAnswer: "Finding a new apartment",
    mediaFiles: { audio: "/audio/listening-part1-sample.mp3" },
    timing: { totalTime: 180 },
    difficulty: "intermediate",
    points: 10,
    metadata: {
      scenario: "Two roommates discussing housing options",
      context: "Daily life problem-solving",
      targetSkills: ["Understanding main ideas", "Following problem-solving discussions"]
    }
  },
  {
    id: "2",
    section: "reading",
    part: 2,
    partName: "Reading to Apply a Diagram",
    taskType: "mcq",
    prompt: "According to the schedule and email, when is the best time for the meeting?",
    instructions: "Read the email and refer to the schedule diagram to answer the questions.",
    options: ["Monday 2:00 PM", "Tuesday 10:00 AM", "Wednesday 3:00 PM", "Thursday 1:00 PM"],
    correctAnswer: "Tuesday 10:00 AM",
    mediaFiles: { image: "/images/schedule-diagram.png" },
    difficulty: "intermediate",
    points: 15,
    metadata: {
      scenario: "Office meeting scheduling",
      context: "Workplace communication",
      targetSkills: ["Diagram interpretation", "Cross-referencing information"]
    }
  },
  {
    id: "3",
    section: "writing",
    part: 1,
    partName: "Writing an Email",
    taskType: "email",
    prompt: "Your friend has asked for advice about choosing between two job offers. Write an email giving your friend advice. In your email, you should: • Ask for more details about both positions • Give your opinion on which job might be better • Suggest what factors your friend should consider",
    instructions: "Write an email response. Choose an appropriate tone (formal, semi-formal, or informal) based on the recipient.",
    timing: { totalTime: 1620 }, // 27 minutes
    wordCount: { min: 150, max: 200 },
    difficulty: "intermediate",
    points: 25,
    metadata: {
      scenario: "Giving advice to a friend",
      context: "Personal correspondence",
      targetSkills: ["Email writing", "Giving advice", "Appropriate tone"]
    }
  },
  {
    id: "4",
    section: "speaking",
    part: 3,
    partName: "Describing a Scene",
    taskType: "description",
    prompt: "Describe what is happening in this picture. Talk about the people, objects, activities, and setting. Provide as much detail as possible.",
    instructions: "Look at the picture and describe what you see. You have 30 seconds to prepare and 60 seconds to speak.",
    mediaFiles: { image: "/images/speaking-scene.jpg" },
    timing: { preparationTime: 30, responseTime: 60 },
    difficulty: "intermediate",
    points: 20,
    metadata: {
      scenario: "Scene description",
      context: "Visual description task",
      targetSkills: ["Descriptive language", "Observation skills", "Fluency"]
    }
  },
]

export default function ContentManagementPage() {
  const [questions, setQuestions] = useState<CELPIPQuestion[]>([])
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [selectedPart, setSelectedPart] = useState<number>(0)
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File}>({})
  const [newQuestion, setNewQuestion] = useState<Partial<CELPIPQuestion>>({
    section: "listening",
    part: 1,
    partName: "",
    taskType: "mcq",
    prompt: "",
    instructions: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    mediaFiles: {},
    timing: { preparationTime: 0, responseTime: 0, totalTime: 0 },
    difficulty: "intermediate",
    points: 10,
    wordCount: { min: 0, max: 0 },
    metadata: { scenario: "", context: "", targetSkills: [] }
  })

  const { toast } = useToast()

  useEffect(() => {
    const savedQuestions = localStorage.getItem("admin-questions")
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions))
    } else {
      setQuestions(initialMockQuestions)
      localStorage.setItem("admin-questions", JSON.stringify(initialMockQuestions))
    }
  }, [])

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("admin-questions", JSON.stringify(questions))
    }
  }, [questions])

  // Get available parts for selected section
  const getAvailableParts = (section: string) => {
    return CELPIP_STRUCTURE[section as keyof typeof CELPIP_STRUCTURE]?.parts || []
  }

  // Handle file upload
  const handleFileUpload = (file: File, type: 'audio' | 'video' | 'image') => {
    const fileId = `${type}_${Date.now()}`
    setUploadedFiles(prev => ({ ...prev, [fileId]: file }))
    
    setNewQuestion(prev => ({
      ...prev,
      mediaFiles: {
        ...prev.mediaFiles,
        [type]: fileId
      }
    }))

    toast({
      title: "File Uploaded",
      description: `${type} file uploaded successfully!`,
    })
  }

  // Handle section change and auto-update part info
  const handleSectionChange = (section: string) => {
    const parts = getAvailableParts(section)
    setNewQuestion(prev => ({
      ...prev,
      section: section as any,
      part: parts[0]?.number || 1,
      partName: parts[0]?.name || ""
    }))
  }

  // Handle part change and auto-update part name
  const handlePartChange = (partNumber: number) => {
    const parts = getAvailableParts(newQuestion.section || "")
    const selectedPart = parts.find(p => p.number === partNumber)
    setNewQuestion(prev => ({
      ...prev,
      part: partNumber,
      partName: selectedPart?.name || ""
    }))
  }

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const resetNewQuestion = () => {
    setNewQuestion({
      section: "listening",
      part: 1,
      partName: "",
      taskType: "mcq",
      prompt: "",
      instructions: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      mediaFiles: {},
      timing: { preparationTime: 0, responseTime: 0, totalTime: 0 },
      difficulty: "intermediate",
      points: 10,
      wordCount: { min: 0, max: 0 },
      metadata: { scenario: "", context: "", targetSkills: [] }
    })
    setUploadedFiles({})
  }

  const handleAddQuestion = () => {
    if (!newQuestion.section || !newQuestion.taskType || !newQuestion.prompt || !newQuestion.part) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Section, Part, Task Type, and Prompt).",
        variant: "destructive",
      })
      return
    }

    if (newQuestion.taskType === "mcq") {
      const validOptions = newQuestion.options?.filter((opt) => opt.trim() !== "") || []
      if (validOptions.length < 2) {
        toast({
          title: "Error",
          description: "Multiple choice questions need at least 2 options.",
          variant: "destructive",
        })
        return
      }
      if (!newQuestion.correctAnswer) {
        toast({
          title: "Error",
          description: "Please select the correct answer for multiple choice questions.",
          variant: "destructive",
        })
        return
      }
    }

    // Validate media requirements based on section and part
    if (newQuestion.section === 'listening' && !newQuestion.mediaFiles?.audio) {
      toast({
        title: "Error",
        description: "Listening questions require an audio file.",
        variant: "destructive",
      })
      return
    }

    if (newQuestion.section === 'speaking' && [3, 4, 5, 8].includes(newQuestion.part!) && !newQuestion.mediaFiles?.image) {
      toast({
        title: "Error",
        description: "This speaking task requires an image.",
        variant: "destructive",
      })
      return
    }

    if (newQuestion.section === 'listening' && newQuestion.part === 5 && !newQuestion.mediaFiles?.video) {
      toast({
        title: "Error",
        description: "Listening Part 5 requires a video file.",
        variant: "destructive",
      })
      return
    }

    const question: CELPIPQuestion = {
      id: Date.now().toString(),
      section: newQuestion.section!,
      part: newQuestion.part!,
      partName: newQuestion.partName!,
      taskType: newQuestion.taskType!,
      prompt: newQuestion.prompt!,
      instructions: newQuestion.instructions,
      difficulty: newQuestion.difficulty || "intermediate",
      points: newQuestion.points || 10,
      timing: newQuestion.timing,
      wordCount: newQuestion.wordCount,
      metadata: newQuestion.metadata,
      ...(newQuestion.taskType === "mcq" && {
        options: newQuestion.options?.filter((opt) => opt.trim() !== ""),
        correctAnswer: newQuestion.correctAnswer,
      }),
      ...(newQuestion.mediaFiles && { mediaFiles: newQuestion.mediaFiles }),
    }

    setQuestions([...questions, question])
    resetNewQuestion()
    setIsAddingQuestion(false)

    toast({
      title: "Success",
      description: "CELPIP question added successfully!",
    })
  }

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
    toast({
      title: "Success",
      description: "Question deleted successfully!",
    })
  }

  const handleEditQuestion = (id: string) => {
    const question = questions.find((q) => q.id === id)
    if (question) {
      setNewQuestion({
        ...question,
        options: question.options || ["", "", "", ""],
        timing: question.timing || { preparationTime: 0, responseTime: 0, totalTime: 0 },
        wordCount: question.wordCount || { min: 0, max: 0 },
        metadata: question.metadata || { scenario: "", context: "", targetSkills: [] }
      })
      setEditingQuestion(id)
      setIsAddingQuestion(true)
    }
  }

  const handleUpdateQuestion = () => {
    if (!editingQuestion) return

    if (!newQuestion.section || !newQuestion.taskType || !newQuestion.prompt || !newQuestion.part) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const updatedQuestion: CELPIPQuestion = {
      id: editingQuestion,
      section: newQuestion.section!,
      part: newQuestion.part!,
      partName: newQuestion.partName!,
      taskType: newQuestion.taskType!,
      prompt: newQuestion.prompt!,
      instructions: newQuestion.instructions,
      difficulty: newQuestion.difficulty || "intermediate",
      points: newQuestion.points || 10,
      timing: newQuestion.timing,
      wordCount: newQuestion.wordCount,
      metadata: newQuestion.metadata,
      ...(newQuestion.taskType === "mcq" && {
        options: newQuestion.options?.filter((opt) => opt.trim() !== ""),
        correctAnswer: newQuestion.correctAnswer,
      }),
      ...(newQuestion.mediaFiles && { mediaFiles: newQuestion.mediaFiles }),
    }

    setQuestions(questions.map((q) => (q.id === editingQuestion ? updatedQuestion : q)))
    resetNewQuestion()
    setIsAddingQuestion(false)
    setEditingQuestion(null)

    toast({
      title: "Success",
      description: "Question updated successfully!",
    })
  }

  const updateNewQuestionOption = (index: number, value: string) => {
    const updatedOptions = [...(newQuestion.options || ["", "", "", ""])]
    updatedOptions[index] = value
    setNewQuestion({ ...newQuestion, options: updatedOptions })
  }

  const toggleQuestionExpansion = (id: string) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedQuestions(newExpanded)
  }

  const cancelEdit = () => {
    resetNewQuestion()
    setIsAddingQuestion(false)
    setEditingQuestion(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 px-auto"
    >
      <div className="flex items-center justify-between max-435:flex-col max-435:items-start max-435:gap-[2rem]">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground mt-2">Manage CELPIP test questions and content</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="card-outline">
            Total Questions: {questions.length}
          </Badge>
          <Button onClick={() => setIsAddingQuestion(true)} className="glow">
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </div>
      </div>

      {isAddingQuestion && (
        <BorderSpotlight
          color="#5ea0ff"
          brightness={1}
          feather={80}
          borderWidth={7}
          borderRadius="1.5rem"
          >
        <Card className="glassmorphic-dashboard">
          <CardHeader>
            <CardTitle>{editingQuestion ? "Edit Question" : "Add New Question"}</CardTitle>
            <CardDescription>
              {editingQuestion ? "Update the existing question" : "Create a new question for the CELPIP test"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Section *</Label>
                <Select
                  value={newQuestion.section}
                  onValueChange={handleSectionChange}
                >
                  <SelectTrigger className="glass-card border-white/10">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="listening">Listening</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                    <SelectItem value="speaking">Speaking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Part *</Label>
                <Select
                  value={newQuestion.part?.toString()}
                  onValueChange={(value) => handlePartChange(parseInt(value))}
                >
                  <SelectTrigger className="glass-card border-white/10">
                    <SelectValue placeholder="Select part" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableParts(newQuestion.section || "").map((part) => (
                      <SelectItem key={`part-${part.number}`} value={part.number.toString()}>
                        Part {part.number}: {part.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Task Type *</Label>
                <Select
                  value={newQuestion.taskType}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, taskType: value })}
                >
                  <SelectTrigger className="glass-card border-white/10">
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice</SelectItem>
                    <SelectItem value="email">Email Writing</SelectItem>
                    <SelectItem value="survey">Survey Response</SelectItem>
                    <SelectItem value="description">Description</SelectItem>
                    <SelectItem value="advice">Giving Advice</SelectItem>
                    <SelectItem value="experience">Personal Experience</SelectItem>
                    <SelectItem value="prediction">Making Predictions</SelectItem>
                    <SelectItem value="comparison">Comparing & Persuading</SelectItem>
                    <SelectItem value="situation">Difficult Situation</SelectItem>
                    <SelectItem value="opinion">Expressing Opinion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select
                  value={newQuestion.difficulty}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value as 'beginner' | 'intermediate' | 'advanced' })}
                >
                  <SelectTrigger className="glass-card border-white/10">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Points</Label>
                <Input
                  type="number"
                  placeholder="Enter points (e.g., 10)"
                  value={newQuestion.points}
                  onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) || 10 })}
                  className="glass-card border-white/10"
                  min="1"
                  max="100"
                />
              </div>
            </div>

            {/* Timing Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Preparation Time (seconds)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 30"
                  value={newQuestion.timing?.preparationTime || 0}
                  onChange={(e) => setNewQuestion({ 
                    ...newQuestion, 
                    timing: { 
                      ...newQuestion.timing, 
                      preparationTime: parseInt(e.target.value) || 0 
                    } 
                  })}
                  className="glass-card border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Response Time (seconds)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 90"
                  value={newQuestion.timing?.responseTime || 0}
                  onChange={(e) => setNewQuestion({ 
                    ...newQuestion, 
                    timing: { 
                      ...newQuestion.timing, 
                      responseTime: parseInt(e.target.value) || 0 
                    } 
                  })}
                  className="glass-card border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label>Total Time (seconds)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 180"
                  value={newQuestion.timing?.totalTime || 0}
                  onChange={(e) => setNewQuestion({ 
                    ...newQuestion, 
                    timing: { 
                      ...newQuestion.timing, 
                      totalTime: parseInt(e.target.value) || 0 
                    } 
                  })}
                  className="glass-card border-white/10"
                />
              </div>
            </div>

            {/* Word Count for Writing Tasks */}
            {(newQuestion.section === 'writing') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Minimum Words</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 150"
                    value={newQuestion.wordCount?.min || 0}
                    onChange={(e) => setNewQuestion({ 
                      ...newQuestion, 
                      wordCount: { 
                        ...newQuestion.wordCount, 
                        min: parseInt(e.target.value) || 0 
                      } 
                    })}
                    className="glass-card border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Maximum Words</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 200"
                    value={newQuestion.wordCount?.max || 0}
                    onChange={(e) => setNewQuestion({ 
                      ...newQuestion, 
                      wordCount: { 
                        ...newQuestion.wordCount, 
                        max: parseInt(e.target.value) || 0 
                      } 
                    })}
                    className="glass-card border-white/10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Question Prompt *</Label>
              <Textarea
                placeholder="Enter the question prompt..."
                value={newQuestion.prompt}
                onChange={(e) => setNewQuestion({ ...newQuestion, prompt: e.target.value })}
                className="glass-card border-white/10 min-h-[100px]"
              />
            </div>

            {/* Instructions Field */}
            <div className="space-y-2">
              <Label>Instructions</Label>
              <Textarea
                placeholder="Enter specific instructions for this question..."
                value={newQuestion.instructions}
                onChange={(e) => setNewQuestion({ ...newQuestion, instructions: e.target.value })}
                className="glass-card border-white/10 min-h-[80px]"
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Media Files</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Audio Upload */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Audio File
                  </Label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file, 'audio')
                      }}
                      className="hidden"
                      id="audio-upload"
                    />
                    <label htmlFor="audio-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload audio</p>
                    </label>
                    {newQuestion.mediaFiles?.audio && (
                      <p className="text-xs text-green-400 mt-2">Audio uploaded</p>
                    )}
                  </div>
                </div>

                {/* Video Upload */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video File
                  </Label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file, 'video')
                      }}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload video</p>
                    </label>
                    {newQuestion.mediaFiles?.video && (
                      <p className="text-xs text-green-400 mt-2">Video uploaded</p>
                    )}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    Image File
                  </Label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(file, 'image')
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload image</p>
                    </label>
                    {newQuestion.mediaFiles?.image && (
                      <p className="text-xs text-green-400 mt-2">Image uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {newQuestion.taskType === "mcq" && (
              <>
                <div className="space-y-2">
                  <Label>Answer Options *</Label>
                  <div className="space-y-3">
                    {newQuestion.options?.map((option, index) => (
                      <div key={`option-${index}`} className="flex items-center space-x-2">
                        <span className="text-sm font-mono w-8">{String.fromCharCode(65 + index)}.</span>
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => updateNewQuestionOption(index, e.target.value)}
                          className="glass-card border-white/10 flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Correct Answer *</Label>
                  <Select
                    value={newQuestion.correctAnswer}
                    onValueChange={(value) => setNewQuestion({ ...newQuestion, correctAnswer: value })}
                  >
                    <SelectTrigger className="glass-card border-white/10">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {newQuestion.options
                        ?.filter((opt) => opt.trim() !== "")
                        .map((option, index) => (
                          <SelectItem key={`correct-answer-${index}`} value={option}>
                            {String.fromCharCode(65 + index)}. {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Media URL (Optional)</Label>
              <Input
                placeholder="Enter audio/image URL..."
                value={newQuestion.mediaUrl}
                onChange={(e) => setNewQuestion({ ...newQuestion, mediaUrl: e.target.value })}
                className="glass-card border-white/10"
              />
              <p className="text-xs text-muted-foreground">
                For listening questions, provide an audio file URL. For reading questions, provide an image URL if
                needed.
              </p>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-white/10">
              <Button onClick={editingQuestion ? handleUpdateQuestion : handleAddQuestion} className="glow">
                <Save className="h-4 w-4 mr-2" />
                {editingQuestion ? "Update Question" : "Save Question"}
              </Button>
              <Button variant="outline" onClick={cancelEdit} className="glass-card bg-transparent">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
        </BorderSpotlight>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between max-435:flex-col max-435:items-start max-435:gap-[2rem]">
          <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
          <div className="flex space-x-2">
            {["listening", "reading", "writing", "speaking"].map((section) => (
              <Badge key={`section-${section}`} variant="outline" className="capitalize">
                {section}: {questions.filter((q) => q.section === section).length}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {questions.map((question) => (
            <BorderSpotlight
            key={`spotlight-${question.id}`}
            color="#5ea0ff"
            brightness={1}
            feather={80}
            borderWidth={7}
            borderRadius="1.5rem"
            >
            <Card className="glassmorphic-dashboard">
              <CardHeader>
                <div className="flex items-center justify-between max-435:flex-col max-435:items-start max-435:gap-[2rem]">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="capitalize">
                      {question.section}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {question.type}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {question.difficulty}
                    </Badge>
                    <Badge variant="outline">{question.points} pts</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleQuestionExpansion(question.id)}
                      className="hover:bg-white/10"
                    >
                      {expandedQuestions.has(question.id) ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditQuestion(question.id)}
                      className="hover:bg-white/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="hover:bg-red-500/20 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{question.prompt}</p>

                {expandedQuestions.has(question.id) && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-sm font-medium mb-2">Full Prompt:</p>
                      <p className="text-sm text-muted-foreground bg-black/20 p-3 rounded-lg">{question.prompt}</p>
                    </div>

                    {question.options && (
                      <div>
                        <p className="text-sm font-medium mb-2">Options:</p>
                        <ul className="space-y-1">
                          {question.options.map((option, index) => (
                            <li
                              key={`question-${question.id}-option-${index}`}
                              className={`text-sm flex items-center space-x-2 p-2 rounded ${
                                option === question.correctAnswer
                                  ? "bg-green-500/20 text-green-400 font-medium"
                                  : "text-muted-foreground bg-black/10"
                              }`}
                            >
                              <span className="font-mono">{String.fromCharCode(65 + index)}.</span>
                              <span>{option}</span>
                              {option === question.correctAnswer && (
                                <Badge variant="secondary" className="ml-auto text-xs">
                                  Correct
                                </Badge>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {question.mediaUrl && (
                      <div>
                        <p className="text-sm font-medium mb-2">Media:</p>
                        <p className="text-sm text-blue-400 font-mono bg-black/20 p-2 rounded">{question.mediaUrl}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            </BorderSpotlight>
          ))}
        </div>

        {questions.length === 0 && (
          <Card className="card-outline">
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">No questions added yet.</p>
              <Button onClick={() => setIsAddingQuestion(true)} className="glow">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Question
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </motion.div>
  )
}
