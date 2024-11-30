'use client'

import { useState, useEffect } from 'react'
import { Layout } from '../../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import dynamic from 'next/dynamic'

const MapWithNoSSR = dynamic(() => import('../../components/AfricaMap'), {
  ssr: false,
})

export default function NetworkVisualization() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error))
  }, [])

  return (
    <Layout>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Modulogica Network</CardTitle>
          <CardDescription>Connecting African Educators Across the Continent</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px]">
            <MapWithNoSSR users={users} />
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}

