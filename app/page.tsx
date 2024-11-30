'use client'

import Image from "next/image"
import { Layout } from '@/components/layout'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <main className="flex flex-col gap-8 items-center text-center">
          <Image
            src="/logo.svg"
            alt="Modulogica logo"
            width={180}
            height={38}
            priority
          />
          
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Modulogica</h1>
            <p className="text-xl text-gray-600 mb-8">Design and deliver effective learning modules for African education</p>
          </div>

          <div className="flex gap-4 flex-col sm:flex-row">
            <a
              href="/register"
              className="rounded-full bg-foreground text-background px-8 py-3 hover:bg-[#383838]"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="rounded-full border border-black/[.08] px-8 py-3 hover:bg-[#f2f2f2]"
            >
              Learn More
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Design Modules</CardTitle>
                <CardDescription>Create customized learning modules tailored to your needs</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>Monitor student engagement and learning outcomes</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connect</CardTitle>
                <CardDescription>Join a network of educators across Africa</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    </Layout>
  )
}