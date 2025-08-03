"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bell,
  Search,
  MoreHorizontal,
  Check,
  Archive,
  Star,
  AlertCircle,
  UserCheck,
  Bed,
  Wrench,
  DollarSign,
  Calendar,
  MessageSquare,
  Settings,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"

const allNotifications = [
  {
    id: 1,
    type: "booking",
    title: "New Booking Received",
    message: "Sarah Johnson booked Room 204 for 3 nights starting tomorrow. Total amount: $240",
    time: "2 minutes ago",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    read: false,
    starred: false,
    priority: "normal",
    icon: Bed,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    sender: "Booking System",
    category: "bookings",
  },
  {
    id: 2,
    type: "checkin",
    title: "Guest Check-in Completed",
    message: "Mike Chen successfully checked into Room 156. Welcome package delivered.",
    time: "15 minutes ago",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    starred: true,
    priority: "normal",
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-100",
    sender: "Reception",
    category: "operations",
  },
  {
    id: 3,
    type: "maintenance",
    title: "Urgent: Maintenance Request",
    message: "AC repair needed in Room 301. Guest reported issue. Maintenance team notified.",
    time: "1 hour ago",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: true,
    starred: false,
    priority: "high",
    icon: Wrench,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    sender: "Maintenance Dept",
    category: "maintenance",
  },
  {
    id: 4,
    type: "payment",
    title: "Payment Received",
    message: "$240 payment confirmed for booking #1234. Transaction ID: TXN789456123",
    time: "2 hours ago",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    starred: false,
    priority: "normal",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
    sender: "Payment Gateway",
    category: "financial",
  },
  {
    id: 5,
    type: "alert",
    title: "Low Occupancy Alert",
    message: "Garden View Hostel occupancy dropped to 58%. Consider promotional campaigns.",
    time: "3 hours ago",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: true,
    starred: true,
    priority: "high",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
    sender: "Analytics System",
    category: "alerts",
  },
  {
    id: 6,
    type: "schedule",
    title: "Staff Schedule Update",
    message: "Emma Wilson's shift changed for tomorrow (Jan 16). New time: 10:00 AM - 7:00 PM",
    time: "5 hours ago",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    read: true,
    starred: false,
    priority: "normal",
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    sender: "HR System",
    category: "staff",
  },
  {
    id: 7,
    type: "review",
    title: "New Guest Review",
    message: "5-star review received from John Smith: 'Excellent service and clean rooms!'",
    time: "1 day ago",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    starred: false,
    priority: "low",
    icon: MessageSquare,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    sender: "Review System",
    category: "reviews",
  },
  {
    id: 8,
    type: "system",
    title: "System Backup Completed",
    message: "Daily backup completed successfully. All data secured for January 15, 2024.",
    time: "1 day ago",
    timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000),
    read: true,
    starred: false,
    priority: "low",
    icon: Settings,
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    sender: "System",
    category: "system",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || notification.category === filterType
    const matchesPriority = filterPriority === "all" || notification.priority === filterPriority
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notification.read) ||
      (activeTab === "starred" && notification.starred) ||
      (activeTab === "archived" && notification.archived)

    return matchesSearch && matchesType && matchesPriority && matchesTab
  })

  const unreadCount = notifications.filter((n) => !n.read).length
  const starredCount = notifications.filter((n) => n.starred).length

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications((prev) => (prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    }
  }

  const markAsRead = (ids: number[]) => {
    setNotifications((prev) => prev.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n)))
    setSelectedNotifications([])
  }

  const markAsUnread = (ids: number[]) => {
    setNotifications((prev) => prev.map((n) => (ids.includes(n.id) ? { ...n, read: false } : n)))
    setSelectedNotifications([])
  }

  const toggleStar = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n)))
  }

  const deleteNotifications = (ids: number[]) => {
    setNotifications((prev) => prev.filter((n) => !ids.includes(n.id)))
    setSelectedNotifications([])
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Manage all your system notifications and alerts</p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Notification Settings
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Notifications</CardTitle>
              <Bell className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{notifications.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Unread</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Starred</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{starredCount}</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">High Priority</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {notifications.filter((n) => n.priority === "high").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white shadow-sm border-gray-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="bookings">Bookings</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="alerts">Alerts</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="reviews">Reviews</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedNotifications.length > 0 && (
              <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-lg">
                <span className="text-sm font-medium text-indigo-700">{selectedNotifications.length} selected</span>
                <div className="flex gap-1 ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(selectedNotifications)}
                    className="bg-transparent"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark Read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsUnread(selectedNotifications)}
                    className="bg-transparent"
                  >
                    <MarkAsUnread className="h-4 w-4 mr-1" />
                    Mark Unread
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteNotifications(selectedNotifications)}
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500"
                >
                  All ({notifications.length})
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500"
                >
                  Unread ({unreadCount})
                </TabsTrigger>
                <TabsTrigger
                  value="starred"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500"
                >
                  Starred ({starredCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <div className="divide-y divide-gray-200">
                  {/* Select All Header */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50">
                    <Checkbox
                      checked={
                        selectedNotifications.length === filteredNotifications.length &&
                        filteredNotifications.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {filteredNotifications.length} notifications
                    </span>
                  </div>

                  {filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No notifications found</p>
                      <p className="text-sm">Try adjusting your filters or search terms</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <Checkbox
                          checked={selectedNotifications.includes(notification.id)}
                          onCheckedChange={() => handleSelectNotification(notification.id)}
                        />

                        <div className={`p-2 rounded-lg ${notification.bgColor} flex-shrink-0`}>
                          <notification.icon className={`h-5 w-5 ${notification.color}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                                {notification.priority}
                              </Badge>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{notification.message}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                                  {notification.sender
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-500">{notification.sender}</span>
                              {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                            </div>

                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => toggleStar(notification.id)}
                              >
                                <Star
                                  className={`h-4 w-4 ${notification.starred ? "text-yellow-500 fill-current" : "text-gray-400"}`}
                                />
                              </Button>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => markAsRead([notification.id])}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Mark as read
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => markAsUnread([notification.id])}>
                                    <MarkAsUnread className="h-4 w-4 mr-2" />
                                    Mark as unread
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toggleStar(notification.id)}>
                                    <Star className="h-4 w-4 mr-2" />
                                    {notification.starred ? "Remove star" : "Add star"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => deleteNotifications([notification.id])}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
