'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface ModuleData {
  title: string;
  role: string;
  digitalProficiency: string;
  institutionType: string;
  discipline: string;
  academicLevel: string;
  duration: string;
  language: string;
  deliveryMode: string;
  lms: string;
  classSize: string;
  accessChannels: string[];
  learningObjectives: string[];
  challenges: string[];
  pedagogicGoals: string[];
}

interface ModuleDesignProps {
  onComplete: () => void;
}

interface CustomTarget {
  name: keyof ModuleData;
  value: string;
  type?: string;
  checked?: boolean;
}

type CustomChangeEvent = {
  target: CustomTarget;
}

export function ModuleDesign({ onComplete }: ModuleDesignProps) {
  const router = useRouter()
  const [moduleData, setModuleData] = useState<ModuleData>({
    title: '',
    role: '',
    digitalProficiency: '',
    institutionType: '',
    discipline: '',
    academicLevel: '',
    duration: '',
    language: '',
    deliveryMode: '',
    lms: '',
    classSize: '',
    accessChannels: [],
    learningObjectives: ['', '', '', ''],
    challenges: [],
    pedagogicGoals: []
  })

  useEffect(() => {
    const savedData = localStorage.getItem('moduleData')
    if (savedData) {
      setModuleData(JSON.parse(savedData))
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | CustomChangeEvent) => {
    const target = 'type' in e.target 
      ? e.target as HTMLInputElement 
      : e.target as CustomTarget;

    const { name, value, type, checked } = target;
    let updatedData: ModuleData;

    if (type === 'checkbox' && checked !== undefined) {
      const updatedArray = checked
        ? [...(moduleData[name as keyof ModuleData] as string[]), value]
        : (moduleData[name as keyof ModuleData] as string[]).filter(item => item !== value);
      updatedData = { ...moduleData, [name]: updatedArray };
    } else {
      updatedData = { ...moduleData, [name]: value };
    }

    setModuleData(updatedData);
    localStorage.setItem('moduleData', JSON.stringify(updatedData));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    localStorage.setItem('moduleData', JSON.stringify(moduleData))
    toast.success("Module design saved successfully!")
    onComplete()
    router.push('/design/template')
  }

  const handleSelectChange = (name: keyof ModuleData) => (value: string) => {
    handleChange({ target: { name, value } })
  }

  const handleCheckboxChange = (name: keyof ModuleData, value: string) => (checked: boolean) => {
    handleChange({ target: { name, value, type: 'checkbox', checked } })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Design Your Module</CardTitle>
          <CardDescription>Fill in the details to create your customized module template.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Module Details</TabsTrigger>
              <TabsTrigger value="objectives">Objectives</TabsTrigger>
              <TabsTrigger value="challenges">Challenges & Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <Label htmlFor="title">Module Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={moduleData.title} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="role">Your Role</Label>
                  <Select 
                    name="role" 
                    onValueChange={handleSelectChange('role')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lecturer">Lecturer</SelectItem>
                      <SelectItem value="lms-admin">LMS Administrator</SelectItem>
                      <SelectItem value="instructional-designer">Instructional/Learning Designer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="digitalProficiency">Digital Proficiency Level</Label>
                  <Select 
                    name="digitalProficiency" 
                    onValueChange={handleSelectChange('digitalProficiency')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your digital proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="poor">Poor</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="not-sure">Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <Label htmlFor="institutionType">Institution Type</Label>
                  <Select 
                    name="institutionType" 
                    onValueChange={handleSelectChange('institutionType')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select institution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="community-education">Community Education Initiative</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="discipline">Module Discipline</Label>
                  <Select 
                    name="discipline" 
                    onValueChange={handleSelectChange('discipline')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select module discipline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="law">Law</SelectItem>
                      <SelectItem value="stem">STEM</SelectItem>
                      <SelectItem value="social-sciences">Social Sciences</SelectItem>
                      <SelectItem value="environmental-studies">Environmental Studies</SelectItem>
                      <SelectItem value="humanities">Humanities</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="objectives" className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <Label>Module Learning Objectives</Label>
                  {moduleData.learningObjectives.map((_, index) => (
                    <div key={index} className="mt-2">
                      <Label htmlFor={`objective-${index}`}>Objective {index + 1}</Label>
                      <Textarea
                        id={`objective-${index}`}
                        name={`learningObjectives[${index}]`}
                        value={moduleData.learningObjectives[index]}
                        onChange={(e) => {
                          const newObjectives = [...moduleData.learningObjectives]
                          newObjectives[index] = e.target.value
                          setModuleData(prevState => ({
                            ...prevState,
                            learningObjectives: newObjectives
                          }))
                        }}
                        placeholder="I want students to [understand/apply/analyze/evaluate/create] ..."
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <Label>Module Challenges</Label>
                  <div className="space-y-2">
                    {[
                      'Language Barriers',
                      'Lack of Accessibility Tools',
                      'Limited digital skills',
                      'Low levels of student engagement with content',
                      'Poor assessment outcomes',
                      'Limited necessary preparatory knowledge',
                      'Limited time for content delivery',
                      'Low levels of peer interaction',
                      'Low quality of available content',
                      'Limited access to learning materials',
                      'Cultural differences',
                      'Technological constraints',
                      'Limited instructor-student interaction',
                      'High dropout and attrition rates',
                      'Other'
                    ].map((challenge) => (
                      <div key={challenge} className="flex items-center space-x-2">
                        <Checkbox
                          id={`challenge-${challenge}`}
                          name="challenges"
                          value={challenge}
                          checked={moduleData.challenges.includes(challenge)}
                          onCheckedChange={handleCheckboxChange('challenges', challenge)}
                        />
                        <Label htmlFor={`challenge-${challenge}`}>{challenge}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Pedagogic Goals</Label>
                  <div className="space-y-2">
                    {[
                      'Critical Thinking',
                      'Problem-Solving Skills',
                      'Subject Mastery',
                      'Practical Application',
                      'Collaboration',
                      'Communication Skills',
                      'Digital Literacy',
                      'Research Skills',
                      'Global Awareness',
                      'Lifelong Learning',
                      'Ethical Reasoning',
                      'Innovation and Creativity',
                      'Cultural Competence',
                      'Engagement and Motivation',
                      'Assessment Literacy',
                      'Data Literacy'
                    ].map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={`goal-${goal}`}
                          name="pedagogicGoals"
                          value={goal}
                          checked={moduleData.pedagogicGoals.includes(goal)}
                          onCheckedChange={handleCheckboxChange('pedagogicGoals', goal)}
                        />
                        <Label htmlFor={`goal-${goal}`}>{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Save Module Design</Button>
        </CardFooter>
      </Card>
    </form>
  )
}