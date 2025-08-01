"use client";

import { useEffect, useState } from "react";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<Employee>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(
        `/api/employees?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      setEmployees(data?.data || []);
      setTotalPages(data.meta?.totalPages || 1);
    } catch (err) {
      console.error("Failed to load employees:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/employees${editing ? `/${form.id}` : ""}`, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      setForm({ id: "", firstName: "", lastName: "", email: "", mobile: "" });
      setEditing(false);
      fetchEmployees();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (emp: Employee) => {
    setForm(emp);
    setEditing(true);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setLoading(true);
    try {
      await fetch(`/api/employees/${deletingId}`, { method: "DELETE" });
      setDeletingId(null);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [page]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={() => {
            setPage(1); // reset to page 1 on new search
            fetchEmployees(); // manually trigger fetch
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>


      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? (editing ? "Updating..." : "Adding...") : editing ? "Update" : "Add Employee"}
        </button>
        {editing && (
          <button
            type="button"
            className="ml-2 text-sm text-gray-600 underline"
            onClick={() => {
              setEditing(false);
              setForm({ id: "", firstName: "", lastName: "", email: "", mobile: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="space-y-2">
        {employees.length === 0 ? (
          <li>No employees found.</li>
        ) : (
          employees.map((emp) => (
            <li key={emp.id} className="border p-4 rounded">
              <p>
                <strong>
                  {emp.firstName} {emp.lastName}
                </strong>
              </p>
              <p>Email: {emp.email}</p>
              <p>Mobile: {emp.mobile}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(emp)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingId(emp.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="text-sm px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="text-sm px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Delete Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <p className="mb-4">Are you sure you want to delete this employee?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
