"use client"

import { Button } from "@/components/ui/button"
import { PortfolioCard } from "@/components/portfolio-card"
import { ArrowRight, Trophy, Users, Briefcase, TrendingUp } from "lucide-react"
import Link from "next/link"

const topPortfolios = [
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
]

const stats = [
  { label: "Active Portfolios", value: "1,200+", icon: Users },
  { label: "Companies Hiring", value: "150+", icon: Briefcase },
  { label: "Students Hired", value: "500+", icon: TrendingUp },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Trophy className="h-4 w-4" />
                Portfolio Competition Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Compete. Showcase. Get Hired.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
                The platform where students showcase portfolios, compete for rankings, and connect directly with
                companies looking to hire top talent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Create Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/portfolios">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Browse Portfolios
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">How It Works</h2>
              <p className="text-lg text-muted-foreground">Three simple steps to get hired</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="relative p-6 rounded-lg border border-border bg-card text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3 mt-2">Create Portfolio</h3>
                <p className="text-muted-foreground">
                  Showcase your best projects, skills, and experience in a professional portfolio.
                </p>
              </div>

              <div className="relative p-6 rounded-lg border border-border bg-card text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3 mt-2">Get Likes & Rank Up</h3>
                <p className="text-muted-foreground">
                  The more likes you get, the higher you rank. Top portfolios get featured.
                </p>
              </div>

              <div className="relative p-6 rounded-lg border border-border bg-card text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3 mt-2">Get Discovered</h3>
                <p className="text-muted-foreground">
                  Companies browse top portfolios and reach out directly for job opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Portfolios */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                  <h2 className="text-3xl md:text-4xl font-bold text-balance">Top Ranked Portfolios</h2>
                </div>
                <p className="text-muted-foreground">This week's most liked student portfolios</p>
              </div>
              <Link href="/leaderboard" className="hidden sm:block">
                <Button variant="outline">
                  View Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {topPortfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.id} {...portfolio} />
              ))}
            </div>

            <div className="text-center sm:hidden">
              <Link href="/leaderboard">
                <Button variant="outline">
                  View Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to Get Hired?</h2>
              <p className="text-lg mb-8 opacity-90">
                Join over 1,200 students competing for top rankings and job opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Create Your Portfolio
                  </Button>
                </Link>
                <Link href="/portfolios">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Explore Portfolios
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
