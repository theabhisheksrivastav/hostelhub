"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Building, MapPin, Users, Bed, Star } from "lucide-react"
import { HostelDetailsModal } from "@/components/hostel-details-modal"
import { HostelManageModal } from "@/components/hostel-manage-modal"

const hostels = [
  {
    id: 1,
    name: "Sunrise Hostel",
    address: "123 Main Street, Downtown",
    totalRooms: 50,
    occupiedRooms: 43,
    totalEmployees: 12,
    rating: 4.5,
    amenities: ["WiFi", "Laundry", "Kitchen", "Parking"],
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Moonlight Hostel",
    address: "456 Oak Avenue, Midtown",
    totalRooms: 40,
    occupiedRooms: 35,
    totalEmployees: 10,
    rating: 4.3,
    amenities: ["WiFi", "Gym", "Rooftop", "Cafe"],
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "City Center Hostel",
    address: "789 Pine Road, City Center",
    totalRooms: 60,
    occupiedRooms: 52,
    totalEmployees: 15,
    rating: 4.7,
    amenities: ["WiFi", "Restaurant", "Spa", "Pool"],
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Garden View Hostel",
    address: "321 Elm Street, Suburbs",
    totalRooms: 35,
    occupiedRooms: 28,
    totalEmployees: 8,
    rating: 4.2,
    amenities: ["WiFi", "Garden", "BBQ", "Playground"],
    status: "maintenance",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function HostelsPage() {
  const [showAddHostel, setShowAddHostel] = useState(false)
  const [selectedHostel, setSelectedHostel] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showManageModal, setShowManageModal] = useState(false)

  const totalRooms = hostels.reduce((sum, hostel) => sum + hostel.totalRooms, 0)
  const totalOccupied = hostels.reduce((sum, hostel) => sum + hostel.occupiedRooms, 0)
  const averageOccupancy = Math.round((totalOccupied / totalRooms) * 100)

  const handleViewDetails = (hostel) => {
    setSelectedHostel(hostel)
    setShowDetailsModal(true)
  }

  const handleManage = (hostel) => {
    setSelectedHostel(hostel)
    setShowManageModal(true)
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hostels</h1>
            <p className="text-gray-600 mt-1">Manage your hostel properties and their details</p>
          </div>
          <Button onClick={() => setShowAddHostel(true)} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
            <Plus className="h-4 w-4" />
            Add Hostel
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Hostels</CardTitle>
              <Building className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{hostels.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Rooms</CardTitle>
              <Bed className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalRooms}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Occupied Rooms</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalOccupied}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Occupancy</CardTitle>
              <Star className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">{averageOccupancy}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Hostels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((hostel) => {
            const occupancyRate = Math.round((hostel.occupiedRooms / hostel.totalRooms) * 100)

            return (
              <Card key={hostel.id} className="bg-white shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={hostel.image || "/placeholder.svg"}
                    alt={hostel.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-3 right-3 ${
                      hostel.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {hostel.status}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{hostel.name}</CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <p className="text-sm text-gray-600">{hostel.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{hostel.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Total Rooms</p>
                      <p className="font-semibold">{hostel.totalRooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Employees</p>
                      <p className="font-semibold">{hostel.totalEmployees}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Occupancy</span>
                      <span className="font-medium">{occupancyRate}%</span>
                    </div>
                    <Progress value={occupancyRate} className="h-2" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-1">
                      {hostel.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleViewDetails(hostel)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => handleManage(hostel)}
                    >
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Add Hostel Modal */}
      <Dialog open={showAddHostel} onOpenChange={setShowAddHostel}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Hostel</DialogTitle>
            <DialogDescription>Enter the hostel details below to add a new property.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="hostelName">Hostel Name</Label>
              <Input id="hostelName" placeholder="Enter hostel name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter full address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalRooms">Total Rooms</Label>
                <Input id="totalRooms" type="number" placeholder="50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees">Staff Count</Label>
                <Input id="employees" type="number" placeholder="10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities (comma separated)</Label>
              <Input id="amenities" placeholder="WiFi, Laundry, Kitchen, Parking" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddHostel(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Add Hostel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {selectedHostel && (
        <>
          <HostelDetailsModal hostel={selectedHostel} open={showDetailsModal} onOpenChange={setShowDetailsModal} />
          <HostelManageModal hostel={selectedHostel} open={showManageModal} onOpenChange={setShowManageModal} />
        </>
      )}
    </DashboardLayout>
  )
}
