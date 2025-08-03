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
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Save, Upload, Trash2, X } from "lucide-react"

interface HostelManageModalProps {
  hostel: {
    id: number
    name: string
    address: string
    totalRooms: number
    occupiedRooms: number
    totalEmployees: number
    rating: number
    amenities: string[]
    status: string
    image: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

const availableAmenities = [
  "WiFi",
  "Parking",
  "Kitchen",
  "Laundry",
  "Gym",
  "Pool",
  "Restaurant",
  "Cafe",
  "Spa",
  "Rooftop",
  "Garden",
  "BBQ",
  "Playground",
  "24/7 Reception",
  "Luggage Storage",
  "Tour Desk",
]

export function HostelManageModal({ hostel, open, onOpenChange }: HostelManageModalProps) {
  const [formData, setFormData] = useState({
    name: hostel.name,
    address: hostel.address,
    phone: "+1 (555) 123-4567",
    email: `info@${hostel.name.toLowerCase().replace(/\s+/g, "")}.com`,
    website: `www.${hostel.name.toLowerCase().replace(/\s+/g, "")}.com`,
    description: "A comfortable and modern hostel providing excellent accommodation for travelers.",
    totalRooms: hostel.totalRooms,
    status: hostel.status,
    checkInTime: "15:00",
    checkOutTime: "12:00",
    currency: "USD",
    taxRate: "10",
    cancellationPolicy: "free",
  })

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(hostel.amenities)
  const [notifications, setNotifications] = useState({
    emailBookings: true,
    smsAlerts: false,
    pushNotifications: true,
    maintenanceAlerts: true,
  })

  const [policies, setPolicies] = useState({
    smokingAllowed: false,
    petsAllowed: false,
    partiesAllowed: false,
    quietHours: true,
  })

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving hostel data:", { formData, selectedAmenities, notifications, policies })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Manage {hostel.name}</DialogTitle>
          <DialogDescription>Update hostel information, settings, and policies.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Hostel Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
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

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Hostel Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        src={hostel.image || "/placeholder.svg"}
                        alt="Hostel"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="gap-2 bg-transparent">
                        <Upload className="h-4 w-4" />
                        Upload New Image
                      </Button>
                      <p className="text-sm text-gray-500">JPG, PNG or GIF. Max 5MB.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operating Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Check-in Time</Label>
                    <Input
                      id="checkIn"
                      type="time"
                      value={formData.checkInTime}
                      onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Check-out Time</Label>
                    <Input
                      id="checkOut"
                      type="time"
                      value={formData.checkOutTime}
                      onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="amenities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Amenities</CardTitle>
                <DialogDescription>Select the amenities available at your hostel</DialogDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {availableAmenities.map((amenity) => (
                    <div
                      key={amenity}
                      className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedAmenities.includes(amenity)
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleAmenityToggle(amenity)}
                    >
                      <div
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          selectedAmenities.includes(amenity) ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
                        }`}
                      >
                        {selectedAmenities.includes(amenity) && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                      </div>
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-medium mb-3">Selected Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAmenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="gap-1">
                        {amenity}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-red-600"
                          onClick={() => handleAmenityToggle(amenity)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>House Policies</CardTitle>
                <DialogDescription>Set rules and policies for your hostel</DialogDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Smoking Allowed</Label>
                      <p className="text-sm text-gray-500">Allow smoking in designated areas</p>
                    </div>
                    <Switch
                      checked={policies.smokingAllowed}
                      onCheckedChange={(checked) => setPolicies({ ...policies, smokingAllowed: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Pets Allowed</Label>
                      <p className="text-sm text-gray-500">Allow guests to bring pets</p>
                    </div>
                    <Switch
                      checked={policies.petsAllowed}
                      onCheckedChange={(checked) => setPolicies({ ...policies, petsAllowed: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Parties Allowed</Label>
                      <p className="text-sm text-gray-500">Allow parties and events</p>
                    </div>
                    <Switch
                      checked={policies.partiesAllowed}
                      onCheckedChange={(checked) => setPolicies({ ...policies, partiesAllowed: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Quiet Hours</Label>
                      <p className="text-sm text-gray-500">Enforce quiet hours (10 PM - 8 AM)</p>
                    </div>
                    <Switch
                      checked={policies.quietHours}
                      onCheckedChange={(checked) => setPolicies({ ...policies, quietHours: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cancellation">Cancellation Policy</Label>
                  <Select
                    value={formData.cancellationPolicy}
                    onValueChange={(value) => setFormData({ ...formData, cancellationPolicy: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free cancellation</SelectItem>
                      <SelectItem value="moderate">Moderate cancellation</SelectItem>
                      <SelectItem value="strict">Strict cancellation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <DialogDescription>Configure how you want to receive notifications</DialogDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Email Bookings</Label>
                      <p className="text-sm text-gray-500">Receive email notifications for new bookings</p>
                    </div>
                    <Switch
                      checked={notifications.emailBookings}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailBookings: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">SMS Alerts</Label>
                      <p className="text-sm text-gray-500">Receive SMS for urgent notifications</p>
                    </div>
                    <Switch
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Maintenance Alerts</Label>
                      <p className="text-sm text-gray-500">Get notified about maintenance requests</p>
                    </div>
                    <Switch
                      checked={notifications.maintenanceAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, maintenanceAlerts: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={formData.taxRate}
                      onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalRooms">Total Rooms</Label>
                  <Input
                    id="totalRooms"
                    type="number"
                    value={formData.totalRooms}
                    onChange={(e) => setFormData({ ...formData, totalRooms: Number.parseInt(e.target.value) })}
                  />
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
                  Delete Hostel
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
