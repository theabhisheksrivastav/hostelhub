"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, CalendarIcon, Clock, UserCheck, UserX, Download } from "lucide-react"
import { format } from "date-fns"

const attendanceData = [
  {
    id: 1,
    employee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Reception",
    },
    date: "2024-01-15",
    punchIn: "09:00 AM",
    punchOut: "06:00 PM",
    totalHours: "9h 0m",
    status: "present",
    hostel: "Sunrise Hostel",
  },
  {
    id: 2,
    employee: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Housekeeping",
    },
    date: "2024-01-15",
    punchIn: "08:30 AM",
    punchOut: "05:30 PM",
    totalHours: "9h 0m",
    status: "present",
    hostel: "Moonlight Hostel",
  },
  {
    id: 3,
    employee: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Maintenance",
    },
    date: "2024-01-15",
    punchIn: "10:15 AM",
    punchOut: "06:00 PM",
    totalHours: "7h 45m",
    status: "late",
    hostel: "City Center Hostel",
  },
  {
    id: 4,
    employee: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Security",
    },
    date: "2024-01-15",
    punchIn: "-",
    punchOut: "-",
    totalHours: "0h 0m",
    status: "absent",
    hostel: "Garden View Hostel",
  },
  {
    id: 5,
    employee: {
      name: "David Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Reception",
    },
    date: "2024-01-15",
    punchIn: "09:00 AM",
    punchOut: "02:00 PM",
    totalHours: "5h 0m",
    status: "half-day",
    hostel: "Sunrise Hostel",
  },
]

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [hostelFilter, setHostelFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const filteredAttendance = attendanceData.filter((record) => {
    const matchesSearch =
      record.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesHostel = hostelFilter === "all" || record.hostel === hostelFilter

    return matchesSearch && matchesStatus && matchesHostel
  })

  const presentCount = attendanceData.filter((record) => record.status === "present").length
  const lateCount = attendanceData.filter((record) => record.status === "late").length
  const absentCount = attendanceData.filter((record) => record.status === "absent").length
  const halfDayCount = attendanceData.filter((record) => record.status === "half-day").length

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
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
            <p className="text-gray-600 mt-1">Track employee attendance and working hours</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <CalendarIcon className="h-4 w-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Present</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{presentCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Late</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{lateCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Absent</CardTitle>
              <UserX className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{absentCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Half Day</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{halfDayCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white shadow-sm border-gray-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search employees..."
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
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="half-day">Half Day</SelectItem>
                </SelectContent>
              </Select>
              <Select value={hostelFilter} onValueChange={setHostelFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by hostel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hostels</SelectItem>
                  <SelectItem value="Sunrise Hostel">Sunrise Hostel</SelectItem>
                  <SelectItem value="Moonlight Hostel">Moonlight Hostel</SelectItem>
                  <SelectItem value="City Center Hostel">City Center Hostel</SelectItem>
                  <SelectItem value="Garden View Hostel">Garden View Hostel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Hostel</TableHead>
                  <TableHead>Punch In</TableHead>
                  <TableHead>Punch Out</TableHead>
                  <TableHead>Total Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={record.employee.avatar || "/placeholder.svg"} alt={record.employee.name} />
                          <AvatarFallback className="bg-indigo-100 text-indigo-600">
                            {record.employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{record.employee.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {record.employee.department}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.hostel}</TableCell>
                    <TableCell>
                      <span className={record.punchIn === "-" ? "text-gray-400" : "text-gray-900"}>
                        {record.punchIn}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={record.punchOut === "-" ? "text-gray-400" : "text-gray-900"}>
                        {record.punchOut}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{record.totalHours}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
