import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, UserCheck, Bed } from "lucide-react"

// const activities = [
//   {
//     id: 1,
//     type: "check-in",
//     user: "Sarah Johnson",
//     room: "Room 204",
//     time: "2 minutes ago",
//     icon: Bed,
//   },
//   {
//     id: 2,
//     type: "punch-in",
//     user: "Mike Chen",
//     department: "Maintenance",
//     time: "15 minutes ago",
//     icon: UserCheck,
//   },
//   {
//     id: 3,
//     type: "check-in",
//     user: "Emma Wilson",
//     room: "Room 156",
//     time: "32 minutes ago",
//     icon: Bed,
//   },
//   {
//     id: 4,
//     type: "punch-in",
//     user: "David Brown",
//     department: "Reception",
//     time: "1 hour ago",
//     icon: UserCheck,
//   },
// ]
const activities = [
  {
    id: 1,
    type: "check-in",
    user: "Backend Team",
    room: "All Modules",
    time: "ETA: Next Sunday 🤞",
    icon: Bed,
  },
  {
    id: 2,
    type: "update-in-progress",
    user: "Dev Ops",
    department: "Server Room",
    time: "Rolling out soon...",
    icon: UserCheck,
  },
  {
    id: 3,
    type: "check-in",
    user: "API Department",
    room: "Codebase",
    time: "Working hard 💻",
    icon: Bed,
  },
  {
    id: 4,
    type: "sneak-peek",
    user: "You 😉",
    department: "Dashboard",
    time: "Stay tuned!",
    icon: UserCheck,
  },
]



export function RecentActivity() {
  return (
    <Card className="bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                <activity.icon className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.user}</p>
                <p className="text-sm text-gray-600">
                  {activity.type === "check-in"
                    ? `Checked into ${activity.room}`
                    : `Punched in - ${activity.department}`}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {activity.time}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
