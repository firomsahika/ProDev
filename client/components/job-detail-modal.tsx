"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Briefcase, Clock } from "lucide-react"

interface JobDetailModalProps {
  job: {
    id: string
    title: string
    company: {
      name: string
      logo: string
    }
    location?: string
    type?: string
    skills: string[]
    salary?: string
    postedAt: string
    description?: string
    fullDescription?: string
    requirements?: string[]
    benefits?: string[]
  } | null
  onClose: () => void
}

export function JobDetailModal({ job, onClose }: JobDetailModalProps) {
  if (!job) return null

  return (
    <Dialog open={!!job} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Job Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header section */}
          <div className="flex items-start gap-4 pb-6 border-b">
            <Avatar className="h-16 w-16 flex-shrink-0">
              <AvatarImage src={job.company.logo || "/placeholder.svg"} />
              <AvatarFallback>{job.company.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
              <p className="text-lg text-muted-foreground mb-3">{job.company.name}</p>

              {/* Job metadata */}
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

                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{job.postedAt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About the Role</h3>
            <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {job.fullDescription || job.description}
            </div>
          </div>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="space-y-2 text-muted-foreground">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Benefits</h3>
              <ul className="space-y-2 text-muted-foreground">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1.5 text-sm font-medium bg-muted text-foreground rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1" size="lg" onClick={() => (window.location.href = `/jobs/apply/${job.id}`)}>
              Apply Now
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
