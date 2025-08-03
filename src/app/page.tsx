"use client"

import { useState } from "react"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ContactSalesModal } from "@/components/ContactSalesModal"
import { PaymentModal } from "@/components/PaymentModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Modal from "@/components/Modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowRight,
  Building,
  Users,
  BarChart3,
  Shield,
  Clock,
  Star,
  Check,
  Menu,
  X,
  Play,
  Zap,
  Globe,
  Smartphone,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Building,
    title: "Multi-Property Management",
    description: "Manage multiple hostels from a single, unified dashboard with real-time insights.",
  },
  {
    icon: Users,
    title: "Staff Management",
    description: "Track employee attendance, manage schedules, and monitor performance across all locations.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get detailed insights into occupancy rates, revenue trends, and operational efficiency.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee and automated backups.",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Stay informed with instant notifications and live data synchronization.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Access your dashboard anywhere with our responsive design and mobile app.",
  },
]

const testimonials = [
  {
    name: "Probably Sarah Johnson",
    role: "Fictional Operations Manager",
    company: "Urban Hostels Group (Totally Real™)",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Okay, we *don’t* actually have any testimonials yet... but if we did, I’d say HostelHub saved us 20% in operational costs. Probably.",
    rating: 5,
  },
  {
    name: "Imaginary Mike Chen",
    role: "Legendary Hostel Owner",
    company: "Downtown Backpackers (In Our Dreams)",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Scheduling conflicts? Never heard of them — thanks to HostelHub! (Okay fine, we haven’t launched yet. But it’s going to be epic.)",
    rating: 5,
  },
  {
    name: "Definitely Emma Rodriguez",
    role: "Not a Robot, Real Manager",
    company: "Coastal Hostels™",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "This app? A game-changer. Or it *will be*, once real people use it and start raving about it right here. Stay tuned!",
    rating: 5,
  },
]


const pricingPlans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for single hostel owners",
    features: ["Up to 50 rooms", "Basic analytics", "Employee management", "Email support", "Mobile access"],
    popular: false,
  },
  {
    name: "Professional",
    price: "$69",
    period: "month",
    description: "Ideal for growing hostel chains",
    features: [
      "Razorpay integration",
      // "Advanced analytics",
      "Payment notifications",
      "Priority support",
      "Export data",
      "Custom integrations",
    ],
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For large hostel networks",
    features: [
      "Unlimited rooms",
      "White-label solution",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom development",
      // "SLA guarantee",
    ],
    popular: true,
  },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState("")
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter()

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth;
    container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };


  const handleClick = (plan: any) => {
    if (plan.price === "Custom") {
      setShowContactModal(true)
    } else if (plan.price === "$0" || plan.price.toLowerCase() === "free") {
      router.push("/signup")
    } else {
      setSelectedPrice(plan.price)
      setShowPaymentModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg">
                H
              </div>
              <span className="text-xl font-bold text-gray-900">HostelHub</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link href="/signup">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Testimonials
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </a>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sign In
                </Link>
                <Link href="/signup">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 bg-indigo-100 text-indigo-800 hover:bg-indigo-100">
              <Zap className="h-3 w-3 mr-1" />
              New: Advanced Analytics Dashboard
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Manage Your Hostels
              <span className="block text-indigo-600">Like Never Before</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline operations, boost occupancy rates, and maximize revenue with our comprehensive hostel
              management platform. Trusted by at least 1 properties worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              {/* <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button> */}
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required • It’s free (for now).</p>
          </div>

          {/* Hero Image/Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl transform rotate-1"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 text-sm text-gray-500">hostelhub.com/dashboard</div>
                </div>
              </div>
              <div className="p-6 w-full h-auto rounded-lg flex items-center">
                <Link href="/">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xl cursor-pointer hover:scale-105 transition">
                    H
                  </div>
                </Link>
                <span className="ml-3 text-lg font-semibold">HostelHub Dashboard</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed specifically for hostel owners and managers to streamline operations and
              increase profitability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white shadow-sm border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-indigo-200">Properties Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-indigo-200">Rooms Tracked</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-indigo-200">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-indigo-200">Support Available</div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <div className="text-indigo-200">Properties (So far...)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">Maybe 1?</div>
              <div className="text-indigo-200">Rooms Tracked (our own test room)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50%</div>
              <div className="text-indigo-200">Uptime (we're working on it!)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">Whenever</div>
              <div className="text-indigo-200">Support (Text us... maybe?)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Loved by Hostel Owners</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers have to say about their experience with HostelHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-sm border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-600">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include our core features with no hidden fees.
            </p>
          </div>

          <div className="relative">
            {/* Left Arrow */}
            {pricingPlans.length > 3 && (
              <button
                onClick={() => scroll("left")}
                className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                ←
              </button>
            )}

            {/* Carousel */}
            <div
              ref={scrollRef}
              className={`flex overflow-x-auto no-scrollbar gap-6 px-2 py-6 scroll-smooth ${pricingPlans.length > 3 ? "snap-x snap-mandatory" : "grid grid-cols-1 md:grid-cols-3"}`}
            >
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className="min-w-[300px] max-w-sm flex-shrink-0 snap-center"
                >
                  <Card
                    key={index}
                    className={`relative bg-white shadow-sm border-gray-200 min-w-[300px] snap-start ${plan.popular ? "ring-2 ring-indigo-500 shadow-lg" : ""}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-indigo-600 text-white">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        {plan.price !== "Custom" && <span className="text-gray-500">/{plan.period}</span>}
                      </div>
                      <p className="text-gray-600 mt-2">{plan.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full mt-6 ${plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-900 hover:bg-gray-800 text-white"}`}
                        onClick={() => handleClick(plan)}
                      >
                        {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            {pricingPlans.length > 3 && (
              <button
                onClick={() => scroll("right")}
                className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                →
              </button>
            )}
          </div>

          <ContactSalesModal open={showContactModal} onOpenChange={setShowContactModal} />
          <PaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} price={selectedPrice} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Transform Your Hostel Business?</h2>
          <p className="text-xl text-indigo-200 mb-8">
            Join hundreds of hostel owners who have already streamlined their operations with HostelHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 gap-2">
                Start Your Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            {/* <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-indigo-600 bg-transparent"
            >
              Schedule a Demo
            </Button> */}
          </div>
          <p className="text-sm text-indigo-200 mt-4">It’s free (for now). • No setup fees • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                  H
                </div>
                <span className="text-xl font-bold">HostelHub</span>
              </div>
              <p className="text-gray-400 mb-4">The complete hostel management solution for modern property owners.</p>
              <div className="flex space-x-4">
                <Globe className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Smartphone className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                  e.preventDefault();
                setShowContactModal(true);}} className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 HostelHub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setModalOpen(true);
              }} className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Feature Unavailable"
        description="This feature is not yet available. We're working hard to launch it soon!"
      />
    </div>
  )
}
