"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { DesignCard } from "@/components/design-card"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const mockDesigns: Record<string, any> = {
  "1": {
    id: "1",
    images: ["/modern-app-design.png", "/general-dashboard-interface.png"],
    title: "Mobile Banking App Redesign",
    description:
      "A complete redesign of a mobile banking application focused on improving user experience and accessibility. The new design features a clean interface, intuitive navigation, and modern visual elements that make banking simple and enjoyable.",
    designer: {
      userId: "1",
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      profession: "Product Designer",
    },
    likes: 245,
    comments: [
      {
        id: "1",
        author: "Alex Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Beautiful work! Love the clean interface and attention to detail.",
        timestamp: "2 hours ago",
      },
    ],
    tags: ["UI/UX", "Mobile", "Banking", "Product Design"],
  },
  "2": {
    id: "2",
    images: ["/general-dashboard-interface.png"],
    title: "Analytics Dashboard UI",
    description:
      "A modern analytics dashboard with real-time data visualization, customizable widgets, and intuitive navigation. Designed to help teams make data-driven decisions quickly.",
    designer: {
      userId: "2",
      name: "Alex Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
      profession: "Frontend Developer",
    },
    likes: 189,
    comments: [
      {
        id: "1",
        author: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Great use of data visualization!",
        timestamp: "1 hour ago",
      },
    ],
    tags: ["Dashboard", "Data Visualization", "Web Design"],
  },
  "3": {
    id: "3",
    images: ["/ecommerce-website-homepage.png"],
    title: "E-commerce Product Page",
    description:
      "Clean and conversion-focused e-commerce design with emphasis on product photography and seamless checkout experience.",
    designer: {
      userId: "3",
      name: "Maya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      profession: "UI Designer",
    },
    likes: 312,
    comments: [
      {
        id: "1",
        author: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Love the product layout!",
        timestamp: "3 hours ago",
      },
    ],
    tags: ["E-commerce", "Web Design", "UI"],
  },
  "4": {
    id: "4",
    images: ["/food-delivery-app-screen.png"],
    title: "Food Delivery App Concept",
    description:
      "Modern food delivery app with focus on quick ordering, real-time tracking, and beautiful food photography presentation.",
    designer: {
      userId: "4",
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      profession: "Full Stack Designer",
    },
    likes: 428,
    comments: [
      {
        id: "1",
        author: "Emma Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "The illustrations are amazing!",
        timestamp: "4 hours ago",
      },
    ],
    tags: ["Mobile", "Food", "App Design"],
  },
  "5": {
    id: "5",
    images: ["/fitness-app-ui.png"],
    title: "Fitness Tracking Interface",
    description:
      "Comprehensive fitness tracking app with workout plans, progress tracking, and social features to keep users motivated.",
    designer: {
      userId: "5",
      name: "Chris Wong",
      avatar: "/placeholder.svg?height=40&width=40",
      profession: "Motion Designer",
    },
    likes: 167,
    comments: [
      {
        id: "1",
        author: "Maya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "The animations must be smooth!",
        timestamp: "5 hours ago",
      },
    ],
    tags: ["Mobile", "Fitness", "Health"],
  },
  "6": {
    id: "6",
    images: ["/music-player-app.jpg"],
    title: "Music Player Redesign",
    description:
      "Beautiful music player interface with focus on album artwork, intuitive controls, and seamless listening experience.",
    designer: {
      userId: "6",
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      profession: "Brand Designer",
    },
    likes: 391,
    comments: [
      {
        id: "1",
        author: "Chris Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Beautiful branding work!",
        timestamp: "6 hours ago",
      },
    ],
    tags: ["Mobile", "Music", "Branding"],
  },
}

const similarDesigns = [
  {
    id: "2",
    image: "/general-dashboard-interface.png",
    title: "Analytics Dashboard UI",
    designer: {
      name: "Alex Rivera",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 189,
    comments: 12,
  },
  {
    id: "3",
    image: "/ecommerce-website-homepage.png",
    title: "E-commerce Product Page",
    designer: {
      name: "Maya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 312,
    comments: 24,
  },
  {
    id: "4",
    image: "/food-delivery-app-screen.png",
    title: "Food Delivery App Concept",
    designer: {
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 428,
    comments: 31,
  },
]

export default function DesignDetailPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)

  const design = mockDesigns[params.id] || mockDesigns["1"]

  return (
    <div className="min-h-screen bg-background">
      

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <Link
                href={`/profile/${design.designer.userId}`}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={design.designer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{design.designer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{design.designer.name}</h2>
                  <p className="text-sm text-muted-foreground">{design.designer.profession}</p>
                </div>
              </Link>

              <Button>Follow</Button>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-balance">{design.title}</h1>
            <p className="text-muted-foreground leading-relaxed mb-6">{design.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <Button variant={liked ? "default" : "outline"} size="sm" onClick={() => setLiked(!liked)}>
                <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                {design.likes + (liked ? 1 : 0)}
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {design.comments.length}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {design.tags.map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1 text-sm font-medium bg-muted rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 mb-12">
            {design.images.map((image: string, index: number) => (
              <div key={index} className="rounded-lg overflow-hidden bg-muted">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${design.title} - Image ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6">Comments ({design.comments.length})</h3>

            <div className="mb-6">
              <Textarea placeholder="Add a comment..." className="mb-3 resize-none" />
              <Button size="sm">Post Comment</Button>
            </div>

            <div className="space-y-6">
              {design.comments.map((comment: any) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Similar Designs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarDesigns.map((design) => (
                <DesignCard key={design.id} {...design} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
