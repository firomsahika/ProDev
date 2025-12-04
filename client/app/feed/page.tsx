"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, MessageCircle, Share2, User, ImageIcon, X, Send } from "lucide-react"

interface Comment {
  id: string
  author: {
    username: string
    name: string
    avatar: string
  }
  content: string
  timestamp: string
}

interface Post {
  id: string
  author: {
    username: string
    name: string
    avatar: string
  }
  timestamp: string
  image?: string
  description: string
  tags: string[]
  likes: number
  comments: number
  isLiked: boolean
  commentList: Comment[]
}

const mockFeed: Post[] = [
  {
    id: "1",
    author: {
      username: "sarah-chen",
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    timestamp: "2h",
    image: "/modern-app-design.png",
    description:
      "Excited to share my latest project - a complete redesign of a mobile banking app focusing on accessibility and user experience. 🎨 #ReactNative #UIUX #Figma",
    tags: ["ReactNative", "UIUX", "Figma"],
    likes: 45,
    comments: 12,
    isLiked: false,
    commentList: [
      {
        id: "c1",
        author: {
          username: "alex-rivera",
          name: "Alex Rivera",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "This looks amazing! Love the color scheme and attention to accessibility.",
        timestamp: "1h",
      },
      {
        id: "c2",
        author: {
          username: "maya-patel",
          name: "Maya Patel",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Great work! How long did this project take?",
        timestamp: "45m",
      },
    ],
  },
  {
    id: "2",
    author: {
      username: "alex-rivera",
      name: "Alex Rivera",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    timestamp: "5h",
    image: "/general-dashboard-interface.png",
    description:
      "Built a full-stack analytics dashboard with real-time updates using WebSockets. The backend handles 1000+ concurrent connections efficiently. 🚀",
    tags: ["React", "Nodejs", "WebSockets"],
    likes: 62,
    comments: 18,
    isLiked: false,
    commentList: [],
  },
  {
    id: "3",
    author: {
      username: "maya-patel",
      name: "Maya Patel",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    timestamp: "1d",
    description:
      "Just deployed my portfolio website! Clean, minimal, and fully responsive. Check it out and let me know what you think! ✨",
    tags: ["NextJS", "TailwindCSS", "Portfolio"],
    likes: 128,
    comments: 34,
    isLiked: false,
    commentList: [],
  },
  {
    id: "4",
    author: {
      username: "jordan-lee",
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    timestamp: "1d",
    image: "/food-delivery-app-screen.png",
    description:
      "Food delivery app with real-time order tracking and seamless payments. Built with Flutter for both iOS and Android.",
    tags: ["Flutter", "Firebase", "MobileApp"],
    likes: 91,
    comments: 23,
    isLiked: false,
    commentList: [],
  },
]

export default function FeedPage() {
  const [posts, setPosts] = useState(mockFeed)
  const [filter, setFilter] = useState<"all" | "following" | "trending">("all")
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [postDescription, setPostDescription] = useState("")
  const [postImage, setPostImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [commentModalOpen, setCommentModalOpen] = useState(false)
  const [activePostId, setActivePostId] = useState<string | null>(null)
  const [commentText, setCommentText] = useState("")

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPostImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setPostImage(null)
    setImagePreview(null)
  }

  const handlePostSubmit = () => {
    console.log("Posting:", postDescription, postImage)
    setIsPostModalOpen(false)
    setPostDescription("")
    removeImage()
  }

  const openCommentModal = (postId: string) => {
    setActivePostId(postId)
    setCommentModalOpen(true)
  }

  const handleCommentSubmit = () => {
    if (!commentText.trim() || !activePostId) return

    setPosts(
      posts.map((post) => {
        if (post.id === activePostId) {
          const newComment: Comment = {
            id: `c${Date.now()}`,
            author: {
              username: "your-username",
              name: "Your Name",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: commentText,
            timestamp: "Just now",
          }
          return {
            ...post,
            comments: post.comments + 1,
            commentList: [...post.commentList, newComment],
          }
        }
        return post
      }),
    )

    setCommentText("")
  }

  const activePost = posts.find((post) => post.id === activePostId)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Project Feed</h1>
            <p className="text-sm text-muted-foreground">Discover what others are building</p>
          </div>

          <Card className="p-2.5 mb-4">
            <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
              <DialogTrigger asChild>
                <div className="flex gap-2.5 items-center cursor-pointer">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 px-3 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                    <p className="text-sm text-muted-foreground">Share your latest project...</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Your Name</p>
                      <p className="text-xs text-muted-foreground">@username</p>
                    </div>
                  </div>

                  <Textarea
                    placeholder="What are you working on?"
                    className="min-h-[120px] resize-none border-0 focus-visible:ring-0 text-base"
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                  />

                  {imagePreview && (
                    <div className="relative rounded-lg overflow-hidden border">
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        width={600}
                        height={400}
                        className="w-full h-auto max-h-[400px] object-cover"
                      />
                      <Button size="icon" variant="secondary" className="absolute top-2 right-2" onClick={removeImage}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-upload"
                        onChange={handleImageSelect}
                      />
                      <Label htmlFor="image-upload">
                        <Button variant="ghost" size="sm" asChild>
                          <span className="cursor-pointer">
                            <ImageIcon className="h-5 w-5 mr-2" />
                            Add Image
                          </span>
                        </Button>
                      </Label>
                    </div>
                    <Button onClick={handlePostSubmit} disabled={!postDescription.trim()}>
                      Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Card>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-4 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "border-b-2 border-primary rounded-none" : "rounded-none"}
            >
              All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilter("following")}
              className={filter === "following" ? "border-b-2 border-primary rounded-none" : "rounded-none"}
            >
              Following
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilter("trending")}
              className={filter === "trending" ? "border-b-2 border-primary rounded-none" : "rounded-none"}
            >
              Trending
            </Button>
          </div>

          <div className="space-y-0 ">
            {posts.map((post) => (
              <Card key={post.id} className="rounded-3xl space-y-4 border-x-0 border-t-0 hover:bg-muted/30 transition-colors">
                <div className="p-2.5">
                  {/* Post Header */}
                  <div className="flex gap-2 mb-2">
                    <Link href={`/portfolios/${post.author.username}`}>
                      <Avatar className="h-8 w-8 hover:opacity-80 transition-opacity cursor-pointer">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          <User className="h-3.5 w-3.5" />
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 flex-wrap">
                        <Link href={`/portfolios/${post.author.username}`}>
                          <span className="font-semibold text-sm hover:underline">{post.author.name}</span>
                        </Link>
                        <span className="text-xs text-muted-foreground">
                          @{post.author.username} · {post.timestamp}
                        </span>
                      </div>

                      {/* Post Content */}
                      <p className="text-sm text-foreground mt-1 leading-relaxed whitespace-pre-wrap">
                        {post.description}
                      </p>

                      {/* Post Image - smaller and rounded */}
                      {post.image && (
                        <div className="relative mt-2 rounded-lg overflow-hidden border">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt="Post"
                            width={500}
                            height={200}
                            className="w-full h-auto max-h-[200px] object-cover"
                          />
                        </div>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-xs text-primary hover:underline cursor-pointer">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center gap-0.5 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(post.id)}
                          className={`hover:text-red-500 hover:bg-red-500/10 h-8 ${post.isLiked ? "text-red-500" : ""}`}
                        >
                          <Heart className={`h-3.5 w-3.5 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                          <span className="text-xs">{post.likes}</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:text-blue-500 hover:bg-blue-500/10 h-8"
                          onClick={() => openCommentModal(post.id)}
                        >
                          <MessageCircle className="h-3.5 w-3.5 mr-1" />
                          <span className="text-xs">{post.comments}</span>
                        </Button>

                        <Button variant="ghost" size="sm" className="hover:text-green-500 hover:bg-green-500/10 h-8">
                          <Share2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-6 text-center pb-8">
            <Button variant="outline">Load More Posts</Button>
          </div>
        </div>
      </div>

      <Dialog open={commentModalOpen} onOpenChange={setCommentModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>

          {activePost && (
            <div className="flex-1 overflow-y-auto">
              {/* Original Post Preview */}
              <div className="pb-4 border-b mb-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activePost.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{activePost.author.name}</span>
                      <span className="text-xs text-muted-foreground">@{activePost.author.username}</span>
                    </div>
                    <p className="text-sm mt-1 text-muted-foreground line-clamp-2">{activePost.description}</p>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {activePost.commentList.length > 0 ? (
                  activePost.commentList.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">
                            @{comment.author.username} · {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Comment Input */}
          <div className="border-t pt-4 mt-4">
            <div className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleCommentSubmit()
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleCommentSubmit} disabled={!commentText.trim()} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
