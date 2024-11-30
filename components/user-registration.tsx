'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface FormData {
  title: string;
  name: string;
  surname: string;
  region: string;
  language: string;
  email: string;
  password: string;
  institutionName: string;
  institutionType: string;
}

export function UserRegistration() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    name: '',
    surname: '',
    region: '',
    language: '',
    email: '',
    password: '',
    institutionName: '',
    institutionType: '',
  })

  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Registration successful! Welcome to Modulogica!")
        router.push('/assessment')
      } else {
        throw new Error('Registration failed')
      }
    } catch {
      toast.error("Registration failed. Please try again later.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="surname">Surname</Label>
        <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="region">Region</Label>
        <Select name="region" onValueChange={handleSelectChange('region')}>
          <SelectTrigger>
            <SelectValue placeholder="Select a region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="southern-africa">Southern Africa</SelectItem>
            <SelectItem value="northern-africa">Northern Africa</SelectItem>
            <SelectItem value="eastern-africa">Eastern Africa</SelectItem>
            <SelectItem value="western-africa">Western Africa</SelectItem>
            <SelectItem value="central-africa">Central Africa</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="language">Preferred Language</Label>
        <Select name="language" onValueChange={handleSelectChange('language')}>
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="french">French</SelectItem>
            <SelectItem value="arabic">Arabic</SelectItem>
            <SelectItem value="swahili">Swahili</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="institutionName">Institution Name</Label>
        <Input id="institutionName" name="institutionName" value={formData.institutionName} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="institutionType">Institution Type</Label>
        <Select name="institutionType" onValueChange={handleSelectChange('institutionType')}>
          <SelectTrigger>
            <SelectValue placeholder="Select institution type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="university">University</SelectItem>
            <SelectItem value="college">College</SelectItem>
            <SelectItem value="technical-institute">Technical Institute</SelectItem>
            <SelectItem value="vocational-school">Vocational School</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full">Register</Button>
    </form>
  )
}