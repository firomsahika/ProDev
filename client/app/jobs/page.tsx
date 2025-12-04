"use client"

import { Navbar } from "@/components/navbar"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { JobDetailModal } from "@/components/job-detail-modal"
import Link from "next/link"

const mockJobs = [
  {
    id: "1",
    title: "Senior Product Designer",
    company: {
      name: "TechCorp",
      logo: "/placeholder.svg?height=48&width=48",
    },
    location: "San Francisco, CA",
    type: "Full-time",
    skills: ["Figma", "UI/UX", "Product Design", "Design Systems"],
    salary: "$120k - $160k",
    postedAt: "2 days ago",
    description:
      "We're seeking a talented Senior Product Designer to join our innovative team. You'll lead the design of our flagship products, collaborate with cross-functional teams, and help shape the future of our design system.",
    fullDescription: `We're seeking a talented Senior Product Designer to join our innovative team at TechCorp. 

As a Senior Product Designer, you will:
• Lead the design of our flagship products from concept to launch
• Collaborate with product managers, engineers, and stakeholders
• Create and maintain our design system
• Conduct user research and usability testing
• Mentor junior designers and contribute to design culture

Requirements:
• 5+ years of product design experience
• Expert proficiency in Figma and design tools
• Strong portfolio demonstrating end-to-end product design
• Experience with design systems and component libraries
• Excellent communication and presentation skills

Benefits:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work schedule and remote options
• Professional development budget
• Collaborative and inclusive team culture`,
    requirements: [
      "5+ years of product design experience",
      "Expert proficiency in Figma",
      "Strong portfolio",
      "Design systems experience",
    ],
    benefits: ["Health insurance", "Equity package", "Remote work", "Professional development budget"],
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: {
      name: "StartupXYZ",
      logo: "/placeholder.svg?height=48&width=48",
    },
    location: "Remote",
    type: "Full-time",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    salary: "$100k - $140k",
    postedAt: "1 week ago",
    description:
      "Join our fast-growing startup as a Frontend Developer. Build responsive, performant web applications using modern technologies. Work remotely with a talented team across multiple time zones.",
    fullDescription: `Join our fast-growing startup as a Frontend Developer and help us build the future of web applications.

As a Frontend Developer, you will:
• Build and maintain scalable web applications using React and Next.js
• Collaborate with designers to implement pixel-perfect UIs
• Optimize application performance and user experience
• Write clean, maintainable, and well-tested code
• Participate in code reviews and technical discussions

Requirements:
• 3+ years of frontend development experience
• Strong proficiency in React, TypeScript, and Next.js
• Experience with Tailwind CSS and modern styling approaches
• Understanding of web performance optimization
• Excellent problem-solving skills

Benefits:
• Fully remote work environment
• Flexible working hours
• Competitive compensation
• Learning and development budget
• Stock options`,
    requirements: [
      "3+ years frontend experience",
      "React and TypeScript expertise",
      "Next.js proficiency",
      "Performance optimization skills",
    ],
    benefits: ["Fully remote", "Flexible hours", "Stock options", "Learning budget"],
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: {
      name: "Creative Studios",
      logo: "/placeholder.svg?height=48&width=48",
    },
    location: "New York, NY",
    type: "Contract",
    skills: ["Sketch", "Prototyping", "User Research", "Wireframing"],
    salary: "$90k - $120k",
    postedAt: "3 days ago",
    description:
      "Creative Studios is looking for a passionate UI/UX Designer to craft beautiful, intuitive user experiences. You'll conduct user research, create prototypes, and work closely with our development team.",
    fullDescription: `Creative Studios is looking for a passionate UI/UX Designer to join our team on a contract basis.

As a UI/UX Designer, you will:
• Conduct user research and gather insights
• Create wireframes, prototypes, and high-fidelity designs
• Design intuitive user interfaces for web and mobile
• Collaborate with developers to ensure design implementation
• Present design concepts to stakeholders

Requirements:
• 3+ years of UI/UX design experience
• Proficiency in Sketch, Figma, or similar tools
• Strong prototyping and wireframing skills
• Experience conducting user research
• Portfolio demonstrating UX process

Benefits:
• Competitive contract rate
• Flexible schedule
• Opportunity for full-time conversion
• Creative and collaborative environment`,
    requirements: ["3+ years UI/UX experience", "Sketch/Figma proficiency", "User research skills", "Strong portfolio"],
    benefits: ["Competitive rate", "Flexible schedule", "Full-time conversion potential"],
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: {
      name: "DevShop",
      logo: "/placeholder.svg?height=48&width=48",
    },
    location: "Austin, TX",
    type: "Full-time",
    skills: ["Node.js", "React", "PostgreSQL", "AWS"],
    salary: "$110k - $150k",
    postedAt: "5 days ago",
    description:
      "DevShop is expanding! We need a Full Stack Developer who can handle both frontend and backend challenges. You'll work on exciting projects involving modern web technologies and cloud infrastructure.",
    fullDescription: `DevShop is expanding and we're looking for a talented Full Stack Developer to join our Austin team.

As a Full Stack Developer, you will:
• Develop and maintain full-stack web applications
• Build RESTful APIs using Node.js and Express
• Design and optimize database schemas with PostgreSQL
• Deploy and manage applications on AWS infrastructure
• Work across the entire development lifecycle

Requirements:
• 4+ years of full-stack development experience
• Strong proficiency in Node.js and React
• Experience with PostgreSQL or similar databases
• Familiarity with AWS services (EC2, S3, RDS, Lambda)
• Understanding of DevOps practices

Benefits:
• Competitive salary and benefits
• Health, dental, and vision insurance
• 401(k) matching
• Paid time off and holidays
• Professional development opportunities`,
    requirements: [
      "4+ years full-stack experience",
      "Node.js and React expertise",
      "PostgreSQL proficiency",
      "AWS experience",
    ],
    benefits: ["Health insurance", "401(k) matching", "PTO", "Development opportunities"],
  },
  {
    id: "5",
    title: "Brand Designer",
    company: {
      name: "Creative Agency",
      logo: "/placeholder.svg?height=48&width=48",
    },
    location: "Los Angeles, CA",
    type: "Part-time",
    skills: ["Branding", "Illustration", "Adobe Creative Suite"],
    salary: "$80k - $100k",
    postedAt: "1 day ago",
    description:
      "Help brands tell their story through compelling visual design. Create logos, brand guidelines, and marketing materials for diverse clients ranging from startups to established enterprises.",
    fullDescription: `Help brands tell their story through compelling visual design at our creative agency in Los Angeles.

As a Brand Designer, you will:
• Create brand identities including logos and brand guidelines
• Design marketing materials across various mediums
• Develop visual concepts for client presentations
• Collaborate with copywriters and strategists
• Manage multiple projects simultaneously

Requirements:
• 3+ years of brand design experience
• Expert proficiency in Adobe Creative Suite
• Strong illustration skills
• Excellent typography and layout skills
• Portfolio demonstrating brand work

Benefits:
• Flexible part-time schedule (20-30 hours/week)
• Competitive hourly rate
• Creative freedom and autonomy
• Diverse client portfolio
• Potential for full-time position`,
    requirements: ["3+ years brand design", "Adobe Creative Suite expert", "Strong illustration", "Brand portfolio"],
    benefits: ["Flexible schedule", "Competitive rate", "Creative freedom", "Diverse projects"],
  },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJob, setSelectedJob] = useState<(typeof mockJobs)[0] | null>(null)

  const filteredJobs = mockJobs.filter((job) => {
    const query = searchQuery.toLowerCase()
    return (
      searchQuery === "" ||
      job.title.toLowerCase().includes(query) ||
      job.company.name.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.skills.some((skill) => skill.toLowerCase().includes(query))
    )
  })

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Listings</h1>
            <p className="text-muted-foreground">Find your next opportunity</p>
          </div>
          <Link href="/jobs/post">
             <Button>Post a Job</Button>
          </Link>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, company, location, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} {...job} onClick={() => setSelectedJob(job)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs found matching your search.</p>
          </div>
        )}
      </main>

      <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </div>
  )
}
