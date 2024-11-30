import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, name, surname, region, language, email, password, institutionName, institutionType } = req.body

      const user = await prisma.user.create({
        data: {
          title,
          name,
          surname,
          region,
          language,
          email,
          password, // Note: In a real application, you should hash the password before storing it
          institution: {
            create: {
              name: institutionName,
              type: institutionType,
            },
          },
        },
      })

      res.status(201).json({ message: 'User registered successfully', userId: user.id })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      res.status(500).json({ message: 'Error registering user', error: errorMessage })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}