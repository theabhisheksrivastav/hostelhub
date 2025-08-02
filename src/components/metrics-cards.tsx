import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Bed, Calendar, TrendingUp } from "lucide-react"

const metrics = [
  {
    title: "Total Employees",
    value: "248",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Available Rooms",
    value: "42",
    change: "-3%",
    changeType: "negative" as const,
    icon: Bed,
  },
  {
    title: "Attendance Today",
    value: "94%",
    change: "+2%",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Occupancy Rate",
    value: "87%",
    change: "+5%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title} className="bg-white shadow-sm border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
            <p className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
              {metric.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
