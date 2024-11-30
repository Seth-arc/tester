'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

interface QuizResults {
  answers: Record<number, string>;
  timestamp: number;
}

interface TeachingStyleQuizProps {
  onComplete: (results: QuizResults) => void;
}

const quizQuestions = [
  {
    question: "How do you typically plan your lessons?",
    options: [
      "I follow a structured curriculum and create detailed lesson plans.",
      "I outline key concepts and adjust based on student needs.",
      "I prefer spontaneous planning based on classroom dynamics.",
      "I focus on project-based or thematic planning."
    ]
  },
  {
    question: "What is your approach to delivering content in the classroom?",
    options: [
      "I use lectures to ensure comprehensive coverage of material.",
      "I blend lectures with interactive activities.",
      "I prioritize hands-on, experiential learning activities.",
      "I facilitate student-led discussions and collaborative work."
    ]
  },
  {
    question: "How do you assess student learning?",
    options: [
      "I rely on traditional exams and quizzes.",
      "I use a mix of formative assessments and summative evaluations.",
      "I emphasize project-based assessments and practical applications.",
      "I encourage self-assessment and peer reviews."
    ]
  },
  {
    question: "How do you see your role as a teacher in the learning process?",
    options: [
      "I am a knowledge expert who delivers content.",
      "I am a guide who facilitates learning.",
      "I am a coach who supports skill development.",
      "I am a mentor who encourages critical thinking and independence."
    ]
  },
  {
    question: "What role do you expect students to take in their own learning?",
    options: [
      "Students should absorb and recall information.",
      "Students should engage with content and participate actively.",
      "Students should apply concepts in practical scenarios.",
      "Students should take ownership of their learning journey."
    ]
  },
  {
    question: "How would you describe the interaction in your classroom?",
    options: [
      "Teacher-centered, with controlled discussions.",
      "Balanced, with teacher guidance and student input.",
      "Collaborative, with frequent group work.",
      "Student-centered, with open dialogue and peer learning."
    ]
  },
  {
    question: "What type of classroom atmosphere do you strive to create?",
    options: [
      "Disciplined and focused on academic rigor.",
      "Supportive and encouraging participation.",
      "Dynamic and engaging with varied activities.",
      "Relaxed and open, allowing for exploration."
    ]
  },
  {
    question: "How do you define learning in your teaching practice?",
    options: [
      "Learning is the acquisition of knowledge.",
      "Learning is understanding and applying concepts.",
      "Learning is skill development and practice.",
      "Learning is a transformative process of critical thinking."
    ]
  },
  {
    question: "How do you approach the development of your own teaching practices?",
    options: [
      "I follow established best practices and standards.",
      "I seek feedback and make adjustments based on it.",
      "I experiment with new methods and technologies.",
      "I reflect deeply and evolve my philosophy regularly."
    ]
  },
  {
    question: "How do you integrate pedagogical theories into your teaching?",
    options: [
      "I align my teaching with traditional educational theories.",
      "I incorporate modern pedagogical models to enhance learning.",
      "I use a blend of theories to suit different learning needs.",
      "I focus on student-centered and experiential learning theories."
    ]
  }
]

export function TeachingStyleQuiz({ onComplete }: TeachingStyleQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const router = useRouter()

  const handleAnswer = (answer: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestion]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const results: QuizResults = {
        answers,
        timestamp: Date.now()
      }
      localStorage.setItem('quizResults', JSON.stringify(results))
      onComplete(results)
      router.push('/assessment/results')
    }
  }

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Teaching Style Quiz</CardTitle>
        <CardDescription>Question {currentQuestion + 1} of {quizQuestions.length}</CardDescription>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-medium text-lg">{question.question}</p>
            <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion]}>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
        </AnimatePresence>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleNext} 
          className="w-full mt-4"
          disabled={answers[currentQuestion] === undefined}
        >
          {currentQuestion < quizQuestions.length - 1 ? 'Next' : 'Finish'}
        </Button>
      </CardFooter>
    </Card>
  )
}