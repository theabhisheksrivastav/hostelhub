"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddEmployeeModal } from "@/components/add-employee-modal"
import { Plus, Search, Filter, MoreHorizontal, Users, UserCheck, UserX } from "lucide-react"

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@hostelhub.com",
    phone: "+1 (555) 123-4567",
    hostel: "Sunrise Hostel",
    department: "Reception",
    status: "active",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@hostelhub.com",
    phone: "+1 (555) 234-5678",
    hostel: "Moonlight Hostel",
    department: "Housekeeping",
    status: "active",
    joinDate: "2023-02-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@hostelhub.com",
    phone: "+1 (555) 345-6789",
    hostel: "City Center Hostel",
    department: "Maintenance",
    status: "inactive",
    joinDate: "2023-03-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.w@hostelhub.com",
    phone: "+1 (555) 456-7890",
    hostel: "Garden View Hostel",
    department: "Security",
    status: "active",
    joinDate: "2023-04-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function EmployeesPage() {
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.hostel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeEmployees = employees.filter((emp) => emp.status === "active").length
  const inactiveEmployees = employees.filter((emp) => emp.status === "inactive").length

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="text-gray-600 mt-1">Manage your hostel staff and their information</p>
          </div>
          <Button onClick={() => setShowAddEmployee(true)} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{employees.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeEmployees}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Inactive</CardTitle>
              <UserX className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{inactiveEmployees}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white shadow-sm border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Hostel</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                          <AvatarFallback className="bg-indigo-100 text-indigo-600">
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-500">{employee.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-900">{employee.phone}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-900">{employee.hostel}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {employee.department}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={employee.status === "active" ? "default" : "secondary"}
                        className={
                          employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-900">{employee.joinDate}</p>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <AddEmployeeModal open={showAddEmployee} onOpenChange={setShowAddEmployee} />
    </DashboardLayout>
  )
}
