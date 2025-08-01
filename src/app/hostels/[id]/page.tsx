'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';

export default function HostelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap the promise using React.use()
  const [hostel, setHostel] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/hostels/${id}`)
      .then(res => res.json())
      .then(setHostel);
  }, [id]);

  if (!hostel) return <p className="p-6">Loading...</p>;

  const totalRooms = hostel.rooms?.length || 0;
  const totalCapacity = hostel.rooms?.reduce((acc: number, r: any) => acc + (r.capacity || 0), 0);
  const totalOccupants = hostel.rooms?.reduce((acc: number, r: any) => acc + (r.occupants?.length || 0), 0);
  const totalVacancy = totalCapacity - totalOccupants;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{hostel.name}</h1>
      <p className="text-gray-700 mb-4">Location: {hostel.location}</p>

      <div className="mb-6 space-y-1">
        <p><strong>Total Rooms:</strong> {totalRooms}</p>
        <p><strong>Total Capacity:</strong> {totalCapacity}</p>
        <p><strong>Total Occupants:</strong> {totalOccupants}</p>
        <p><strong>Total Vacancy:</strong> {totalVacancy}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Rooms</h2>
      {totalRooms === 0 ? (
        <p>No rooms found.</p>
      ) : (
        <ul className="space-y-2">
          {hostel.rooms.map((room: any) => (
            <li key={room.id} className="p-4 border rounded">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{room.name}</strong> — Capacity: {room.capacity}
                  <br />
                  Occupants: {room.occupants?.length ?? 0}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditRoom(room)}
                    className="text-blue-500 underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    className="text-red-500 underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  function handleEditRoom(room: any) {
    alert(`Edit room ${room.name} (ID: ${room.id})`);
  }

  async function handleDeleteRoom(id: string) {
    if (!confirm('Are you sure you want to delete this room?')) return;

    const res = await fetch(`/api/rooms/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setHostel((prev: any) => ({
        ...prev,
        rooms: prev.rooms.filter((r: any) => r.id !== id),
      }));
    } else {
      alert('Failed to delete room.');
    }
  }
}
