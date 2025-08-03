"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, X, AlertCircle, UserCheck, Bed, Wrench, DollarSign, Calendar } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "booking",
    title: "New Booking Received",
    message: "Sarah Johnson booked Room 204 for 3 nights",
    time: "2 minutes ago",
    read: false,
    icon: Bed,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    type: "checkin",
    title: "Guest Check-in",
    message: "Mike Chen checked into Room 156",
    time: "15 minutes ago",
    read: false,
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    type: "maintenance",
    title: "Maintenance Request",
    message: "AC repair needed in Room 301",
    time: "1 hour ago",
    read: true,
    icon: Wrench,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: 4,
    type: "payment",
    title: "Payment Received",
    message: "$240 payment confirmed for booking #1234",
    time: "2 hours ago",
    read: true,
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 5,
    type: "alert",
    title: "Low Occupancy Alert",
    message: "Garden View Hostel occupancy below 60%",
    time: "3 hours ago",
    read: true,
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    id: 6,
    type: "schedule",
    title: "Staff Schedule Update",
    message: "Emma Wilson's shift changed for tomorrow",
    time: "5 hours ago",
    read: true,
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

export function NotificationsDropdown() {
  const router = useRouter();
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-3">
          <DropdownMenuLabel className="p-0 font-semibold">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-auto p-1">
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />

        {notificationList.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notificationList.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-0 focus:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex items-start gap-3 p-3 w-full">
                  <div className={`p-2 rounded-lg ${notification.bgColor} flex-shrink-0`}>
                    <notification.icon className={`h-4 w-4 ${notification.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 hover:bg-green-100"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3 text-green-600" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 hover:bg-red-100"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <X className="h-3 w-3 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/notifications")}
          className="p-3 text-center text-sm text-indigo-600 hover:text-indigo-700 cursor-pointer"
        >
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
