"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"

export function WelcomeSection({ onAddEmployee }: { onAddEmployee?: () => void }) {
  const { data: session } = useSession()
  const user = session?.user || { name: "Guest" };
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}</h1>
        <p className="text-gray-600 mt-1">Here's what's happening at your hostels today.</p>
      </div>
      {/* <Button onClick={onAddEmployee} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
        <Plus className="h-4 w-4" />
        Add Employee
      </Button> */}
    </div>
  )
}
