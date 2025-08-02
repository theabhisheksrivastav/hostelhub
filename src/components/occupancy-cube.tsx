"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building } from "lucide-react"

export function OccupancyCube() {
  // Generate a 4x4x4 grid of rooms (64 total)
  const generateRooms = () => {
    const rooms = []
    for (let z = 0; z < 4; z++) {
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
          rooms.push({
            id: `${x}-${y}-${z}`,
            occupied: Math.random() > 0.3, // 70% occupancy rate
            x,
            y,
            z,
          })
        }
      }
    }
    return rooms
  }

  const rooms = generateRooms()
  const occupiedCount = rooms.filter((room) => room.occupied).length
  const occupancyRate = Math.round((occupiedCount / rooms.length) * 100)

  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Hostel Occupancy Visualization
        </CardTitle>
        <p className="text-sm text-gray-600">
          {occupiedCount}/{rooms.length} rooms occupied ({occupancyRate}%)
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <div className="relative" style={{ perspective: "1000px" }}>
            <div
              className="relative preserve-3d"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(-15deg) rotateY(25deg)",
                width: "200px",
                height: "200px",
              }}
            >
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`absolute border border-gray-300 ${
                    room.occupied ? "bg-green-400 shadow-green-200" : "bg-gray-200 shadow-gray-100"
                  } shadow-sm transition-colors hover:scale-110`}
                  style={{
                    width: "12px",
                    height: "12px",
                    transform: `translate3d(${room.x * 14}px, ${room.y * 14}px, ${room.z * 14}px)`,
                    transformStyle: "preserve-3d",
                  }}
                  title={`Room ${room.x + 1}-${room.y + 1}-${room.z + 1}: ${room.occupied ? "Occupied" : "Available"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 border border-gray-300 rounded-sm"></div>
            <span className="text-sm text-gray-600">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded-sm"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
