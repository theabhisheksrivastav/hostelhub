import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building } from "lucide-react"

const hostelData = [
  {
    id: 1,
    name: "Sunrise Hostel",
    totalRooms: 50,
    occupiedRooms: 43,
    availableRooms: 7,
    occupancyRate: 86,
  },
  {
    id: 2,
    name: "Moonlight Hostel",
    totalRooms: 40,
    occupiedRooms: 35,
    availableRooms: 5,
    occupancyRate: 88,
  },
  {
    id: 3,
    name: "City Center Hostel",
    totalRooms: 60,
    occupiedRooms: 52,
    availableRooms: 8,
    occupancyRate: 87,
  },
  {
    id: 4,
    name: "Garden View Hostel",
    totalRooms: 35,
    occupiedRooms: 28,
    availableRooms: 7,
    occupancyRate: 80,
  },
]

export function RoomOccupancyTable() {
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
            {hostelData.map((hostel) => (
              <TableRow key={hostel.id}>
                <TableCell className="font-medium">{hostel.name}</TableCell>
                <TableCell>{hostel.totalRooms}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {hostel.occupiedRooms}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {hostel.availableRooms}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${hostel.occupancyRate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{hostel.occupancyRate}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
