import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type JoinEvent = {
  id: number;
  fullName: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JoinEvent | { message: string }>
) {
  if (req.method === 'POST') {
    try {
      const joinEventResp = await axios.post<JoinEvent>('http://localhost:4000/api/events/join', req.body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const joinEvent: JoinEvent = joinEventResp.data;
      res.status(201).json(joinEvent);
    } catch (error) {
      console.error('Error joining event:', error);
      res.status(500).json({ message: 'Error joining event' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}