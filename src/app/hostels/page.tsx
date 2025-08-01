"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

type Hostel = {
  id: string;
  name: string;
  location: string;
};

export default function HostelsPage() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [form, setForm] = useState({ name: "", location: "", id: "" });
  const router = useRouter();

  useEffect(() => {
    fetchHostels();
  }, []);

  async function fetchHostels() {
    const res = await fetch("/api/hostels");
    const data = await res.json();
    setHostels(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(form.id ? `/api/hostels/${form.id}` : "/api/hostels", {
      method: form.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, location: form.location }),
    });
    if (res.ok) {
      fetchHostels();
      setForm({ name: "", location: "", id: "" });
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/hostels/${id}`, { method: "DELETE" });
    fetchHostels();
  }

  function handleEdit(h: Hostel) {
    setForm({ name: h.name, location: h.location, id: h.id });
  }

  function handleView(id: string) {
    const currentPath = window.location.pathname;
    router.push(`${currentPath}/${id}`);
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          className="border w-full p-2"
          placeholder="Hostel Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border w-full p-2"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2">
          {form.id ? "Update" : "Add"} Hostel
        </button>
      </form>

      <ul className="space-y-2">
        {hostels.map((h) => (
          <li key={h.id} className="flex justify-between items-center border p-2">
            <div>
              <strong>{h.name}</strong> — {h.location}
            </div>
            <div className="space-x-2">
              <button onClick={() => handleView(h.id)} className="text-blue-600">View</button>
              <button onClick={() => handleEdit(h)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(h.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
