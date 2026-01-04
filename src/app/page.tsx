'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Event {
  id: string;
  name: string;
}

const events: Event[] = [
  { id: 'saraswati-puja-2025', name: 'SARASWATI PUJA 2025' },
  { id: 'saraswati-puja-2026', name: 'SARASWATI PUJA 2026' },
  // Add more events here later
];

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  // For now, we'll assume up to 50 images per event named image1.jpg, image2.jpg, etc.
  // You can adjust the number or replace with exact filenames later
  const maxImages = 50;
  const images = selectedEvent
    ? Array.from({ length: maxImages }, (_, i) => `/events/${selectedEvent}/image${i + 1}.jpg`)
    : [];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Apartment Events Gallery
        </h1>

        <div className="mb-12 text-center">
          <label htmlFor="event" className="block text-xl font-medium mb-4">
            Select an Event
          </label>
          <select
            id="event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="px-6 py-3 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose an Event --</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        {selectedEvent && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Image
                  src={src}
                  alt={`Event photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    // Hide broken images (when file doesn't exist)
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {selectedEvent && images.length > 0 && (
          <p className="text-center text-gray-500 mt-8">
            Only images that exist in public/events/{selectedEvent}/ will be shown.
          </p>
        )}

        {!selectedEvent && (
          <p className="text-center text-xl text-gray-600 mt-20">
            Please select an event from the dropdown to view the gallery.
          </p>
        )}
      </main>
    );
}