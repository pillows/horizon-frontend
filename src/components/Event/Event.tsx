import React, { useState } from 'react';
import { JoinEventModal } from '../JoinEventModal';

type EventProps = {
  eventId: string;
  name: string;
  initialAvailableSpots: number;
  startDate: string;
  description: string;
};

const Event: React.FC<EventProps> = ({
  eventId,
  name,
  initialAvailableSpots,
  startDate,
  description,
}) => {
  const [availableSpots, setAvailableSpots] = useState(initialAvailableSpots);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleJoinEvent = () => {
    setAvailableSpots(availableSpots - 1);
    setIsModalOpen(false);
  };

  return (
    <div
      style={{ wordWrap: 'break-word' }}
      className="mt-5 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Starts: {formatDate(startDate)}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {availableSpots} spot{availableSpots > 1 ? 's' : ''} left
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={availableSpots === 0}
        className={`${availableSpots === 0 && 'disabled:opacity-50'} mt-3 text-blue-600`}
        type="button"
      >
        {availableSpots === 0 ? 'No spots remaining' : 'Join Event'}
      </button>
      <JoinEventModal
        eventId={eventId}
        disabled={availableSpots === 0}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJoinEvent={handleJoinEvent}
      />
    </div>
  );
};

export default Event;