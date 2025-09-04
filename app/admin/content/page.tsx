"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from "lucide-react"

interface Question {
  id: string
  section: string
  type: string
  prompt: string
  options?: string[]
  correctAnswer?: string
  mediaUrl?: string
  difficulty: string
  points: number
}

const initialMockQuestions: Question[] = [
  {
    id: "1",
    section: "listening",
    type: "mcq",
    prompt: "What is the main topic of the conversation?",
    options: ["Travel plans", "Work schedule", "Weather forecast", "Restaurant review"],
    correctAnswer: "Travel plans",
    mediaUrl: "/audio/listening-1.mp3",
    difficulty: "intermediate",
    points: 10,
  },
  {
    id: "2",
    section: "reading",
    type: "mcq",
    prompt: "According to the passage, what is the author's main argument?",
    options: ["Technology is harmful", "Education needs reform", "Climate change is urgent", "Economy is improving"],
    correctAnswer: "Climate change is urgent",
    difficulty: "advanced",
    points: 15,
  },
  {
    id: "3",
    section: "writing",
    type: "text",
    prompt:
      "Write an email to your friend about a recent vacation you took. Include details about where you went, what you did, and your overall experience. (150-200 words)",
    difficulty: "intermediate",
    points: 25,
  },
  {
    id: "4",
    section: "speaking",
    type: "audio",
    prompt:
      "Describe a memorable experience from your childhood. Explain what happened, who was involved, and why it was significant to you. You have 60 seconds to prepare and 90 seconds to speak.",
    difficulty: "intermediate",
    points: 20,
  },
]

export default function ContentManagementPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    section: "",
    type: "",
    prompt: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    mediaUrl: "",
    difficulty: "intermediate",
    points: 10,
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

  const handleAddQuestion = () => {
    if (!newQuestion.section || !newQuestion.type || !newQuestion.prompt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Section, Type, and Prompt).",
        variant: "destructive",
      })
      return
    }

    if (newQuestion.type === "mcq") {
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

    const question: Question = {
      id: Date.now().toString(),
      section: newQuestion.section!,
      type: newQuestion.type!,
      prompt: newQuestion.prompt!,
      difficulty: newQuestion.difficulty || "intermediate",
      points: newQuestion.points || 10,
      ...(newQuestion.type === "mcq" && {
        options: newQuestion.options?.filter((opt) => opt.trim() !== ""),
        correctAnswer: newQuestion.correctAnswer,
      }),
      ...(newQuestion.mediaUrl && { mediaUrl: newQuestion.mediaUrl }),
    }

    setQuestions([...questions, question])
    setNewQuestion({
      section: "",
      type: "",
      prompt: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      mediaUrl: "",
      difficulty: "intermediate",
      points: 10,
    })
    setIsAddingQuestion(false)

    toast({
      title: "Success",
      description: "Question added successfully!",
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
      })
      setEditingQuestion(id)
      setIsAddingQuestion(true)
    }
  }

  const handleUpdateQuestion = () => {
    if (!editingQuestion) return

    if (!newQuestion.section || !newQuestion.type || !newQuestion.prompt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const updatedQuestion: Question = {
      id: editingQuestion,
      section: newQuestion.section!,
      type: newQuestion.type!,
      prompt: newQuestion.prompt!,
      difficulty: newQuestion.difficulty || "intermediate",
      points: newQuestion.points || 10,
      ...(newQuestion.type === "mcq" && {
        options: newQuestion.options?.filter((opt) => opt.trim() !== ""),
        correctAnswer: newQuestion.correctAnswer,
      }),
      ...(newQuestion.mediaUrl && { mediaUrl: newQuestion.mediaUrl }),
    }

    setQuestions(questions.map((q) => (q.id === editingQuestion ? updatedQuestion : q)))
    setNewQuestion({
      section: "",
      type: "",
      prompt: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      mediaUrl: "",
      difficulty: "intermediate",
      points: 10,
    })
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
    setNewQuestion({
      section: "",
      type: "",
      prompt: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      mediaUrl: "",
      difficulty: "intermediate",
      points: 10,
    })
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
        <Card className="card-outline glass-card border-blue-500/20">
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
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, section: value })}
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
                <Label>Question Type *</Label>
                <Select
                  value={newQuestion.type}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value })}
                >
                  <SelectTrigger className="glass-card border-white/10">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">Multiple Choice</SelectItem>
                    <SelectItem value="text">Text Response</SelectItem>
                    <SelectItem value="audio">Audio Response</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select
                  value={newQuestion.difficulty}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, difficulty: value })}
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
            </div>

            <div className="space-y-2">
              <Label>Points</Label>
              <Input
                type="number"
                placeholder="Enter points (e.g., 10)"
                value={newQuestion.points}
                onChange={(e) => setNewQuestion({ ...newQuestion, points: Number.parseInt(e.target.value) || 10 })}
                className="glass-card border-white/10"
                min="1"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label>Question Prompt *</Label>
              <Textarea
                placeholder="Enter the question prompt..."
                value={newQuestion.prompt}
                onChange={(e) => setNewQuestion({ ...newQuestion, prompt: e.target.value })}
                className="glass-card border-white/10 min-h-[100px]"
              />
            </div>

            {newQuestion.type === "mcq" && (
              <>
                <div className="space-y-2">
                  <Label>Answer Options *</Label>
                  <div className="space-y-3">
                    {newQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
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
                          <SelectItem key={index} value={option}>
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
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between max-435:flex-col max-435:items-start max-435:gap-[2rem]">
          <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
          <div className="flex space-x-2">
            {["listening", "reading", "writing", "speaking"].map((section) => (
              <Badge key={section} variant="outline" className="capitalize">
                {section}: {questions.filter((q) => q.section === section).length}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {questions.map((question) => (
            <Card key={question.id} className="card-outline">
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
                              key={index}
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
