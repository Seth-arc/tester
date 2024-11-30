'use client';
import { Layout } from '../../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import toast from 'react-hot-toast';

export default function About() {
  const notifyWelcome = () => {
    toast.success("Welcome to Modulogica&apos;s About page!");
  };

  return (
    <Layout>
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={notifyWelcome}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">About Modulogica</CardTitle>
            <CardDescription>Revolutionizing module design for African educators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Modulogica is a pioneering educational technology platform dedicated to enhancing the teaching and learning experience at African universities. Founded by a team of passionate educators and technologists, Modulogica emerged from the need to bridge the gap between traditional teaching methods and modern pedagogical practices.
            </p>
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p>
              To revolutionize module design for African educators, providing them with a suite of tools that align with contemporary teaching styles and educational technologies. We are committed to enabling educators to achieve excellence in teaching by embracing adaptive, student-centered learning strategies that meet the needs of today&apos;s diverse classrooms.
            </p>
            <h2 className="text-2xl font-bold">Our Team</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Founder & CEO:</strong> With a PhD in Educational Technology, our CEO has spearheaded various initiatives aimed at integrating technology into African education systems.</li>
              <li><strong>CTO:</strong> Our CTO&apos;s expertise in software development and passion for open-source technology have been instrumental in building Modulogica&apos;s robust and user-friendly platform.</li>
              <li><strong>Head of Pedagogy:</strong> A veteran lecturer with a deep understanding of African educational challenges, our Head of Pedagogy ensures that Modulogica&apos;s solutions are pedagogically sound and culturally relevant.</li>
              <li><strong>UX/UI Designer:</strong> Our designer&apos;s work is at the heart of Modulogica&apos;s intuitive user experience, reflecting a commitment to simplicity and functionality.</li>
            </ul>
            <h2 className="text-2xl font-bold">Our History</h2>
            <p>
              Launched in 2023, Modulogica began as a research project to explore the impact of technology on teaching efficacy. It quickly gained recognition for its innovative approach to module design, securing funding from prominent educational grants. Since then, Modulogica has grown into a leading EdTech platform, serving lecturers and educational institutions across the continent.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  )
}