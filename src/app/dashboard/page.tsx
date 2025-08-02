"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { WelcomeSection } from "@/components/welcome-section"
import { MetricsCards } from "@/components/metrics-cards"
import { RecentActivity } from "@/components/recent-activity"
import { OccupancyCube } from "@/components/occupancy-cube"
import { AddEmployeeModal } from "@/components/add-employee-modal"
import { RoomOccupancyTable } from "@/components/room-occupancy-table"

export default function Dashboard() {
  const [showAddEmployee, setShowAddEmployee] = useState(false)

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <WelcomeSection />
        <MetricsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <div className="space-y-6">
            <OccupancyCube />
          </div>
        </div>

        <RoomOccupancyTable />
      </div>

      <AddEmployeeModal open={showAddEmployee} onOpenChange={setShowAddEmployee} />
    </DashboardLayout>
  )
}
