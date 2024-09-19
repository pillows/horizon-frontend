import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

type Event = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  available_spots: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Event[] | Event | { message: string }>,
) {
  if (req.method === 'GET') {
    try {
      const eventsResp = await axios.get<Event[]>(
        `${process.env.NEXT_BACKEND_URL}/api/events`,
      );
      const events: Event[] = eventsResp.data;
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Error fetching events' });
    }
  } else if (req.method === 'POST') {
    try {
      const createdEventResp = await axios.post<Event>(
        `${process.env.NEXT_BACKEND_URL}/api/events`,
        req.body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const createdEvent: Event = createdEventResp.data;
      res.status(201).json(createdEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Error creating event' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
