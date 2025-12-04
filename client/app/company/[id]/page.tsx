import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { JobCard } from "@/components/job-card"
import { Building2, MapPin, Users } from "lucide-react"

const mockCompany = {
  id: "1",
  name: "TechCorp",
  logo: "/placeholder.svg?height=120&width=120",
  about:
    "A leading technology company focused on building innovative products that empower people and businesses worldwide. We believe in creating meaningful solutions that make a difference.",
  location: "San Francisco, CA",
  employees: "500-1000",
  website: "techcorp.com",
  jobs: [
    {
      id: "1",
      title: "Senior Product Designer",
      company: {
        name: "TechCorp",
        logo: "/placeholder.svg?height=48&width=48",
      },
      location: "San Francisco, CA",
      skills: ["Figma", "UI/UX", "Product Design"],
      salary: "$120k - $160k",
      postedAt: "2 days ago",
    },
    {
      id: "2",
      title: "Lead UX Designer",
      company: {
        name: "TechCorp",
        logo: "/placeholder.svg?height=48&width=48",
      },
      location: "Remote",
      skills: ["User Research", "Wireframing", "Design Systems"],
      salary: "$140k - $180k",
      postedAt: "1 week ago",
    },
  ],
}

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
              <Avatar className="h-24 w-24 rounded-lg">
                <AvatarImage src={mockCompany.logo || "/placeholder.svg"} />
                <AvatarFallback>{mockCompany.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{mockCompany.name}</h1>
                    <p className="text-muted-foreground">Technology Company</p>
                  </div>
                  <Button>Contact</Button>
                </div>

                <p className="text-sm mb-4 leading-relaxed">{mockCompany.about}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span>{mockCompany.website}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{mockCompany.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{mockCompany.employees} employees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6">Open Positions</h2>
            <div className="grid gap-6">
              {mockCompany.jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
