"use client"

import { useState } from "react"
import { PortfolioCard } from "@/components/portfolio-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreatePortfolioModal } from "@/components/create-portfolio-modal"

const mockPortfolios = [
  {
    id: "1",
    username: "sarah-chen",
    name: "Sarah Chen",
    college: "Stanford University",
    coverImage: "/modern-app-design.png",
    avatar: "/placeholder.svg?height=100&width=100",
    skills: ["React", "UI/UX", "Figma", "TypeScript"],
    likes: 1234,
    views: 15678,
    rank: 1,
    rankChange: 2,
    isAvailable: true,
  },
  {
    id: "2",
    username: "alex-rivera",
    name: "Alex Rivera",
    college: "MIT",
    coverImage: "/general-dashboard-interface.png",
    avatar: "/placeholder.svg?height=100&width=100",
    skills: ["Node.js", "React", "AWS", "Docker"],
    likes: 1089,
    views: 12456,
    rank: 2,
    rankChange: -1,
    isAvailable: true,
  },
  {
    id: "3",
    username: "maya-patel",
    name: "Maya Patel",
    college: "UC Berkeley",
    coverImage: "/ecommerce-website-homepage.png",
    avatar: "/placeholder.svg?height=100&width=100",
    skills: ["Vue.js", "Laravel", "MySQL", "Tailwind"],
    likes: 967,
    views: 10234,
    rank: 3,
    rankChange: 5,
    isAvailable: false,
  },
  {
    id: "4",
    username: "jordan-lee",
    name: "Jordan Lee",
    college: "Carnegie Mellon",
    coverImage: "/food-delivery-app-screen.png",
    avatar: "/placeholder.svg?height=100&width=100",
    skills: ["Flutter", "Firebase", "Swift", "Kotlin"],
    likes: 856,
    views: 9567,
    rank: 4,
    rankChange: 3,
    isAvailable: true,
  },
  {
    id: "5",
    username: "chris-wong",
    name: "Chris Wong",
    college: "Georgia Tech",
    coverImage: "/fitness-app-ui.png",
    avatar: "/placeholder.svg?height=100&width=100",
    skills: ["Python", "Django", "PostgreSQL", "Redis"],
    likes: 734,
    views: 8234,
    rank: 5,
    rankChange: -2,
    isAvailable: true,
  },
  {
    id: "6",
    username: "emma-davis",
    name: "Emma Davis",
    college: "Cornell University",
    coverImage: "/music-player-app.jpg",
    avatar: "/placeholder.svg?height=100&width=100",
    skills: ["Design Systems", "Sketch", "Framer", "Prototyping"],
    likes: 689,
    views: 7456,
    rank: 6,
    rankChange: 1,
    isAvailable: false,
  },
]

export default function PortfoliosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("likes")
  const [filterSkill, setFilterSkill] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const allSkills = ["all", ...new Set(mockPortfolios.flatMap((p) => p.skills))]

  const filteredPortfolios = mockPortfolios
    .filter((portfolio) => {
      const matchesSearch =
        searchQuery === "" ||
        portfolio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portfolio.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portfolio.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesSkill = filterSkill === "all" || portfolio.skills.includes(filterSkill)

      return matchesSearch && matchesSkill
    })
    .sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes
      if (sortBy === "views") return b.views - a.views
      if (sortBy === "rank") return (a.rank || 999) - (b.rank || 999)
      return 0
    })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-balance">Portfolio Competition</h1>
            <p className="text-lg text-muted-foreground">
              Discover top student portfolios. The most liked portfolios rank higher and get noticed by companies.
            </p>
          </div>
          <Button size="lg" className="whitespace-nowrap" onClick={() => setShowCreateModal(true)}>
            <Plus className="h-5 w-5 mr-2" />
            Create Portfolio
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, college, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="likes">Most Liked</SelectItem>
              <SelectItem value="views">Most Viewed</SelectItem>
              <SelectItem value="rank">Top Ranked</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterSkill} onValueChange={setFilterSkill}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by skill" />
            </SelectTrigger>
            <SelectContent>
              {allSkills.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill === "all" ? "All Skills" : skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPortfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} {...portfolio} />
          ))}
        </div>

        {filteredPortfolios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No portfolios found matching your criteria.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Portfolios
          </Button>
        </div>

        <CreatePortfolioModal open={showCreateModal} onOpenChange={setShowCreateModal} />
      </div>
    </div>
  )
}
