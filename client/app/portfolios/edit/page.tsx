import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Heart, Eye, TrendingUp, Mail, Linkedin, FileText, ExternalLink, Github, ArrowLeft } from "lucide-react"
import { PortfolioLikeButton } from "@/components/portfolio-like-button"

const mockPortfolioData: Record<string, any> = {
  "sarah-chen": {
    username: "sarah-chen",
    name: "Sarah Chen",
    college: "Stanford University",
    graduationYear: 2025,
    bio: "Passionate UI/UX designer and frontend developer. I love creating beautiful, intuitive interfaces that solve real problems. Currently seeking full-time opportunities.",
    coverImage: "/modern-app-design.png",
    avatar: "/placeholder.svg?height=150&width=150",
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
      <div className="relative h-64 md:h-80 bg-muted">
        <Image src={portfolio.coverImage || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Link href="/portfolios">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolios
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Image
            src={portfolio.avatar || "/placeholder.svg"}
            alt={portfolio.name}
            width={150}
            height={150}
            className="rounded-full border-4 border-background shadow-lg"
          />

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1 text-balance">{portfolio.name}</h1>
                <p className="text-lg text-muted-foreground">@{portfolio.username}</p>
                <p className="text-muted-foreground">
                  {portfolio.college} • Class of {portfolio.graduationYear}
                </p>
              </div>

              <PortfolioLikeButton initialLikes={portfolio.likes} />
            </div>

            {portfolio.rank && (
              <Card className="p-4 mb-4 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Rank</p>
                    <p className="text-2xl font-bold">#{portfolio.rank}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">This Week</p>
                    <p
                      className={`text-lg font-semibold flex items-center gap-1 ${portfolio.rankChange > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      <TrendingUp className={`h-4 w-4 ${portfolio.rankChange < 0 ? "rotate-180" : ""}`} />
                      {portfolio.rankChange > 0 ? "+" : ""}
                      {portfolio.rankChange} spots
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <p className="text-foreground mb-4 leading-relaxed">{portfolio.bio}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {portfolio.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            {portfolio.isAvailable && (
              <Badge className="bg-green-600 hover:bg-green-700 text-white mb-4">Available for Hire</Badge>
            )}

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${portfolio.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`https://${portfolio.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={portfolio.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.projects.map((project: any) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video bg-muted">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Live
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
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

        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-4">Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Likes</p>
              <p className="text-2xl font-bold flex items-center gap-2">
                <Heart className="h-5 w-5" />
                {portfolio.likes}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Profile Views</p>
              <p className="text-2xl font-bold flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {portfolio.views}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Rank</p>
              <p className="text-2xl font-bold">#{portfolio.rank}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
