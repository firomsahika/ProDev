"use client"

import { Navbar } from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Search } from "lucide-react"
import { useState } from "react"

const mockConversations = [
  {
    id: "1",
    name: "Alex Rivera",
    avatar: "/diverse-designer-avatars.png",
    lastMessage: "Thanks for the feedback!",
    timestamp: "2h ago",
    unread: true,
  },
  {
    id: "2",
    name: "Maya Patel",
    avatar: "/creative-professional.png",
    lastMessage: "I'd love to collaborate",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: "3",
    name: "Jordan Lee",
    avatar: "/developer-avatar.png",
    lastMessage: "Great design work!",
    timestamp: "2d ago",
    unread: false,
  },
  {
    id: "4",
    name: "Sarah Chen",
    avatar: "/ux-designer-workflow.png",
    lastMessage: "Can we discuss the project?",
    timestamp: "3d ago",
    unread: false,
  },
]

const mockMessages = [
  {
    id: "1",
    sender: "Alex Rivera",
    content: "Hi! I really loved your recent design work.",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    content: "Thank you so much! I appreciate that.",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: "3",
    sender: "Alex Rivera",
    content: "Would you be interested in collaborating on a project?",
    timestamp: "10:35 AM",
    isOwn: false,
  },
  {
    id: "4",
    sender: "You",
    content: "I'd love to hear more about it.",
    timestamp: "10:37 AM",
    isOwn: true,
  },
  {
    id: "5",
    sender: "Alex Rivera",
    content: "Thanks for the feedback!",
    timestamp: "2:15 PM",
    isOwn: false,
  },
]

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState("1")
  const [message, setMessage] = useState("")

  const selectedConversation = mockConversations.find((c) => c.id === selectedChat)

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Messages</h1>

        <div className="grid md:grid-cols-[340px_1fr] gap-4 border border-border rounded-lg overflow-hidden bg-card h-full">
          {/* Sidebar - existing code */}
          <div className="border-r border-border overflow-y-auto bg-background">
            <div className="p-4 border-b border-border bg-card sticky top-0 z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9" />
              </div>
            </div>

            <div className="divide-y divide-border">
              {mockConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors text-left ${
                    selectedChat === conversation.id ? "bg-muted" : ""
                  }`}
                >
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm truncate">{conversation.name}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{conversation.timestamp}</span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        conversation.unread ? "font-medium text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col h-full bg-background">
            {/* Header - fixed at top */}
            <div className="p-4 border-b border-border flex items-center gap-3 bg-card flex-shrink-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation?.avatar || "/placeholder.svg"} />
                <AvatarFallback>{selectedConversation?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">{selectedConversation?.name}</h3>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {mockMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                  <div className="flex flex-col max-w-[75%] md:max-w-[70%]">
                    <div
                      className={`rounded-2xl px-4 py-2.5 ${
                        msg.isOwn
                          ? "bg-slate-900 text-white rounded-br-sm"
                          : "bg-slate-100 text-slate-900 rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                    <span
                      className={`text-xs mt-1 px-1 ${msg.isOwn ? "text-right" : "text-left"} text-muted-foreground`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-card flex-shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (message.trim()) {
                    setMessage("")
                  }
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
