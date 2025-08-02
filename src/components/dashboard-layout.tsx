"use client"

import type React from "react"
import { signOut, useSession  } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Bell,
  QrCode,
  Search,
  Settings,
  Users,
  Building,
  Bed,
  Calendar,
  BarChart3,
  Home,
  ChevronDown,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/dashboard",
    isActive: true,
  },
  {
    title: "Employees",
    icon: Users,
    url: "/employees",
  },
  {
    title: "Hostels",
    icon: Building,
    url: "/hostels",
  },
  {
    title: "Rooms",
    icon: Bed,
    url: "/rooms",
  },
  {
    title: "Attendance",
    icon: Calendar,
    url: "/attendance",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-200">
        <SidebarHeader className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">
              H
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">HostelHub</h2>
              <p className="text-sm text-gray-500">Management System</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 py-2">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search..." className="w-64 pl-10 bg-gray-50 border-gray-200" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="md:hidden bg-transparent">
              <QrCode className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" className="hidden md:flex bg-transparent">
              <QrCode className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Building className="h-4 w-4" />
                  <span className="hidden md:inline">Sunrise Hostel</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Select Organization</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sunrise Hostel</DropdownMenuItem>
                <DropdownMenuItem>Moonlight Hostel</DropdownMenuItem>
                <DropdownMenuItem>City Center Hostel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="icon" className="relative bg-transparent">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">3</Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
  <AvatarImage 
    src={session?.user?.name || ""} 
    alt={session?.user?.name || "User"} 
  />
  <AvatarFallback className="bg-indigo-500 text-white">
    {session?.user?.name?.charAt(0).toUpperCase() || "U"}
  </AvatarFallback>

                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session?.user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground"> {session?.user?.email || ""}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
