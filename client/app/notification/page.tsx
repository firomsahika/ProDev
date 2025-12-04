"use client"

import { Navbar } from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, UserPlus, Briefcase, ThumbsUp, Eye } from "lucide-react"
import { useState } from "react"

const mockNotifications = [
  {
    id: "1",
    type: "like",
    user: "Alex Rivera",
    avatar: "/diverse-designer-avatars.png",
    content: "liked your design",
    target: "Modern Dashboard UI",
    timestamp: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    user: "Maya Patel",
    avatar: "/creative-professional.png",
    content: "commented on",
    target: "E-commerce Landing Page",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    user: "Jordan Lee",
    avatar: "/developer-avatar.png",
    content: "started following you",
    timestamp: "3 hours ago",
    read: false,
  },
  {
    id: "4",
    type: "job",
    user: "TechCorp Inc.",
    avatar: "/generic-company-logo.png",
    content: "posted a new job that matches your profile",
    target: "Senior UI Designer",
    timestamp: "5 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "like",
    user: "Sarah Chen",
    avatar: "/ux-designer-workflow.png",
    content: "appreciated your work on",
    target: "Mobile App Design",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "6",
    type: "view",
    user: "Design Studio",
    avatar: "/design-agency.jpg",
    content: "viewed your profile",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "7",
    type: "like",
    user: "Emma Wilson",
    avatar: "/diverse-designer-avatars.png",
    content: "liked your design",
    target: "Portfolio Website",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: "8",
    type: "comment",
    user: "Chris Anderson",
    avatar: "/developer-avatar.png",
    content: "commented on",
    target: "Brand Identity",
    timestamp: "4 days ago",
    read: true,
  },
  {
    id: "9",
    type: "follow",
    user: "Lisa Thompson",
    avatar: "/creative-professional.png",
    content: "started following you",
    timestamp: "5 days ago",
    read: true,
  },
  {
    id: "10",
    type: "like",
    user: "Mike Johnson",
    avatar: "/ux-designer-workflow.png",
    content: "liked your design",
    target: "UI Components Library",
    timestamp: "1 week ago",
    read: true,
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "like":
      return <Heart className="h-4 w-4 text-red-500" />
    case "comment":
      return <MessageCircle className="h-4 w-4 text-blue-500" />
    case "follow":
      return <UserPlus className="h-4 w-4 text-green-500" />
    case "job":
      return <Briefcase className="h-4 w-4 text-purple-500" />
    case "view":
      return <Eye className="h-4 w-4 text-slate-500" />
    default:
      return <ThumbsUp className="h-4 w-4 text-slate-500" />
  }
}

export default function NotificationsPage() {
  const [visibleCount, setVisibleCount] = useState(5)
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5)
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground mt-1">You have {unreadCount} unread notifications</p>
              )}
            </div>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-2">
              {mockNotifications.slice(0, visibleCount).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors ${
                    !notification.read ? "bg-muted/30" : "bg-card"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{notification.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-background rounded-full flex items-center justify-center border border-border">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold">{notification.user}</span>{" "}
                        <span className="text-muted-foreground">{notification.content}</span>{" "}
                        {notification.target && <span className="font-medium">{notification.target}</span>}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                    </div>

                    {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />}
                  </div>
                </div>
              ))}

              {visibleCount < mockNotifications.length && (
                <div className="flex justify-center pt-4 pb-2">
                  <Button variant="outline" onClick={loadMore}>
                    Load More Notifications
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="unread" className="space-y-2">
              {mockNotifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors bg-muted/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-11 w-11">
                          <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{notification.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-background rounded-full flex items-center justify-center border border-border">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed">
                          <span className="font-semibold">{notification.user}</span>{" "}
                          <span className="text-muted-foreground">{notification.content}</span>{" "}
                          {notification.target && <span className="font-medium">{notification.target}</span>}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                      </div>

                      <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="mentions" className="space-y-2">
              <div className="text-center py-12">
                <p className="text-muted-foreground">No mentions yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
