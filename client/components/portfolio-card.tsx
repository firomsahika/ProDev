import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Eye, TrendingUp, Trophy } from "lucide-react"
import profilePic from "../public/generic-company-logo.png"

interface PortfolioCardProps {
  id: string
  username: string
  name: string
  college: string
  coverImage: string
  avatar: string
  skills: string[]
  likes: number
  views: number
  rank?: number
  rankChange?: number
  isAvailable?: boolean
}

export function PortfolioCard({
  id,
  username,
  name,
  college,
  coverImage,
  avatar,
  skills,
  likes,
  views,
  rank,
  rankChange,
  isAvailable,
}: PortfolioCardProps) {
  const getRankBadge = () => {
    if (!rank || rank > 3) return null
    const colors = {
      1: "bg-yellow-500 text-white",
      2: "bg-slate-400 text-white",
      3: "bg-amber-600 text-white",
    }
    return (
      <div
        className={`absolute top-2 left-2 ${colors[rank as 1 | 2 | 3]} rounded-full px-2 py-0.5 flex items-center gap-1 font-bold text-xs z-10`}
      >
        <Trophy className="h-3 w-3" />#{rank}
      </div>
    )
  }

  return (
    <Link href={`/portfolios/${username}`}>
      <Card className="group overflow-hidden hover:shadow-md transition-all duration-300 border border-border">
        <div className="relative aspect-[3/2] overflow-hidden bg-muted " >
          {getRankBadge()}
          <Image
            src={coverImage || "/placeholder.svg"}
            alt={`${name}'s portfolio`}
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300 width-20 height-20"
          />
        </div>

        <div className="p-3 flex flex-col gap-y-3">
          <div className="flex items-start gap-5 mb-2 ">
            <Image
              src={profilePic}
              alt={name}
              width={32}
              height={32}
              className="rounded-full object-cover border border-border w-8 h-8"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground truncate">{name}</h3>
              <p className="text-xs text-muted-foreground truncate">{college}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs px-1.5 py-0">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                +{skills.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Heart className="h-3.5 w-3.5" />
                <span className="font-medium text-foreground">{likes}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                <span>{views}</span>
              </div>
            </div>

            {rank && rank <= 50 && (
              <div className="flex items-center gap-1 text-xs font-medium">
                <span className="text-muted-foreground">#{rank}</span>
                {rankChange && (
                  <span className={rankChange > 0 ? "text-green-600" : "text-red-600"}>
                    <TrendingUp className={`h-3 w-3 inline ${rankChange < 0 ? "rotate-180" : ""}`} />
                    {Math.abs(rankChange)}
                  </span>
                )}
              </div>
            )}
          </div>

          {isAvailable && (
            <Badge className="mt-2 bg-green-600 hover:bg-green-700 text-white text-xs w-full justify-center py-0.5">
              Available for Hire
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  )
}
