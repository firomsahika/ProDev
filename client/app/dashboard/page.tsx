"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Eye, TrendingUp, Users, Briefcase, Edit } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const likesData = [
  { date: "Mon", likes: 45 },
  { date: "Tue", likes: 62 },
  { date: "Wed", likes: 78 },
  { date: "Thu", likes: 91 },
  { date: "Fri", likes: 105 },
  { date: "Sat", likes: 134 },
  { date: "Sun", likes: 156 },
]

const viewsData = [
  { date: "Mon", views: 234 },
  { date: "Tue", views: 312 },
  { date: "Wed", views: 401 },
  { date: "Thu", views: 567 },
  { date: "Fri", views: 689 },
  { date: "Sat", views: 823 },
  { date: "Sun", views: 945 },
]

const recentActivity = [
  { type: "like", message: "Company XYZ liked your portfolio", time: "2 hours ago" },
  { type: "view", message: "Google viewed your portfolio", time: "5 hours ago" },
  { type: "rank", message: "Your rank increased to #45", time: "1 day ago" },
  { type: "comment", message: "@alexrivera commented on your project", time: "2 days ago" },
  { type: "view", message: "Microsoft viewed your portfolio", time: "3 days ago" },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">My Dashboard</h1>
              <p className="text-muted-foreground">Track your portfolio performance and ranking</p>
            </div>
            <div className="flex gap-3">
              <Link href="/portfolios/edit">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Portfolio
                </Button>
              </Link>
              <Link href="/post">
                <Button>Post Project</Button>
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Current Rank</p>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-3xl font-bold mb-1">#45</p>
              <p className="text-sm text-green-600 font-medium">Up 8 spots this week</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Likes</p>
                <Heart className="h-4 w-4 text-red-500" />
              </div>
              <p className="text-3xl font-bold mb-1">234</p>
              <p className="text-sm text-muted-foreground">+23 this week</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <Eye className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-3xl font-bold mb-1">1,234</p>
              <p className="text-sm text-muted-foreground">+156 this week</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Companies Viewing</p>
                <Briefcase className="h-4 w-4 text-purple-500" />
              </div>
              <p className="text-3xl font-bold mb-1">12</p>
              <p className="text-sm text-muted-foreground">45% of total views</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Likes Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Likes This Week</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={likesData}>
                  <defs>
                    <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Area type="monotone" dataKey="likes" stroke="#ef4444" fillOpacity={1} fill="url(#colorLikes)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Views Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Views This Week</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "like"
                        ? "bg-red-100 dark:bg-red-900/20"
                        : activity.type === "view"
                          ? "bg-blue-100 dark:bg-blue-900/20"
                          : activity.type === "rank"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : "bg-purple-100 dark:bg-purple-900/20"
                    }`}
                  >
                    {activity.type === "like" && <Heart className="h-4 w-4 text-red-600" />}
                    {activity.type === "view" && <Eye className="h-4 w-4 text-blue-600" />}
                    {activity.type === "rank" && <TrendingUp className="h-4 w-4 text-green-600" />}
                    {activity.type === "comment" && <Users className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Call to Action */}
          <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Want to rank higher?</h3>
              <p className="text-muted-foreground mb-4">
                Share your portfolio on social media to get more likes and climb the leaderboard!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/portfolios/sarah-chen">
                  <Button variant="outline">View My Portfolio</Button>
                </Link>
                <Button>Share Portfolio</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
