'use client'

import { TeachingStyleQuiz } from '@/components/teaching-style-quiz'
import { Layout } from '@/components/layout'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface QuizResults {
  answers: Record<number, string>;
  timestamp: number;
}

export default function AssessmentPage() {
  const router = useRouter()

  const handleQuizComplete = (results: QuizResults) => {
    localStorage.setItem('quizResults', JSON.stringify(results))
    toast.success("Assessment completed successfully!")
    router.push('/assessment/results')
  }

  return (
    <Layout>
      <TeachingStyleQuiz onComplete={handleQuizComplete} />
    </Layout>
  )
}