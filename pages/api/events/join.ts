import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type JoinEvent = {
  id: number;
  fullName: string;
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JoinEvent | { message: string }>
) {
  if (req.method === 'POST') {
    try {
        const joinEvent = await axios.post('http://localhost:4000/api/events/join', req.body, {
            headers: {
                'Content-Type': 'application/json',
        },
    });
    res.status(201).json(joinEvent.data)
    } catch (error) {
        console.error('Error creating event:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}