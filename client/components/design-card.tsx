import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle } from "lucide-react"

interface DesignCardProps {
  id: string
  image: string
  title: string
  designer: {
    name: string
    avatar: string
  }
  likes: number
  comments: number
}

export function DesignCard({ id, image, title, designer, likes, comments }: DesignCardProps) {
  return (
    <Link href={`/design/${id}`} className="group">
      <div className="space-y-2">
        <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-muted border border-border">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Avatar className="h-5 w-5 flex-shrink-0">
              <AvatarImage src={designer.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">{designer.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium truncate">{designer.name}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
            <div className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{comments}</span>
            </div>
          </div>
        </div>

        <h3 className="text-xs font-medium line-clamp-2 leading-relaxed">{title}</h3>
      </div>
    </Link>
  )
}
