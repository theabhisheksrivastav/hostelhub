"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode, Download, Share, Copy, Smartphone, Wifi, MapPin, Clock } from "lucide-react"

interface QRCodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QRCodeModal({ open, onOpenChange }: QRCodeModalProps) {
  const [qrType, setQrType] = useState("checkin")
  const [selectedHostel, setSelectedHostel] = useState("sunrise")
  const [customUrl, setCustomUrl] = useState("")

  const qrTypes = {
    checkin: {
      title: "Check-in QR Code",
      description: "Guests can scan to check into their rooms",
      url: "https://hostelhub.com/checkin/sunrise-hostel",
      color: "bg-green-500",
    },
    wifi: {
      title: "WiFi QR Code",
      description: "Guests can scan to connect to WiFi",
      url: "WIFI:T:WPA;S:HostelHub-Guest;P:welcome123;;",
      color: "bg-blue-500",
    },
    menu: {
      title: "Digital Menu",
      description: "Access restaurant menu and services",
      url: "https://hostelhub.com/menu/sunrise-hostel",
      color: "bg-purple-500",
    },
    feedback: {
      title: "Feedback Form",
      description: "Collect guest reviews and feedback",
      url: "https://hostelhub.com/feedback/sunrise-hostel",
      color: "bg-orange-500",
    },
    custom: {
      title: "Custom URL",
      description: "Create QR code for any URL",
      url: customUrl,
      color: "bg-gray-500",
    },
  }

  const currentQR = qrTypes[qrType as keyof typeof qrTypes]

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentQR.url)
    // You could add a toast notification here
  }

  const handleDownload = () => {
    // In a real app, you'd generate and download the QR code image
    console.log("Downloading QR code for:", currentQR.url)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentQR.title,
        text: currentQR.description,
        url: currentQR.url,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code Generator
          </DialogTitle>
          <DialogDescription>Generate QR codes for various hostel services and features</DialogDescription>
        </DialogHeader>

        <Tabs value={qrType} onValueChange={setQrType} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="checkin" className="text-xs">
              Check-in
            </TabsTrigger>
            <TabsTrigger value="wifi" className="text-xs">
              WiFi
            </TabsTrigger>
            <TabsTrigger value="menu" className="text-xs">
              Menu
            </TabsTrigger>
            <TabsTrigger value="feedback" className="text-xs">
              Feedback
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-xs">
              Custom
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${currentQR.color}`}></div>
                      {currentQR.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{currentQR.description}</p>
                  </div>
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* QR Code Display */}
                  <div className="flex flex-col items-center">
                    <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-4">
                      {/* In a real app, you'd use a QR code library like qrcode.js */}
                      <div className="w-40 h-40 bg-gray-100 rounded flex items-center justify-center">
                        <div className="grid grid-cols-8 gap-1">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-black" : "bg-white"} rounded-sm`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 bg-transparent">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-transparent">
                        <Share className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Configuration */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hostel">Select Hostel</Label>
                      <Select value={selectedHostel} onValueChange={setSelectedHostel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sunrise">Sunrise Hostel</SelectItem>
                          <SelectItem value="moonlight">Moonlight Hostel</SelectItem>
                          <SelectItem value="city-center">City Center Hostel</SelectItem>
                          <SelectItem value="garden-view">Garden View Hostel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {qrType === "custom" && (
                      <div className="space-y-2">
                        <Label htmlFor="customUrl">Custom URL</Label>
                        <Input
                          id="customUrl"
                          placeholder="https://example.com"
                          value={customUrl}
                          onChange={(e) => setCustomUrl(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Generated URL</Label>
                      <div className="flex gap-2">
                        <Input value={currentQR.url} readOnly className="bg-gray-50" />
                        <Button variant="outline" size="icon" onClick={handleCopyUrl}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* QR Code Info */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <h4 className="font-medium text-sm">QR Code Information</h4>
                      <div className="space-y-2 text-sm">
                        {qrType === "checkin" && (
                          <>
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-gray-500" />
                              <span>Mobile-optimized check-in form</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>Available 24/7</span>
                            </div>
                          </>
                        )}
                        {qrType === "wifi" && (
                          <>
                            <div className="flex items-center gap-2">
                              <Wifi className="h-4 w-4 text-gray-500" />
                              <span>Network: HostelHub-Guest</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Password: welcome123</span>
                            </div>
                          </>
                        )}
                        {qrType === "menu" && (
                          <>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>Restaurant & room service menu</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>Updated daily</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Tabs>

        {/* Usage Instructions */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <p className="font-medium">Print & Display</p>
                  <p className="text-gray-600">Download and print the QR code to display in your hostel</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <p className="font-medium">Guest Scans</p>
                  <p className="text-gray-600">Guests use their phone camera to scan the code</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <p className="font-medium">Instant Access</p>
                  <p className="text-gray-600">They're redirected to the appropriate service or form</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
