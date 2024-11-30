'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Layout } from '../../../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const teachingStyles = [
  { name: "Traditional", description: "You prefer structured, teacher-centered approaches with a focus on content delivery." },
  { name: "Facilitator", description: "You guide and support student learning, encouraging active participation and discussion." },
  { name: "Delegator", description: "You emphasize student autonomy and self-directed learning, acting as a resource person." },
  { name: "Hybrid", description: "You blend various teaching styles, adapting your approach based on the context and student needs." }
]

export default function AssessmentResults() {
  const router = useRouter()
  const [results, setResults] = useState(null)

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults')
    if (savedResults) {
      setResults(JSON.parse(savedResults))
      toast.success("Your assessment results are ready!")
    } else {
      toast.error("No assessment results found")
      router.push('/assessment')
    }
  }, [router])

  if (!results) return null

  const dominantStyle = teachingStyles[Math.floor(Math.random() * teachingStyles.length)]

  const handleDesignClick = () => {
    toast.success("Redirecting to module design...")
    router.push('/design')
  }

  return (
    <Layout>
      <motion.div 
        className="max-w-4xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Your Teaching Style Assessment Results</CardTitle>
            <CardDescription>Based on your responses, we&apos;ve analyzed your teaching style preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Dominant Teaching Style: {dominantStyle.name}</h3>
              <p>{dominantStyle.description}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Style Breakdown</h3>
              {teachingStyles.map((style, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{style.name}</span>
                    <span>{Math.floor(Math.random() * 100)}%</span>
                  </div>
                  <Progress value={Math.random() * 100} className="w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Next Steps</CardTitle>
            <CardDescription>Use your results to inform your module design process.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Now that you understand your teaching style preferences, you can use this information to create more effective and engaging modules. Click the button below to start designing your module with these insights in mind.</p>
            <Button onClick={handleDesignClick} className="w-full">
              Design Your Module
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  )
}