"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

export function PortfolioLikeButton({ initialLikes }: { initialLikes: number }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <Button onClick={handleLike} variant={isLiked ? "default" : "outline"} size="lg" className="w-full md:w-auto">
      <Heart className={`h-5 w-5 mr-2 ${isLiked ? "fill-current" : ""}`} />
      {likeCount} Likes
    </Button>
  )
}
