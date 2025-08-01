"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";
  const userFirstName = session?.user?.name || "";
  const userInitial = userFirstName.charAt(0).toUpperCase();

  return (
    <header className="bg-purple-700 text-white shadow">
  <div className="container mx-auto flex items-center justify-between px-6 py-4">
    <Link href="/" className="flex items-center space-x-2">
      <img src="/banner_logo.svg" alt="HostelHQ Logo" className="h-10 w-auto" />
      <span className="text-2xl font-bold">RoomRooster</span>
    </Link>

    <nav className="flex items-center space-x-4">
      {!isLoggedIn ? (
        <>
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </>
      ) : (
        <>
          {/* Logged in navigation */}
          <Link href="/hostels" className="hover:underline">
            Hostels
          </Link>
          <Link href="/rooms" className="hover:underline">
            Rooms
          </Link>
          <Link href="/employees" className="hover:underline">
            Employees
          </Link>

          <LogoutButton />

          <div
            title={userFirstName}
            className="h-8 w-8 rounded-full bg-white text-purple-700 font-bold flex items-center justify-center"
          >
            {userInitial}
          </div>
        </>
      )}
    </nav>
  </div>
</header>

  );
}
