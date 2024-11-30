'use client'

import { Layout } from '../../../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function TemplateDesign() {
  const router = useRouter()

  const handleTemplateSelect = () => {
    toast.success("Template selected successfully!")
    router.push('/design')
  }

  return (
    <Layout>
      <motion.div 
        className="max-w-6xl mx-auto p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Module Design Templates</CardTitle>
            <CardDescription>Choose from our pre-designed templates to get started quickly</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((template) => (
              <Card key={template} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Template {template}</CardTitle>
                  <CardDescription>
                    A professionally designed template that&apos;s perfect for your module
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleTemplateSelect}
                    className="w-full"
                  >
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  )
}