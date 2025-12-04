"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, X } from "lucide-react"

const availableSkills = [
  "React",
  "Vue.js",
  "Node.js",
  "Python",
  "JavaScript",
  "TypeScript",
  "UI/UX",
  "Figma",
  "AWS",
  "Docker",
  "PostgreSQL",
  "MongoDB",
]

interface CreatePortfolioModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePortfolioModal({ open, onOpenChange }: CreatePortfolioModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    college: "",
    graduationYear: new Date().getFullYear() + 1,
    skills: [] as string[],
    email: "",
    linkedin: "",
    github: "",
    isAvailable: true,
  })

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("[v0] Portfolio created:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Your Portfolio</DialogTitle>
          <p className="text-sm text-muted-foreground">Fill in your details to create your competitive portfolio</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Portfolio Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Sarah Chen - Full Stack Developer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                placeholder="Tell companies about yourself and your expertise..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                required
                rows={3}
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="college">College/University *</Label>
                <Input
                  id="college"
                  placeholder="e.g., Stanford University"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="graduationYear">Graduation Year *</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  placeholder="2025"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: Number.parseInt(e.target.value) })}
                  required
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="linkedin.com/in/yourprofile"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <Label>Skills * (Select at least 3)</Label>
            <p className="text-sm text-muted-foreground mb-2">Choose your top skills</p>
            <div className="flex flex-wrap gap-2">
              {availableSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={formData.skills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer hover:opacity-80 transition-opacity text-xs"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                  {formData.skills.includes(skill) && <X className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Selected: {formData.skills.length} skills</p>
          </div>

          {/* Profile Photo */}
          <div>
            <Label>Profile Photo</Label>
            <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload photo</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <Label>Cover Image</Label>
            <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Click to upload cover</p>
              <p className="text-xs text-muted-foreground mt-1">Recommended: 1920x400px</p>
            </div>
          </div>

          {/* Available for hire */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="available"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
              className="w-4 h-4"
            />
            <Label htmlFor="available" className="cursor-pointer">
              I am available for hire
            </Label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Portfolio
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            You can add projects and more details after creating your portfolio
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
