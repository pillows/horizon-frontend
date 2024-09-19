'use client'

import clsx from 'clsx';
import { useState, useEffect } from 'react'
import { Event } from '@/components/Event'
import Modal from '@/components/Modal/Modal';
import axios from 'axios';

type Event = {
  id: number | null | undefined;
  name: string
  available_spots: number
  start_date: string
  description: string;
}

interface EventData {
  name: string;
  description: string;
  availableSpots: number;
  startDate: string
}


export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [eventData, setEventData] = useState<EventData>({
    name: '',
    description: '',
    availableSpots: 1,
    startDate: '',
});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResp = await axios.get('/api/events');
        const events = eventsResp.data;
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
     fetchEvents();
  }, []); // Empty dependency array ensures this runs only once


  const addEvent = async (newEvent: Omit<Event, 'id'>) => {
    const addEventResponse = await axios.post('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
    const createdEvent = addEventResponse.data
    setEvents(prevEvents => [...prevEvents, createdEvent])
  }

  const onClose = () => setIsModalOpen(false);
  

  const handleFormSubmit = (data: EventData) => {
    setIsModalOpen(false);  // Close the modal after submission
    // Here you can also send the data to an API or perform any other action
    const eventName = data.name || '';
    const eventDescription = data.description || '';
    const availableSpots = data.availableSpots || 0;
    const date = data.startDate || '';
    addEvent({
      name: eventName,
      start_date: date,
      available_spots: availableSpots,
      description: eventDescription,
    });
  };

  const handleEventDataChange = (data: Partial<EventData>) => {
    setEventData(prevData => ({
      ...prevData,
      ...data
    }));
  };

  return (
    <div className="py-20">
      
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
      
        <div
          className={clsx(
            'flex',
            'min-h-[calc(100vh-theme(space.40))]',
            'flex-col',
            'space-y-2',
            'text-center',
            'items-center',
            'justify-center',
          )}
        >
          <Modal isOpen={false} onChange={handleEventDataChange} onClose={onClose} onSubmit={handleFormSubmit} />
          <div>
            <h2 className="text-xl font-semibold mt-4">Events</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {events.map((event) => (
                  <Event
                    key={event.id}
                    eventId={event.id?.toString() || ''}
                    description={event.description}
                    startDate={event.start_date}
                    name={event.name}
                    availableSpots={event.available_spots}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}