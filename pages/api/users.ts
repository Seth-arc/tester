import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Institution {
  id: string;
  name: string;
  type: string;
}

interface User {
  id: string;
  title: string;
  name: string;
  surname: string;
  region: string;
  language: string;
  email: string;
  institution: Institution;
}

interface UserWithCoordinates extends User {
  latitude: number;
  longitude: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        include: {
          institution: true,
        },
      }) as User[]

      const usersWithCoordinates: UserWithCoordinates[] = users.map((user) => ({
        ...user,
        latitude: Math.random() * (37 - (-35)) + (-35), // Random latitude within Africa
        longitude: Math.random() * (51 - (-17)) + (-17), // Random longitude within Africa
      }))

      res.status(200).json(usersWithCoordinates)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(500).json({ message: 'Error fetching users', error: errorMessage })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}