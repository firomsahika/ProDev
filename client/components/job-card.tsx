"use client"

import { MapPin, Briefcase, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface JobCardProps {
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
  onClick?: () => void
}

export function JobCard({
  id,
  title,
  company,
  location,
  type,
  skills,
  salary,
  postedAt,
  description,
  onClick,
}: JobCardProps) {
  return (
    <div
      className="p-4 border border-border rounded-lg bg-card hover:shadow-md transition-all hover:border-foreground/20 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage src={company.logo || "/placeholder.svg"} />
            <AvatarFallback className="text-sm">{company.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-0.5 truncate">{title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{company.name}</p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{location}</span>
                </div>
              )}

              {type && (
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>{type}</span>
                </div>
              )}

              {salary && (
                <div className="flex items-center gap-1">
                  <span className="font-medium text-foreground">{salary}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{postedAt}</span>
              </div>
            </div>

            {description && <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{description}</p>}

            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 4).map((skill, index) => (
                <span key={index} className="px-2 py-0.5 text-xs font-medium bg-muted text-foreground rounded-full">
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-muted text-foreground rounded-full">
                  +{skills.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  )
}
