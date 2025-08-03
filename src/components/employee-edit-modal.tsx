"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Save, Upload, Trash2 } from "lucide-react"

interface EmployeeEditModalProps {
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
}

export function EmployeeEditModal({ employee, open, onOpenChange }: EmployeeEditModalProps) {
  const [formData, setFormData] = useState({
    firstName: employee.name.split(" ")[0] || "",
    lastName: employee.name.split(" ")[1] || "",
    email: employee.email,
    phone: employee.phone,
    address: "456 Oak Street, Downtown, NY 10001",
    dateOfBirth: "1990-05-15",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543",
    employeeId: "EMP-2024-001",
    position: "Senior Receptionist",
    department: employee.department,
    hostel: employee.hostel,
    salary: "45000",
    joinDate: employee.joinDate,
    status: employee.status,
    workSchedule: "full-time",
    shiftStart: "09:00",
    shiftEnd: "18:00",
  })

  const [permissions, setPermissions] = useState({
    canAccessReports: true,
    canManageBookings: true,
    canViewFinancials: false,
    canManageRooms: true,
    canAccessSettings: false,
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsAlerts: false,
    shiftReminders: true,
    taskAssignments: true,
  })

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving employee data:", { formData, permissions, notifications })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Employee - {employee.name}</DialogTitle>
          <DialogDescription>Update employee information, permissions, and settings.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={employee.avatar || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl">
                      {formData.firstName[0]}
                      {formData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Upload className="h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                  />
                </div>

                {/* Emergency Contact */}
                <div>
                  <h4 className="font-medium mb-4">Emergency Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Reception">Reception</SelectItem>
                        <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Security">Security</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hostel">Assigned Hostel</Label>
                    <Select
                      value={formData.hostel}
                      onValueChange={(value) => setFormData({ ...formData, hostel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sunrise Hostel">Sunrise Hostel</SelectItem>
                        <SelectItem value="Moonlight Hostel">Moonlight Hostel</SelectItem>
                        <SelectItem value="City Center Hostel">City Center Hostel</SelectItem>
                        <SelectItem value="Garden View Hostel">Garden View Hostel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Employment Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                        <SelectItem value="terminated">Terminated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={formData.joinDate}
                      onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Annual Salary ($)</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    />
                  </div>
                </div>

                <Separator />

                {/* Work Schedule */}
                <div>
                  <h4 className="font-medium mb-4">Work Schedule</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="workSchedule">Schedule Type</Label>
                      <Select
                        value={formData.workSchedule}
                        onValueChange={(value) => setFormData({ ...formData, workSchedule: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="temporary">Temporary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shiftStart">Shift Start</Label>
                      <Input
                        id="shiftStart"
                        type="time"
                        value={formData.shiftStart}
                        onChange={(e) => setFormData({ ...formData, shiftStart: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shiftEnd">Shift End</Label>
                      <Input
                        id="shiftEnd"
                        type="time"
                        value={formData.shiftEnd}
                        onChange={(e) => setFormData({ ...formData, shiftEnd: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Permissions</CardTitle>
                <DialogDescription>Configure what this employee can access in the system</DialogDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Access Reports</Label>
                      <p className="text-sm text-gray-500">View analytics and generate reports</p>
                    </div>
                    <Switch
                      checked={permissions.canAccessReports}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, canAccessReports: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Manage Bookings</Label>
                      <p className="text-sm text-gray-500">Create, edit, and cancel bookings</p>
                    </div>
                    <Switch
                      checked={permissions.canManageBookings}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, canManageBookings: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">View Financials</Label>
                      <p className="text-sm text-gray-500">Access financial data and revenue reports</p>
                    </div>
                    <Switch
                      checked={permissions.canViewFinancials}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, canViewFinancials: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Manage Rooms</Label>
                      <p className="text-sm text-gray-500">Update room status and assignments</p>
                    </div>
                    <Switch
                      checked={permissions.canManageRooms}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, canManageRooms: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Access Settings</Label>
                      <p className="text-sm text-gray-500">Modify system settings and configurations</p>
                    </div>
                    <Switch
                      checked={permissions.canAccessSettings}
                      onCheckedChange={(checked) => setPermissions({ ...permissions, canAccessSettings: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">SMS Alerts</Label>
                      <p className="text-sm text-gray-500">Receive urgent alerts via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Shift Reminders</Label>
                      <p className="text-sm text-gray-500">Get reminders about upcoming shifts</p>
                    </div>
                    <Switch
                      checked={notifications.shiftReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, shiftReminders: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Task Assignments</Label>
                      <p className="text-sm text-gray-500">Notifications for new task assignments</p>
                    </div>
                    <Switch
                      checked={notifications.taskAssignments}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, taskAssignments: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <DialogDescription>These actions cannot be undone</DialogDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                  <Trash2 className="h-4 w-4" />
                  Delete Employee
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
