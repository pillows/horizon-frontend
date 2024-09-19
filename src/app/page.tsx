'use client';

import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Event } from '@/components/Event';
import Modal from '@/components/Modal/Modal';

type Event = {
  id: number | null | undefined;
  name: string;
  available_spots: number;
  start_date: string;
  description: string;
};

interface EventData {
  name: string;
  description: string;
  availableSpots: number;
  startDate: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventData, setEventData] = useState<EventData>({
    name: '',
    description: '',
    availableSpots: 1,
    startDate: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResp = await axios.get<Event[]>('/api/events');
        const events: Event[] = eventsResp.data;
        setEvents(events);
        setLoading(true);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    void fetchEvents(); // Ensure the promise is handled correctly
  }, []); // Empty dependency array ensures this runs only once

  const addEvent = async (newEvent: Omit<Event, 'id'>) => {
    try {
      const addEventResponse = await axios.post<Event>(
        '/api/events',
        newEvent,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const addedEvent: Event = addEventResponse.data;
      setEvents((prevEvents) => [...prevEvents, addedEvent]);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const onClose = () => setIsModalOpen(false);

  const handleFormSubmit = async (data: EventData) => {
    setIsModalOpen(false); // Close the modal after submission
    // Here you can also send the data to an API or perform any other action
    const eventName = data.name || '';
    const eventDescription = data.description || '';
    const availableSpots = data.availableSpots || 0;
    const date = data.startDate || '';
    await addEvent({
      name: eventName,
      start_date: date,
      available_spots: availableSpots,
      description: eventDescription,
    });
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
          <Modal isOpen={false} onClose={onClose} onSubmit={handleFormSubmit} />
          <div>
            {loading ? (
              <h2 className="mt-4 text-xl font-semibold">Events</h2>
            ) : (
              <div className="mt-5 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow">
                'Loading...'
              </div>
            )}

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {events.map((event) => {
                const currentDate = new Date();
                const eventDate = new Date(event.start_date);

                // Set both dates to the start of their respective days
                currentDate.setHours(0, 0, 0, 0);
                eventDate.setHours(0, 0, 0, 0);

                const isPastEvent = eventDate < currentDate;

                // Leaving this code here in the event that we want to skip past events
                // if (isPastEvent) return null;
                return (
                  <Event
                    key={event.id}
                    eventId={event.id?.toString() ?? ''}
                    description={event.description}
                    startDate={event.start_date}
                    name={event.name}
                    initialAvailableSpots={event.available_spots}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
