import axios from 'axios';
import React, { FormEvent, useEffect, useRef, useState } from 'react';

interface ModalProps {
  eventId: string | null | undefined;
  isOpen: boolean;
  disabled: boolean;
  onClose: () => void;
  onJoinEvent: (newAvailableSpots: number) => void;
}

interface EventData {
  name: string;
  description: string;
  availableSpots: number;
  date: string;
}

const JoinEventModal: React.FC<ModalProps> = ({
  eventId,
  disabled,
  isOpen,
  onClose,
  onJoinEvent,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      onClose();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
      onClose();
    }
  };

  const handleEscapePress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsModalOpen(false);
      onClose();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapePress);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [isModalOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData) as unknown as EventData;
    const payload = { ...formValues, event_id: eventId }; // Add eventId to the payload
    const response = await axios.post(
      'http://localhost:4000/api/events/join',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const newAvailableSpots = response.data.availableSpots; // Assuming the response contains the updated available spots
    console.log('New available spots:', response.data);
    onJoinEvent(parseInt(newAvailableSpots) - 1);
    toggleModal(); // Close the modal after submission
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              ref={modalRef}
              className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="mt-2">
                      <form
                        className="space-y-1"
                        action="#"
                        onSubmit={handleSubmit}
                      >
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Full Name:
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-900"
                          >
                            Email:
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="user-email"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Join Event
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinEventModal;