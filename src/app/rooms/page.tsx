"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, Bed, Users, DollarSign, Calendar } from "lucide-react"

type Room = {
  id: string
  name: string
  capacity: number
  hostel: { name: string }
  occupants: any[] // You can refine this later
  rate?: number
  status?: string
  checkOut?: string
  guest?: string
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showAddRoom, setShowAddRoom] = useState(false)
  const [formData, setFormData] = useState({ name: "", hostelId: "", capacity: 1 })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/rooms")
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to load rooms")
        
      setRooms(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const handleAddRoom = async () => {
    try {
      if(formData.hostelId.trim() === "") {formData.hostelId = "cmdtl72pn0001jp04rzzblg3a"} // Temporary hardcoded ID
      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to add room")
      const newRoom = await res.json()
      setRooms((prev) => [...prev, newRoom])
      setShowAddRoom(false)
    } catch (err) {
      console.error("Add room failed:", err)
    }
  }

  const filteredRooms = rooms.filter((room) => {
    const guest = room.guest ?? "mystery guest"
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRooms = rooms.length
  const availableRooms = rooms.filter((room) => room.status === "available").length
  const occupiedRooms = rooms.filter((room) => room.status === "occupied").length
  const maintenanceRooms = rooms.filter((room) => room.status === "maintenance").length

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "occupied":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Rooms</h1>
            <p className="text-gray-600">Manage your cozy, chaotic or classy spaces</p>
          </div>
          <Button onClick={() => setShowAddRoom(true)} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
            <Plus className="h-4 w-4" />
            Add Room
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total", value: totalRooms, icon: <Bed className="h-4 w-4 text-gray-400" /> },
            { label: "Available", value: availableRooms, icon: <Users className="h-4 w-4 text-green-500" /> },
            { label: "Occupied", value: occupiedRooms, icon: <Users className="h-4 w-4 text-blue-500" /> },
            { label: "Maintenance", value: maintenanceRooms, icon: <Calendar className="h-4 w-4 text-yellow-500" /> },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-gray-600">{stat.label}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter & Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, guest or hostel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-gray-500 text-center py-10">Loading your luxurious chaos...</div>
            ) : error ? (
              <div className="text-red-500 text-center py-10">Oops: {error}</div>
            ) : filteredRooms.length === 0 ? (
              <div className="text-gray-400 text-center py-10">No rooms found... maybe they escaped?</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room</TableHead>
                    <TableHead>Hostel</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Check Out</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.name}</TableCell>
                      <TableCell>{room.hostel?.name || "Ghost Hostel"}</TableCell>
                      <TableCell>{room.occupants?.length ?? 0}/{room.capacity}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(room.status)}>
                          {room.status ?? "🤷‍♂️ unknown"}
                        </Badge>
                      </TableCell>
                      <TableCell>{room.guest ?? "A surprise guest"}</TableCell>
                      <TableCell>{room.checkOut ?? "Someday..."}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Room Dialog */}
      <Dialog open={showAddRoom} onOpenChange={setShowAddRoom}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
            <DialogDescription>This room better have a window... or at least Wi-Fi.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Room Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostelId">Hostel ID</Label>
              <Input
                id="hostelId"
                placeholder="cmdtl72pn0001jp04rzzblg3a"
                defaultValue={"cmdtl72pn0001jp04rzzblg3a"}
                value={formData.hostelId}
                onChange={(e) => setFormData({ ...formData, hostelId: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRoom(false)}>Cancel</Button>
            <Button onClick={handleAddRoom} className="bg-indigo-600 hover:bg-indigo-700">Add Room</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}



// import { useState } from "react"
// import { DashboardLayout } from "@/components/dashboard-layout"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Plus, Search, Bed, Users, DollarSign, Calendar } from "lucide-react"

// const rooms = [
//   {
//     id: 1,
//     number: "101",
//     type: "Single",
//     hostel: "Sunrise Hostel",
//     capacity: 1,
//     currentOccupancy: 1,
//     status: "occupied",
//     rate: 50,
//     guest: "John Smith",
//     checkIn: "2024-01-15",
//     checkOut: "2024-01-20",
//   },
//   {
//     id: 2,
//     number: "102",
//     type: "Double",
//     hostel: "Sunrise Hostel",
//     capacity: 2,
//     currentOccupancy: 0,
//     status: "available",
//     rate: 80,
//     guest: null,
//     checkIn: null,
//     checkOut: null,
//   },
//   {
//     id: 3,
//     number: "201",
//     type: "Dormitory",
//     hostel: "Moonlight Hostel",
//     capacity: 6,
//     currentOccupancy: 4,
//     status: "occupied",
//     rate: 25,
//     guest: "Multiple Guests",
//     checkIn: "2024-01-10",
//     checkOut: "2024-01-25",
//   },
//   {
//     id: 4,
//     number: "103",
//     type: "Single",
//     hostel: "City Center Hostel",
//     capacity: 1,
//     currentOccupancy: 0,
//     status: "maintenance",
//     rate: 60,
//     guest: null,
//     checkIn: null,
//     checkOut: null,
//   },
//   {
//     id: 5,
//     number: "204",
//     type: "Suite",
//     hostel: "Garden View Hostel",
//     capacity: 4,
//     currentOccupancy: 2,
//     status: "occupied",
//     rate: 120,
//     guest: "Wilson Family",
//     checkIn: "2024-01-12",
//     checkOut: "2024-01-18",
//   },
// ]

// export default function RoomsPage() {
//   const [showAddRoom, setShowAddRoom] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [hostelFilter, setHostelFilter] = useState("all")

//   const filteredRooms = rooms.filter((room) => {
//     const matchesSearch =
//       room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       room.hostel.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()))
//     const matchesStatus = statusFilter === "all" || room.status === statusFilter
//     const matchesHostel = hostelFilter === "all" || room.hostel === hostelFilter

//     return matchesSearch && matchesStatus && matchesHostel
//   })

//   const totalRooms = rooms.length
//   const availableRooms = rooms.filter((room) => room.status === "available").length
//   const occupiedRooms = rooms.filter((room) => room.status === "occupied").length
//   const maintenanceRooms = rooms.filter((room) => room.status === "maintenance").length

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "available":
//         return "bg-green-100 text-green-800"
//       case "occupied":
//         return "bg-blue-100 text-blue-800"
//       case "maintenance":
//         return "bg-yellow-100 text-yellow-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   return (
//     <DashboardLayout>
//       <div className="flex-1 space-y-6 p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Rooms</h1>
//             <p className="text-gray-600 mt-1">Manage room inventory and occupancy</p>
//           </div>
//           <Button onClick={() => setShowAddRoom(true)} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
//             <Plus className="h-4 w-4" />
//             Add Room
//           </Button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <Card className="bg-white shadow-sm border-gray-200">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">Total Rooms</CardTitle>
//               <Bed className="h-4 w-4 text-gray-400" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-gray-900">{totalRooms}</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-white shadow-sm border-gray-200">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">Available</CardTitle>
//               <Users className="h-4 w-4 text-green-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-600">{availableRooms}</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-white shadow-sm border-gray-200">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">Occupied</CardTitle>
//               <Users className="h-4 w-4 text-blue-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-blue-600">{occupiedRooms}</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-white shadow-sm border-gray-200">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">Maintenance</CardTitle>
//               <Calendar className="h-4 w-4 text-yellow-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-yellow-600">{maintenanceRooms}</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters and Search */}
//         <Card className="bg-white shadow-sm border-gray-200">
//           <CardHeader>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                 <Input
//                   placeholder="Search rooms, hostels, or guests..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-full sm:w-[180px]">
//                   <SelectValue placeholder="Filter by status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="available">Available</SelectItem>
//                   <SelectItem value="occupied">Occupied</SelectItem>
//                   <SelectItem value="maintenance">Maintenance</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Select value={hostelFilter} onValueChange={setHostelFilter}>
//                 <SelectTrigger className="w-full sm:w-[180px]">
//                   <SelectValue placeholder="Filter by hostel" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Hostels</SelectItem>
//                   <SelectItem value="Sunrise Hostel">Sunrise Hostel</SelectItem>
//                   <SelectItem value="Moonlight Hostel">Moonlight Hostel</SelectItem>
//                   <SelectItem value="City Center Hostel">City Center Hostel</SelectItem>
//                   <SelectItem value="Garden View Hostel">Garden View Hostel</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Room</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Hostel</TableHead>
//                   <TableHead>Occupancy</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Rate/Night</TableHead>
//                   <TableHead>Guest</TableHead>
//                   <TableHead>Check Out</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredRooms.map((room) => (
//                   <TableRow key={room.id}>
//                     <TableCell className="font-medium">#{room.number}</TableCell>
//                     <TableCell>{room.type}</TableCell>
//                     <TableCell>{room.hostel}</TableCell>
//                     <TableCell>
//                       <span className="text-sm">
//                         {room.currentOccupancy}/{room.capacity}
//                       </span>
//                     </TableCell>
//                     <TableCell>
//                       <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-1">
//                         <DollarSign className="h-3 w-3" />
//                         {room.rate}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       {room.guest ? (
//                         <span className="text-sm">{room.guest}</span>
//                       ) : (
//                         <span className="text-sm text-gray-400">-</span>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {room.checkOut ? (
//                         <span className="text-sm">{room.checkOut}</span>
//                       ) : (
//                         <span className="text-sm text-gray-400">-</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Add Room Modal */}
//       <Dialog open={showAddRoom} onOpenChange={setShowAddRoom}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add New Room</DialogTitle>
//             <DialogDescription>Enter the room details below.</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="roomNumber">Room Number</Label>
//                 <Input id="roomNumber" placeholder="101" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="roomType">Room Type</Label>
//                 <Select>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="single">Single</SelectItem>
//                     <SelectItem value="double">Double</SelectItem>
//                     <SelectItem value="dormitory">Dormitory</SelectItem>
//                     <SelectItem value="suite">Suite</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="hostel">Hostel</Label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select hostel" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="sunrise">Sunrise Hostel</SelectItem>
//                   <SelectItem value="moonlight">Moonlight Hostel</SelectItem>
//                   <SelectItem value="city-center">City Center Hostel</SelectItem>
//                   <SelectItem value="garden-view">Garden View Hostel</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="capacity">Capacity</Label>
//                 <Input id="capacity" type="number" placeholder="2" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="rate">Rate per Night ($)</Label>
//                 <Input id="rate" type="number" placeholder="80" />
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={() => setShowAddRoom(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" >
//               Add Room
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </DashboardLayout>
//   )
// }
