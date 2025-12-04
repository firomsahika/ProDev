"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function PostJobPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
          <p className="text-muted-foreground">Find talented designers and developers</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title</Label>
            <Input id="job-title" placeholder="e.g. Senior Product Designer" className="w-full" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" placeholder="Your company name" className="w-full" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Describe the role, responsibilities, and requirements"
              className="min-h-40 resize-none"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g. San Francisco, CA or Remote" className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range (optional)</Label>
              <Input id="salary" placeholder="e.g. $100k - $140k" className="w-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Required Skills</Label>
            <Input id="skills" placeholder="Figma, UI/UX, Product Design" className="w-full" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo (optional)</Label>
            <Input id="logo" type="file" accept="image/*" className="w-full" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Publish Job
            </Button>
            <Button type="button" variant="outline" className="flex-1 bg-transparent">
              Save as Draft
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
