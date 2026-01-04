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
  // Add more events here, e.g.:
  // { id: 'holi-2025', name: 'HOLI 2025' },
];

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  const images = selectedEvent
    ? Array.from({ length: 20 }, (_, i) => `/events/${selectedEvent}/image${i + 1}.jpg`)
        .filter((src) => {
          // Simple client-side filter for existing images (optional fallback)
          // In production, just list actual filenames or predefine per event
          return true; // Replace with actual count or predefined array
        })
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

        {selectedEvent && images.length > 0 ? (
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
                />
              </div>
            ))}
          </div>
        ) : selectedEvent ? (
          <p className="text-center text-xl text-gray-600">
            No images yet for this event. Add photos to public/events/{selectedEvent}/
          </p>
        ) : null}
      </main>
    );
  }
}