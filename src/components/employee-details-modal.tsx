"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { User, Mail, Phone, MapPin, Calendar, Clock, Award, TrendingUp, CheckCircle, Edit, Trash2 } from "lucide-react"

interface EmployeeDetailsModalProps {
  employee: {
    id: number
    name: string
    email: string
    phone: string
    hostel: string
    department: string
    status: string
    joinDate: string
    avatar: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: () => void
}

const mockPersonalInfo = {
  address: "456 Oak Street, Downtown, NY 10001",
  dateOfBirth: "1990-05-15",
  emergencyContact: "Jane Doe - +1 (555) 987-6543",
  employeeId: "EMP-2024-001",
  position: "Senior Receptionist",
  salary: "$45,000",
  workSchedule: "Monday - Friday, 9:00 AM - 6:00 PM",
}

const mockAttendanceData = [
  { date: "2024-01-15", punchIn: "09:00 AM", punchOut: "06:00 PM", hours: "9h 0m", status: "present" },
  { date: "2024-01-14", punchIn: "09:15 AM", punchOut: "06:00 PM", hours: "8h 45m", status: "late" },
  { date: "2024-01-13", punchIn: "09:00 AM", punchOut: "06:00 PM", hours: "9h 0m", status: "present" },
  { date: "2024-01-12", punchIn: "-", punchOut: "-", hours: "0h 0m", status: "absent" },
  { date: "2024-01-11", punchIn: "09:00 AM", punchOut: "02:00 PM", hours: "5h 0m", status: "half-day" },
]

const mockPerformanceData = {
  overallRating: 4.2,
  punctuality: 85,
  productivity: 92,
  teamwork: 88,
  customerService: 95,
  totalTasksCompleted: 156,
  averageTaskRating: 4.3,
}

const mockRecentActivities = [
  { id: 1, activity: "Completed guest check-in for Room 204", time: "2 hours ago", type: "task" },
  { id: 2, activity: "Resolved maintenance request for AC repair", time: "5 hours ago", type: "maintenance" },
  { id: 3, activity: "Updated guest information in system", time: "1 day ago", type: "update" },
  { id: 4, activity: "Handled guest complaint successfully", time: "2 days ago", type: "service" },
]

export function EmployeeDetailsModal({ employee, open, onOpenChange, onEdit }: EmployeeDetailsModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800"
      case "late":
        return "bg-yellow-100 text-yellow-800"
      case "absent":
        return "bg-red-100 text-red-800"
      case "half-day":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
              <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl font-bold">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <DialogTitle className="text-2xl">{employee.name}</DialogTitle>
                <Badge
                  className={employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                >
                  {employee.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{mockPersonalInfo.position}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{employee.hostel}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {employee.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={onEdit}>
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
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tasks Completed</p>
                  <p className="text-xl font-bold">{mockPerformanceData.totalTasksCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Performance</p>
                  <p className="text-xl font-bold">{mockPerformanceData.overallRating}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Punctuality</p>
                  <p className="text-xl font-bold">{mockPerformanceData.punctuality}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-xl font-bold">{mockPerformanceData.averageTaskRating}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">{employee.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">{employee.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">{mockPersonalInfo.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Date of Birth</p>
                        <p className="text-gray-600">{mockPersonalInfo.dateOfBirth}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Employee ID</p>
                        <p className="text-gray-600">{mockPersonalInfo.employeeId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Department</p>
                        <p className="text-gray-600">{employee.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Work Schedule</p>
                        <p className="text-gray-600">{mockPersonalInfo.workSchedule}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Emergency Contact</p>
                        <p className="text-gray-600">{mockPersonalInfo.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Punch In</TableHead>
                      <TableHead>Punch Out</TableHead>
                      <TableHead>Total Hours</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAttendanceData.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{record.date}</TableCell>
                        <TableCell>{record.punchIn}</TableCell>
                        <TableCell>{record.punchOut}</TableCell>
                        <TableCell>{record.hours}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Punctuality</span>
                        <span className="text-sm text-gray-600">{mockPerformanceData.punctuality}%</span>
                      </div>
                      <Progress value={mockPerformanceData.punctuality} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Productivity</span>
                        <span className="text-sm text-gray-600">{mockPerformanceData.productivity}%</span>
                      </div>
                      <Progress value={mockPerformanceData.productivity} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Teamwork</span>
                        <span className="text-sm text-gray-600">{mockPerformanceData.teamwork}%</span>
                      </div>
                      <Progress value={mockPerformanceData.teamwork} className="h-2" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Customer Service</span>
                        <span className="text-sm text-gray-600">{mockPerformanceData.customerService}%</span>
                      </div>
                      <Progress value={mockPerformanceData.customerService} className="h-2" />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Overall Performance</h4>
                      <div className="text-3xl font-bold text-indigo-600 mb-1">
                        {mockPerformanceData.overallRating}/5
                      </div>
                      <p className="text-sm text-gray-600">Excellent performance this quarter</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.activity}</p>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
