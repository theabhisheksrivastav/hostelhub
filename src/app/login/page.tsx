"use client"

import type React from "react"
import { signIn } from "next-auth/react";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [loginStatus, setLoginStatus] = useState<"success" | "error">("success")
  const [loginMessage, setLoginMessage] = useState("")
  const router = useRouter()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setLoginStatus("error")
        setLoginMessage("Invalid credentials")
        setShowStatusModal(true)
      } else {
        setLoginStatus("success")
        setLoginMessage("Login successful!")
        setShowStatusModal(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 1200)
      }
    } catch (err) {
      console.error("Login error:", err)
      setLoginStatus("error")
      setLoginMessage("Something went wrong. Please try again.")
      setShowStatusModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpTabClick = () => {
    setShowOtpModal(true)
  }

  return (
    <>
      {/* OTP Disabled Modal */}
      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OTP Login Unavailable</DialogTitle>
            <DialogDescription>
              Sorry, we are working on OTP logins. Please use your email to sign in for now.
            </DialogDescription>
            <Button onClick={() => setShowOtpModal(false)} className="mt-4 w-full">
              Got it
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Login Status Modal */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{loginStatus === "success" ? "Success" : "Login Failed"}</DialogTitle>
            <DialogDescription>
              {loginMessage}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Login UI */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
  <Link href="/">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xl cursor-pointer hover:scale-105 transition">
      H
    </div>
  </Link>
</div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Sign in to your HostelHub account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="otp" onMouseDown={(e) => e.preventDefault()} onClick={handleOtpTabClick}>
                  OTP Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@hostelhub.com" defaultValue={"john@hostelhub.com"} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="1234" defaultValue={"1234"} name="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                {"Don't have an account? "}
                <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
