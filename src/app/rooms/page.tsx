'use client';

import { useEffect, useState } from 'react';

interface Hostel {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  roomId: string;
}


interface Room {
  id: string;
  name: string;
  capacity: number;
  occupants: Employee[]
}

type Occupant = Employee;


export default function RoomsPage() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [selectedHostel, setSelectedHostel] = useState<string>('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomName, setRoomName] = useState('');
  const [roomCapacity, setRoomCapacity] = useState<number | ''>(1);
  const [showModal, setShowModal] = useState(false);
  const [occupants, setOccupants] = useState<Occupant[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [availableEmployees, setAvailableEmployees] = useState<Employee[]>([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [assignLoading, setAssignLoading] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);


  useEffect(() => {
    async function fetchHostels() {
      const res = await fetch('/api/hostels');
      if (res.ok) {
        const data = await res.json();
        setHostels(data);
        if (data.length > 0) setSelectedHostel(data[0].id);
      }
    }
    fetchHostels();
  }, []);

  useEffect(() => {
    if (!selectedHostel) return;
    async function fetchRooms() {
      const res = await fetch(`/api/rooms?hostelId=${selectedHostel}`);
      if (res.ok) {
        const data = await res.json();
        setRooms(data);
      }
    }
    fetchRooms();
  }, [selectedHostel]);

  async function handleAddRoom(e: React.FormEvent) {
    e.preventDefault();
    const capacity = roomCapacity || 1;

    const res = await fetch('/api/rooms', {
      method: 'POST',
      body: JSON.stringify({ name: roomName, capacity, hostelId: selectedHostel }),
    });

    if (res.ok) {
      setRoomName('');
      setRoomCapacity(1);
      const updatedRooms = await fetch(`/api/rooms?hostelId=${selectedHostel}`).then((res) => res.json());
      setRooms(updatedRooms);
      setOccupants(updatedRooms.occupants)
    } else {
      alert('Failed to add room');
    }
  }

  async function fetchAvailableEmployees(search = '') {
    const res = await fetch(`/api/employees/assign?search=${search}`);
    if (res.ok) {
      const { data } = await res.json();
      setAvailableEmployees(data);
    }
  }

  async function handleAssignEmployee() {
    if (!selectedEmployeeId || !selectedRoom) return;
    setAssignLoading(true);

    const res = await fetch(`/api/employees/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomId: selectedRoom.id, employeeIds: [selectedEmployeeId] }),
    });

    if (res.ok) {
      const updated = await res.json();
      setOccupants(updated.occupants);
      setSelectedEmployeeId(null);
      await fetchAvailableEmployees(employeeSearch);
    } else {
      const errorData = await res.json();
      alert(errorData.error || 'Failed to assign employee');
    }

    setAssignLoading(false);
  }

  async function handleRemoveOccupant(id: string) {
    if (!selectedRoom) return;

    const res = await fetch(`/api/employees/assign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomId: selectedRoom.id,
        employeeIds: [id], // now passes roomId and array of employeeIds
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setOccupants(updated.occupants);
      await fetchAvailableEmployees(employeeSearch);
    } else {
      alert('Failed to remove occupant');
    }
  }




  async function handleViewRoom(room: Room) {
    setSelectedRoom(room);
    setShowModal(true);
    const fullRoom = rooms.find(r => r.id === room.id);
    setOccupants(fullRoom?.occupants || []);
    await fetchAvailableEmployees('');
  }


  async function handleDeleteRoom(room: Room) {
    setSelectedRoom(room);
    const fullRoom = rooms.find(r => r.id === room.id);
    const occupants = fullRoom?.occupants || [];

    setOccupants(occupants);
    await fetchAvailableEmployees('');

    if (occupants.length > 0) {
      alert("Employee(s) allotted to this room. Please remove them first.");
      return;
    }

    try {
      const res = await fetch(`/api/rooms/${room.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("Room deleted successfully");
        const updatedRooms = await fetch(`/api/rooms?hostelId=${selectedHostel}`).then((res) => res.json());
        setRooms(updatedRooms);
        setShowModal(false);
        setSelectedRoom(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete room");
      }
    } catch (err) {
      alert("Error while deleting room");
    }
  }



  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Rooms</h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Hostel</label>
        <select
          value={selectedHostel}
          onChange={(e) => setSelectedHostel(e.target.value)}
          className="input w-full"
        >
          {hostels.map((hostel) => (
            <option key={hostel.id} value={hostel.id}>
              {hostel.name}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleAddRoom} className="space-y-4 border p-4 rounded mb-6">
        <h2 className="font-semibold">Add New Room</h2>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name"
          className="input w-full"
        />
        <input
          type="number"
          value={roomCapacity}
          onChange={(e) => setRoomCapacity(e.target.value === '' ? '' : parseInt(e.target.value))}
          placeholder="Capacity (default 1)"
          className="input w-full"
          min={1}
        />
        <button type="submit" className="btn bg-purple-600 text-white px-4 py-2 rounded">
          Add Room
        </button>
      </form>

      <div>
        <h2 className="font-semibold mb-2">Rooms in {hostels.find(h => h.id === selectedHostel)?.name || '...'}</h2>
        <ul className="space-y-2">
          {rooms.map((room) => (
            <li key={room.id} className="p-2 border rounded flex items-center justify-between">
              <div>
                <strong>{room.name}</strong> — Capacity: {room.capacity}
              </div>
              <button
                onClick={() => handleViewRoom(room)}
                className="text-blue-600 underline text-sm"
              >
                View
              </button>
              <button
                onClick={() => handleDeleteRoom(room)}
                className="text-blue-600 underline text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Occupants of {selectedRoom.name}</h3>
            {occupants?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {occupants.map((occ) => (
                  <li key={occ.id} className="flex justify-between items-center">
                    <span>{occ.firstName} {occ.lastName}</span>
                    <button
                      onClick={() => handleRemoveOccupant(occ.id)}
                      className="text-red-600 text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}

              </ul>
            ) : (
              <p className="text-sm text-gray-500">No occupants yet.</p>
            )}
            <hr className="my-4" />
            <h4 className="font-medium mb-1">Assign Employee</h4>
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="Search unassigned employees..."
                value={employeeSearch}
                onChange={(e) => {
                  setEmployeeSearch(e.target.value);
                  fetchAvailableEmployees(e.target.value);
                }}
                className="input flex-grow"
              />
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availableEmployees.length === 0 && (
                <p className="text-sm text-gray-500">No available employees found.</p>
              )}
              {availableEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className={`p-2 border rounded cursor-pointer ${selectedEmployeeId === emp.id ? 'bg-purple-100' : ''}`}
                  onClick={() => setSelectedEmployeeId(emp.id)}
                >
                  {emp.firstName} {emp.lastName} — {emp.email}
                </div>
              ))}
            </div>

            <button
              disabled={!selectedEmployeeId || assignLoading}
              onClick={handleAssignEmployee}
              className="mt-2 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {assignLoading ? 'Assigning...' : 'Assign Employee'}
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
