"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      mobile: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    }

    if (payload.password !== payload.confirmPassword) {
      alert("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.error || "Signup failed")
      } else {
        alert("Signup successful!")

      }
    } catch (err) {
      console.error("Signup error:", err)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)


  return (
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
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Get started with HostelHub today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="john@hostelhub.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <button type="button" onClick={() => setShowTerms(true)} className="text-indigo-600 hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" onClick={() => setShowPrivacy(true)} className="text-indigo-600 hover:underline">
                  Privacy Policy
                </button>
              </Label>
            </div>


            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <Dialog open={showTerms} onOpenChange={setShowTerms}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Terms of Service</DialogTitle>
              </DialogHeader>
              <div className="text-sm text-gray-700 space-y-2">
                <p>By using HostelHub, you agree to abide by all rules and regulations set forth by the platform...</p>
                <p>[Add more terms here]</p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Privacy Policy</DialogTitle>
              </DialogHeader>
              <div className="text-sm text-gray-700 space-y-2">
                <p>We respect your privacy. Your data will only be used for account management and internal operations...</p>
                <p>[Add more privacy policy info here]</p>
              </div>
            </DialogContent>
          </Dialog>


          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Already have an account?</span>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Sign in instead
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
