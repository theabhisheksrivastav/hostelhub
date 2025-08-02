"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Users, Building, DollarSign, Calendar } from "lucide-react"

const occupancyData = [
  { month: "Jan", occupancy: 85, revenue: 45000 },
  { month: "Feb", occupancy: 78, revenue: 42000 },
  { month: "Mar", occupancy: 92, revenue: 52000 },
  { month: "Apr", occupancy: 88, revenue: 48000 },
  { month: "May", occupancy: 95, revenue: 55000 },
  { month: "Jun", occupancy: 90, revenue: 51000 },
]

const hostelPerformance = [
  { name: "Sunrise Hostel", occupancy: 86, revenue: 15000 },
  { name: "Moonlight Hostel", occupancy: 88, revenue: 12000 },
  { name: "City Center Hostel", occupancy: 87, revenue: 18000 },
  { name: "Garden View Hostel", occupancy: 80, revenue: 10000 },
]

const roomTypeData = [
  { name: "Single", value: 35, color: "#4F46E5" },
  { name: "Double", value: 25, color: "#7C3AED" },
  { name: "Dormitory", value: 30, color: "#EC4899" },
  { name: "Suite", value: 10, color: "#F59E0B" },
]

const attendanceData = [
  { day: "Mon", present: 45, absent: 5 },
  { day: "Tue", present: 48, absent: 2 },
  { day: "Wed", present: 46, absent: 4 },
  { day: "Thu", present: 49, absent: 1 },
  { day: "Fri", present: 47, absent: 3 },
  { day: "Sat", present: 44, absent: 6 },
  { day: "Sun", present: 42, absent: 8 },
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Insights and performance metrics for your hostels</p>
          </div>
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">$293,000</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last period
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Occupancy</CardTitle>
              <Building className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">86.3%</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3.2% from last period
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Guest Satisfaction</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">4.6/5</div>
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -0.1 from last period
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Staff Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">94.2%</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +1.8% from last period
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle>Occupancy & Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  occupancy: {
                    label: "Occupancy %",
                    color: "hsl(var(--chart-1))",
                  },
                  revenue: {
                    label: "Revenue ($)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="occupancy"
                      stroke="var(--color-occupancy)"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle>Hostel Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  occupancy: {
                    label: "Occupancy %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hostelPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="occupancy" fill="var(--color-occupancy)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle>Room Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  single: { label: "Single", color: "#4F46E5" },
                  double: { label: "Double", color: "#7C3AED" },
                  dormitory: { label: "Dormitory", color: "#EC4899" },
                  suite: { label: "Suite", color: "#F59E0B" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roomTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {roomTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex justify-center gap-4 mt-4">
                {roomTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  present: {
                    label: "Present",
                    color: "hsl(var(--chart-1))",
                  },
                  absent: {
                    label: "Absent",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="present" fill="var(--color-present)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" fill="var(--color-absent)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
