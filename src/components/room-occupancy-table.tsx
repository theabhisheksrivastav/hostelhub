"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building } from "lucide-react"

type Hostel = {
  id: string
  name: string
  rooms: {
    id: string
    name: string
    occupants: any[] // Adjust this if you have a defined type for Employee
  }[]
}

export function RoomOccupancyTable() {
  const [hostels, setHostels] = useState<Hostel[]>([])

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await fetch("/api/hostels")
        const data = await res.json()
        setHostels(data)
      } catch (error) {
        console.error("Failed to fetch hostels:", error)
      }
    }

    fetchHostels()
  }, [])

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Room Occupancy by Hostel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hostel Name</TableHead>
              <TableHead>Total Rooms</TableHead>
              <TableHead>Occupied</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Occupancy Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hostels.map((hostel) => {
              const totalRooms = hostel.rooms.length
              const occupiedRooms = hostel.rooms.filter((room) => room.occupants.length > 0).length
              const availableRooms = totalRooms - occupiedRooms
              const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0

              return (
                <TableRow key={hostel.id}>
                  <TableCell className="font-medium">{hostel.name}</TableCell>
                  <TableCell>{totalRooms}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {occupiedRooms}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {availableRooms}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${occupancyRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{occupancyRate}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
