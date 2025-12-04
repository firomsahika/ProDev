import { Navbar } from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const mockDesigners = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    profession: "Product Designer",
    skills: ["UI/UX", "Figma", "Product Design"],
    followers: 2453,
  },
  {
    id: "2",
    name: "Alex Rivera",
    avatar: "/placeholder.svg?height=80&width=80",
    profession: "Frontend Developer",
    skills: ["React", "TypeScript", "Next.js"],
    followers: 1892,
  },
  {
    id: "3",
    name: "Maya Patel",
    avatar: "/placeholder.svg?height=80&width=80",
    profession: "UI Designer",
    skills: ["Sketch", "Adobe XD", "Prototyping"],
    followers: 3124,
  },
  {
    id: "4",
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=80&width=80",
    profession: "Full Stack Designer",
    skills: ["Design Systems", "React", "Figma"],
    followers: 2789,
  },
  {
    id: "5",
    name: "Chris Wong",
    avatar: "/placeholder.svg?height=80&width=80",
    profession: "Motion Designer",
    skills: ["After Effects", "Lottie", "Animation"],
    followers: 1567,
  },
  {
    id: "6",
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=80&width=80",
    profession: "Brand Designer",
    skills: ["Branding", "Illustration", "Design"],
    followers: 2341,
  },
]

export default function HireDesignersPage() {
  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Hire Designers</h1>
          <p className="text-muted-foreground">Connect with talented designers and developers</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockDesigners.map((designer) => (
            <div
              key={designer.id}
              className="p-6 border border-border rounded-lg bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarImage src={designer.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{designer.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-1">{designer.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{designer.profession}</p>
                <p className="text-xs text-muted-foreground">{designer.followers} followers</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {designer.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 text-xs font-medium bg-muted rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Link href={`/profile/${designer.id}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    View Profile
                  </Button>
                </Link>
                <Button className="flex-1" size="sm">
                  Contact
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
