"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  MapPin,
  Star,
  Users,
  Bed,
  Calendar,
  Phone,
  Mail,
  Globe,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Edit,
  Trash2,
} from "lucide-react"

interface HostelDetailsModalProps {
  hostel: {
    id: number
    name: string
    address: string
    totalRooms: number
    occupiedRooms: number
    totalEmployees: number
    rating: number
    amenities: string[]
    status: string
    image: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockEmployees = [
  { id: 1, name: "John Smith", role: "Manager", department: "Reception", status: "active" },
  { id: 2, name: "Sarah Wilson", role: "Housekeeper", department: "Housekeeping", status: "active" },
  { id: 3, name: "Mike Johnson", role: "Maintenance", department: "Maintenance", status: "active" },
]

const mockRooms = [
  { id: 1, number: "101", type: "Single", status: "occupied", guest: "Alice Brown", rate: 50 },
  { id: 2, number: "102", type: "Double", status: "available", guest: null, rate: 80 },
  { id: 3, number: "201", type: "Dormitory", status: "occupied", guest: "Multiple Guests", rate: 25 },
  { id: 4, number: "202", type: "Suite", status: "maintenance", guest: null, rate: 120 },
]

const mockRecentActivity = [
  { id: 1, type: "check-in", guest: "Emma Davis", room: "103", time: "2 hours ago" },
  { id: 2, type: "check-out", guest: "Tom Wilson", room: "205", time: "4 hours ago" },
  { id: 3, type: "maintenance", room: "301", issue: "AC repair", time: "1 day ago" },
]

const amenityIcons: { [key: string]: any } = {
  WiFi: Wifi,
  Parking: Car,
  Cafe: Coffee,
  Gym: Dumbbell,
  Kitchen: Coffee,
  Laundry: Users,
  Restaurant: Coffee,
  Spa: Users,
  Pool: Users,
  Rooftop: Users,
  Garden: Users,
  BBQ: Coffee,
  Playground: Users,
}

export function HostelDetailsModal({ hostel, open, onOpenChange }: HostelDetailsModalProps) {
  const occupancyRate = Math.round((hostel.occupiedRooms / hostel.totalRooms) * 100)
  const availableRooms = hostel.totalRooms - hostel.occupiedRooms

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={hostel.image || "/placeholder.svg"} alt={hostel.name} />
              <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl font-bold">
                {hostel.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <DialogTitle className="text-2xl">{hostel.name}</DialogTitle>
                <Badge
                  className={
                    hostel.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {hostel.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{hostel.address}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{hostel.rating}/5</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bed className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Rooms</p>
                  <p className="text-xl font-bold">{hostel.totalRooms}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Occupied</p>
                  <p className="text-xl font-bold text-green-600">{hostel.occupiedRooms}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Bed className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available</p>
                  <p className="text-xl font-bold text-indigo-600">{availableRooms}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Staff</p>
                  <p className="text-xl font-bold text-purple-600">{hostel.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Occupancy Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Occupancy Rate</h3>
              <span className="text-lg font-bold text-indigo-600">{occupancyRate}%</span>
            </div>
            <Progress value={occupancyRate} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">
              {hostel.occupiedRooms} of {hostel.totalRooms} rooms currently occupied
            </p>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {hostel.amenities.map((amenity) => {
                const IconComponent = amenityIcons[amenity] || Wifi
                return (
                  <div key={amenity} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                    <IconComponent className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="rooms" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Room Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">#{room.number}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              room.status === "available"
                                ? "bg-green-100 text-green-800"
                                : room.status === "occupied"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {room.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{room.guest || "-"}</TableCell>
                        <TableCell>${room.rate}/night</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Staff Members</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {employee.department}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">{employee.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {activity.type === "check-in" && `${activity.guest} checked into ${activity.room}`}
                          {activity.type === "check-out" && `${activity.guest} checked out of ${activity.room}`}
                          {activity.type === "maintenance" &&
                            `Maintenance request for ${activity.room}: ${activity.issue}`}
                        </p>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">info@{hostel.name.toLowerCase().replace(/\s+/g, "")}.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Website</p>
                        <p className="text-gray-600">www.{hostel.name.toLowerCase().replace(/\s+/g, "")}.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Operating Hours</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Check-in: 3:00 PM - 11:00 PM</p>
                        <p>Check-out: 7:00 AM - 12:00 PM</p>
                        <p>Reception: 24/7</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Emergency Contact</p>
                      <p className="text-sm text-gray-600">+1 (555) 999-0000</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
