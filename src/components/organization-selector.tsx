"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, ChevronDown, MapPin, Users, Bed, Star, Settings } from "lucide-react"

type Hostel = {
  id: string
  name: string
  location: string
  rooms: {
    id: string
    capacity: number
    occupants: { id: string }[]
  }[]
  ownerId: string
}

export function OrganizationSelector() {
  const [organizations, setOrganizations] = useState<Hostel[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Hostel | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await fetch("/api/hostels")
        const data = await res.json()

        if (Array.isArray(data) && data.length > 0) {
          setOrganizations(data)
          setSelectedOrg(data[0])
        }
      } catch (error) {
        console.error("Error fetching hostels:", error)
      }
    }

    fetchHostels()
  }, [])

  const handleOrgSelect = (org: Hostel) => {
    setSelectedOrg(org)
    setShowModal(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Building className="h-4 w-4" />
            <span className="hidden md:inline">{selectedOrg?.name || "Select Hostel"}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Select Organization</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {organizations.map((org) => (
            <DropdownMenuItem
              key={org.id}
              onClick={() => handleOrgSelect(org)}
              className={selectedOrg?.id === org.id ? "bg-indigo-50 text-indigo-600" : ""}
            >
              <div className="flex items-center gap-2 w-full">
                <Building className="h-4 w-4" />
                <span className="flex-1">{org.name}</span>
                {selectedOrg?.id === org.id && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowModal(true)} className="text-indigo-600">
            <Settings className="h-4 w-4 mr-2" />
            Manage Organizations
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Manage Organizations
            </DialogTitle>
            <DialogDescription>
              View and manage all your hostel properties. Click on any organization to switch to it.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {organizations.map((org) => {
              const totalRooms = org.rooms.length
              const occupiedRooms = org.rooms.reduce((sum, room) => sum + (room.occupants?.length || 0), 0)
              const totalEmployees = org.rooms.reduce((sum, room) => sum + (room.occupants?.length || 0), 0)
              const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0

              return (
                <Card
                  key={org.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedOrg?.id === org.id ? "ring-2 ring-indigo-500 bg-indigo-50" : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => handleOrgSelect(org)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" alt={org.name} />
                          <AvatarFallback className="bg-indigo-100 text-indigo-600 font-semibold">
                            {org.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {org.name}
                            {selectedOrg?.id === org.id && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
                          </CardTitle>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <p className="text-sm text-gray-600">{org.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-green-100 text-green-800">active</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{Math.random().toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <Bed className="h-3 w-3 text-gray-400 mb-1 mx-auto" />
                        <p className="text-sm text-gray-600">Rooms</p>
                        <p className="font-semibold text-gray-900">{totalRooms}</p>
                      </div>
                      <div>
                        <Users className="h-3 w-3 text-gray-400 mb-1 mx-auto" />
                        <p className="text-sm text-gray-600">Staff</p>
                        <p className="font-semibold text-gray-900">{totalEmployees}</p>
                      </div>
                      <div>
                        <Building className="h-3 w-3 text-gray-400 mb-1 mx-auto" />
                        <p className="text-sm text-gray-600">Occupancy</p>
                        <p className="font-semibold text-indigo-600">{occupancyRate}%</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Occupancy Rate</span>
                        <span>{occupancyRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all"
                          style={{ width: `${occupancyRate}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {occupiedRooms}/{totalRooms} rooms occupied
                      </div>
                      {selectedOrg?.id === org.id && (
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Total: {organizations.length} organizations •{" "}
                {organizations.reduce((sum, org) => sum + org.rooms.length, 0)} rooms
              </div>
              <Button variant="outline" className="bg-transparent" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
