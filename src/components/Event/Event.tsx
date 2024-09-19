import React from 'react';
import { JoinEventModal } from '../JoinEventModal';

type EventProps = {
    eventId: string;
    name: string;
    availableSpots: number;
    startDate: string;
    description: string;
  }

const Event: React.FC<EventProps> = ({eventId, name, availableSpots, startDate, description}) => {
    const formatDate = (dateString: string) => {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    return (
        <div style={{ wordWrap: 'break-word' }} className=" mt-5 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">

        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{name}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">Starts: {formatDate(startDate)}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">{availableSpots} spot{availableSpots > 1 ? 's' : ''} left</p>
        {/* <button className="mt-3 text-blue-600 hover:underline">Join Event</button> */}
        <JoinEventModal eventId={eventId} disabled={availableSpots === 0} isOpen={false} onClose={() => console.log('test') } onSubmit={() => console.log('test2')} onChange={() => console.log('test3')} />
        </div>
    )
}

export default Event