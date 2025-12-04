"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Briefcase, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock job data (should match the jobs page data)
const jobsData: Record<string, any> = {
  "1": {
    id: "1",
    title: "Senior Product Designer",
    company: { name: "TechCorp", logo: "/placeholder.svg?height=100&width=100" },
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
  },
  "2": {
    id: "2",
    title: "UX Researcher",
    company: { name: "DesignHub", logo: "/placeholder.svg?height=100&width=100" },
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $120k",
  },
  "3": {
    id: "3",
    title: "Frontend Developer",
    company: { name: "WebFlow Inc", logo: "/placeholder.svg?height=100&width=100" },
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
  },
  "4": {
    id: "4",
    title: "Brand Designer",
    company: { name: "Creative Studio", logo: "/placeholder.svg?height=100&width=100" },
    location: "Los Angeles, CA",
    type: "Contract",
    salary: "$80k - $100k",
  },
  "5": {
    id: "5",
    title: "UI/UX Designer",
    company: { name: "StartupX", logo: "/placeholder.svg?height=100&width=100" },
    location: "Austin, TX",
    type: "Full-time",
    salary: "$85k - $110k",
  },
}

export default function JobApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const job = jobsData[jobId]

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    resume: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert("Application submitted successfully!")
    setIsSubmitting(false)
    router.push("/jobs")
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <Link href="/jobs">
          <Button>Back to Jobs</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back button */}
        <Link href="/jobs">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>

        {/* Job summary card */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 flex-shrink-0">
              <AvatarImage src={job.company.logo || "/placeholder.svg"} />
              <AvatarFallback>{job.company.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
              <p className="text-lg text-muted-foreground mb-3">{job.company.name}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {job.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                )}

                {job.type && (
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                )}

                {job.salary && (
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-foreground">{job.salary}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Application form */}
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-xl font-bold mb-6">Apply for this Position</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                name="linkedin"
                type="url"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>

            {/* Portfolio */}
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio URL</Label>
              <Input
                id="portfolio"
                name="portfolio"
                type="url"
                value={formData.portfolio}
                onChange={handleInputChange}
                placeholder="https://johndoe.com"
              />
            </div>

            {/* Resume Upload */}
            <div className="space-y-2">
              <Label htmlFor="resume">
                Resume/CV <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="cursor-pointer"
                />
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (Max 5MB)</p>
            </div>

            {/* Cover Letter */}
            <div className="space-y-2">
              <Label htmlFor="coverLetter">
                Cover Letter <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                rows={8}
                required
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">Min 100 characters</p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => router.push("/jobs")}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
