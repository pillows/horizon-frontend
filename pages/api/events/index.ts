import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Event = {
  id: number
  name: string
  date: string
  available_spots: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[] | Event | { message: string }>
) {
  if (req.method === 'GET') {
    const eventsResp = await axios.get(`${process.env.NEXT_BACKEND_URL}/api/events`);
    const events = eventsResp.data;
    res.status(200).json(events);
  } else if (req.method === 'POST') {
    try {
        const fetchEvents = await axios.post(`${process.env.NEXT_BACKEND_URL}/api/events`, req.body, {
            headers: {
                'Content-Type': 'application/json',
        },
    });
    res.status(201).json(fetchEvents.data);
    } catch (error) {
      console.error('Error creating event:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}