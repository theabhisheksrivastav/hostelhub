"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [error, setError] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
    } else {
      router.push("/login");
    }
  }

  if (status === "loading") return null; // Optional: loading state

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-10">
      <input onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="First Name" className="w-full p-2 border" />
      <input onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Last Name" className="w-full p-2 border" />
      <input onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full p-2 border" />
      <input onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="Mobile" className="w-full p-2 border" />
      <input type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full p-2 border" />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Sign Up</button>
    </form>
  );
}
