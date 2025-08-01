"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Redirect to home if user is already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/");
    }
  };

  // Optionally render loading state while session is being fetched
  if (status === "loading") return <p className="text-center mt-10">Checking session...</p>;

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-semibold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button className="bg-blue-500 text-white px-4 py-2 w-full">Log In</button>
    </form>
  );
}
