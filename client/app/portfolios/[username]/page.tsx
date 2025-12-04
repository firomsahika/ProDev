import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Mail, Linkedin, FileText, ExternalLink, Github, ArrowLeft } from "lucide-react"
import { PortfolioLikeButton } from "@/components/portfolio-like-button"

const mockPortfolioData: Record<string, any> = {
  "sarah-chen": {
    username: "sarah-chen",
    name: "Sarah Chen",
    college: "Addis Ababa University",
    graduationYear: 2025,
    bio: "Passionate UI/UX designer and frontend developer. I love creating beautiful, intuitive interfaces that solve real problems. Currently seeking full-time opportunities.",
    coverImage: "/modern-app-design.png",
    avatar: "/generic-company-logo.png",
    skills: ["React", "UI/UX", "Figma", "TypeScript", "Tailwind CSS", "Next.js"],
    email: "sarah.chen@stanford.edu",
    linkedin: "linkedin.com/in/sarahchen",
    resumeUrl: "/resume.pdf",
    likes: 1234,
    views: 15678,
    rank: 1,
    rankChange: 2,
    isAvailable: true,
    projects: [
      {
        id: "1",
        title: "Mobile Banking App Redesign",
        description: "Complete redesign of a banking app focusing on user experience and accessibility",
        image: "/modern-app-design.png",
        tags: ["React Native", "Figma", "UX Research"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example",
      },
      {
        id: "2",
        title: "E-commerce Dashboard",
        description: "Admin dashboard for managing products, orders, and analytics",
        image: "/general-dashboard-interface.png",
        tags: ["React", "TypeScript", "Chart.js"],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example",
      },
    ],
  },
}

export default async function PortfolioPage({ params }: { params: { username: string } }) {
  const resolvedParams = await params
  const portfolio = mockPortfolioData[resolvedParams.username] || mockPortfolioData["sarah-chen"]

  return (
    <div className="min-h-screen bg-background">
      {/* <div className="relative h-48 md:h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        <Image src={portfolio.coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover opacity-30" />
      </div> */}

      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/portfolios">
          <Button variant="ghost" size="sm" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row gap-6 py-8 border-b">
          <div className="flex-shrink-0">
            <Image
              src={portfolio.avatar || "/modern-app-design.png"}
              alt={portfolio.name}
              width={120}
              height={120}
              className="rounded-lg border shadow-sm"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-balance">{portfolio.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {portfolio.college} • {portfolio.graduationYear}
              </p>
            </div>

            <p className="text-sm text-foreground leading-relaxed max-w-2xl">{portfolio.bio}</p>

            <div className="flex flex-wrap gap-2">
              {portfolio.skills.slice(0, 5).map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {portfolio.skills.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{portfolio.skills.length - 5}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {portfolio.isAvailable && (
                <Badge className="bg-green-600 hover:bg-green-700 text-white">Available for Hire</Badge>
              )}
              {portfolio.rank && (
                <Badge
                  variant="outline"
                  className="border-yellow-600 text-yellow-600 dark:border-yellow-500 dark:text-yellow-500"
                >
                  Rank #{portfolio.rank}
                  {portfolio.rankChange > 0 && (
                    <span className="ml-1 text-green-600 dark:text-green-500">↑{portfolio.rankChange}</span>
                  )}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="default" size="sm" asChild>
                <a href={`mailto:${portfolio.email}`}>
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  Contact
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`https://${portfolio.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-3.5 w-3.5 mr-1.5" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={portfolio.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  Resume
                </a>
              </Button>
              <PortfolioLikeButton initialLikes={portfolio.likes} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-6 border-b">
          <div className="text-center">
            <p className="text-2xl font-bold">{portfolio.likes.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Likes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{portfolio.views.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Views</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{portfolio.projects.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Projects</p>
          </div>
        </div>

        <div className="py-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.projects.map((project: any) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm line-clamp-1">{project.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs px-2 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    {project.liveUrl && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Live
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
