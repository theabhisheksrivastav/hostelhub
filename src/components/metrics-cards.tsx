"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Bed, Calendar, TrendingUp } from "lucide-react"

type Metric = {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: any
}
// const metrics = [
//   {
//     title: "Total Employees",
//     value: "248",
//     change: "+12%",
//     changeType: "positive" as const,
//     icon: Users,
//   },
//   {
//     title: "Available Rooms",
//     value: "42",
//     change: "-3%",
//     changeType: "negative" as const,
//     icon: Bed,
//   },
//   {
//     title: "Attendance Today",
//     value: "94%",
//     change: "+2%",
//     changeType: "positive" as const,
//     icon: Calendar,
//   },
//   {
//     title: "Occupancy Rate",
//     value: "87%",
//     change: "+5%",
//     changeType: "positive" as const,
//     icon: TrendingUp,
//   },
// ]
// const metrics = [
//   {
//     title: "Total Employees",
//     value: "248",
//     change: "Let's pretend it's growing 🚀",
//     changeType: "positive" as const,
//     icon: Users,
//   },
//   {
//     title: "Available Rooms",
//     value: "42",
//     change: "Stable-ish 🛏️",
//     changeType: "positive" as const,
//     icon: Bed,
//   },
//   {
//     title: "Attendance Today",
//     value: "🤔 Coming Soon",
//     change: "In progress...",
//     changeType: "positive" as const,
//     icon: Calendar,
//   },
//   {
//     title: "Occupancy Rate",
//     value: "🔧 Under Construction",
//     change: "Patience, young Padawan",
//     changeType: "positive" as const,
//     icon: TrendingUp,
//   },
// ]



export function MetricsCards() {
const [totalEmployees, setTotalEmployees] = useState<number | null>(null)
  const [totalRooms, setTotalRooms] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, hostelRes] = await Promise.all([
          fetch("/api/employees"),
          fetch("/api/hostels"),
        ])

        const empData = await empRes.json()
        const hostelData = await hostelRes.json()

        setTotalEmployees(empData?.meta?.total || 0)

        const roomCount = hostelData.reduce(
          (sum: number, hostel: any) => sum + (hostel.rooms?.length || 0),
          0
        )
        setTotalRooms(roomCount)
      } catch (error) {
        console.error("Error fetching metrics:", error)
      }
    }

    fetchData()
  }, [])

  const metrics: Metric[] = [
    {
      title: "Total Employees",
      value: totalEmployees !== null ? `${totalEmployees}` : "Loading...",
      change: "Let's pretend it's growing 🚀",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Total Rooms",
      value: totalRooms !== null ? `${totalRooms}` : "Loading...",
      change: "Stable-ish 🛏️",
      changeType: "positive",
      icon: Bed,
    },
    {
      title: "Attendance Today",
      value: "🤔 Coming Soon",
      change: "In progress...",
      changeType: "positive",
      icon: Calendar,
    },
    {
      title: "Occupancy Rate",
      value: "🔧 Under Construction",
      change: "Patience, young Padawan",
      changeType: "positive",
      icon: TrendingUp,
    },
  ]


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-white shadow-sm border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
            <p className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
              {metric.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
