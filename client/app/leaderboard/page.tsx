"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Heart, Eye, TrendingUp, TrendingDown, Crown } from "lucide-react"

const mockLeaderboardData = [
  {
    rank: 1,
    username: "sarah-chen",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    college: "Stanford University",
    skills: ["React", "UI/UX", "Figma"],
    likes: 1234,
    views: 15678,
    rankChange: 2,
  },
  {
    rank: 2,
    username: "alex-rivera",
    name: "Alex Rivera",
    avatar: "/placeholder.svg?height=80&width=80",
    college: "MIT",
    skills: ["Node.js", "React", "AWS"],
    likes: 1089,
    views: 12456,
    rankChange: -1,
  },
  {
    rank: 3,
    username: "maya-patel",
    name: "Maya Patel",
    avatar: "/placeholder.svg?height=80&width=80",
    college: "UC Berkeley",
    skills: ["Vue.js", "Laravel", "MySQL"],
    likes: 967,
    views: 10234,
    rankChange: 5,
  },
  {
    rank: 4,
    username: "jordan-lee",
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=80&width=80",
    college: "Carnegie Mellon",
    skills: ["Flutter", "Firebase", "Swift"],
    likes: 856,
    views: 9567,
    rankChange: 3,
  },
  {
    rank: 5,
    username: "chris-wong",
    name: "Chris Wong",
    avatar: "/placeholder.svg?height=80&width=80",
    college: "Georgia Tech",
    skills: ["Python", "Django", "PostgreSQL"],
    likes: 734,
    views: 8234,
    rankChange: -2,
  },
  {
    rank: 6,
    username: "emma-davis",
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=80&width=80",
    college: "Cornell University",
    skills: ["Design Systems", "Sketch", "Framer"],
    likes: 689,
    views: 7456,
    rankChange: 1,
  },
]

const generateMockData = (start: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    rank: start + i,
    username: `user-${start + i}`,
    name: `Student ${start + i}`,
    avatar: "/placeholder.svg?height=50&width=50",
    college: "University",
    skills: ["JavaScript", "React", "CSS"],
    likes: Math.floor(Math.random() * 500) + 100,
    views: Math.floor(Math.random() * 5000) + 1000,
    rankChange: Math.floor(Math.random() * 10) - 5,
  }))
}

const allRankings = [...mockLeaderboardData, ...generateMockData(7, 44)]

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "all">("week")
  const [displayCount, setDisplayCount] = useState(20)

  const topThree = allRankings.slice(0, 3)
  const restOfLeaderboard = allRankings.slice(3, displayCount)

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500 fill-yellow-500" />
    if (rank === 2) return <Medal className="h-6 w-6 text-slate-400 fill-slate-400" />
    if (rank === 3) return <Medal className="h-6 w-6 text-amber-600 fill-amber-600" />
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Leaderboard</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-6">Top portfolios ranked by community likes</p>

            <div className="inline-flex gap-2 bg-muted p-1 rounded-lg">
              <Button
                variant={timeFilter === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter("week")}
              >
                This Week
              </Button>
              <Button
                variant={timeFilter === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter("month")}
              >
                This Month
              </Button>
              <Button
                variant={timeFilter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter("all")}
              >
                All Time
              </Button>
            </div>
          </div>

          {/* Top 3 Special Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {topThree.map((entry) => (
              <Link key={entry.rank} href={`/portfolios/${entry.username}`}>
                <Card
                  className={`p-6 text-center hover:shadow-lg transition-all ${entry.rank === 1 ? "md:col-span-3 md:scale-105 border-yellow-500/50" : ""}`}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4">{getRankIcon(entry.rank)}</div>
                    <div className="relative mb-4">
                      <Image
                        src={entry.avatar || "/placeholder.svg"}
                        alt={entry.name}
                        width={entry.rank === 1 ? 100 : 80}
                        height={entry.rank === 1 ? 100 : 80}
                        className="rounded-full border-4 border-border"
                      />
                      <div
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-bold text-sm ${
                          entry.rank === 1
                            ? "bg-yellow-500 text-white"
                            : entry.rank === 2
                              ? "bg-slate-400 text-white"
                              : "bg-amber-600 text-white"
                        }`}
                      >
                        #{entry.rank}
                      </div>
                    </div>
                    <h3 className={`font-bold mb-1 ${entry.rank === 1 ? "text-2xl" : "text-xl"}`}>{entry.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">@{entry.username}</p>
                    <p className="text-xs text-muted-foreground mb-4">{entry.college}</p>

                    <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                      {entry.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 justify-center">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="font-bold">{entry.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{entry.views}</span>
                      </div>
                    </div>

                    {entry.rankChange !== 0 && (
                      <div
                        className={`mt-3 flex items-center gap-1 text-sm font-medium ${
                          entry.rankChange > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {entry.rankChange > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(entry.rankChange)} spots
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Rest of Leaderboard */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold mb-4">Rankings 4-{displayCount}</h2>
            {restOfLeaderboard.map((entry) => (
              <Link key={entry.rank} href={`/portfolios/${entry.username}`}>
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-muted-foreground w-12 text-center shrink-0">
                      #{entry.rank}
                    </div>

                    <Image
                      src={entry.avatar || "/placeholder.svg"}
                      alt={entry.name}
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-border shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground truncate">{entry.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        @{entry.username} • {entry.college}
                      </p>
                    </div>

                    <div className="hidden sm:flex flex-wrap gap-1.5 max-w-xs">
                      {entry.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="font-semibold">{entry.likes}</span>
                      </div>
                      <div className="hidden md:flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{entry.views}</span>
                      </div>
                      {entry.rankChange !== 0 && (
                        <div
                          className={`flex items-center gap-0.5 text-sm font-medium w-12 ${
                            entry.rankChange > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {entry.rankChange > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {Math.abs(entry.rankChange)}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {displayCount < allRankings.length && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setDisplayCount((prev) => Math.min(prev + 20, allRankings.length))}
              >
                Load More Rankings
              </Button>
            </div>
          )}

          {/* Your Rank Card (for logged in users) */}
          <Card className="mt-12 p-6 bg-primary/5 border-primary/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Your Current Rank</p>
              <p className="text-4xl font-bold mb-2">#127</p>
              <p className="text-sm text-muted-foreground mb-4">
                <TrendingUp className="h-4 w-4 inline text-green-600" /> Up 12 spots this week
              </p>
              <Link href="/dashboard">
                <Button>View My Dashboard</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
