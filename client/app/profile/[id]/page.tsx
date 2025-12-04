import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DesignCard } from "@/components/design-card"
import { MapPin, LinkIcon, Users } from "lucide-react"

const mockProfiles: Record<string, any> = {
  "1": {
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=120&width=120",
    profession: "Product Designer & UI/UX Specialist",
    bio: "Creating delightful digital experiences with a focus on user-centered design. Passionate about accessibility and inclusive design practices.",
    location: "San Francisco, CA",
    website: "sarahchen.design",
    followers: 2453,
    following: 342,
  },
  "2": {
    name: "Alex Rivera",
    avatar: "/placeholder.svg?height=120&width=120",
    profession: "Frontend Developer & Designer",
    bio: "Full-stack developer with a passion for creating beautiful, performant web applications. React and TypeScript enthusiast.",
    location: "New York, NY",
    website: "alexrivera.dev",
    followers: 1892,
    following: 287,
  },
  "3": {
    name: "Maya Patel",
    avatar: "/placeholder.svg?height=120&width=120",
    profession: "UI Designer & Brand Specialist",
    bio: "Specialized in creating cohesive brand identities and intuitive user interfaces. Love working on design systems and component libraries.",
    location: "London, UK",
    website: "mayapatel.co",
    followers: 3124,
    following: 412,
  },
  "4": {
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=120&width=120",
    profession: "Full Stack Designer",
    bio: "Bridging the gap between design and development. Building design systems and scalable React applications.",
    location: "Toronto, Canada",
    website: "jordanlee.com",
    followers: 2789,
    following: 356,
  },
  "5": {
    name: "Chris Wong",
    avatar: "/placeholder.svg?height=120&width=120",
    profession: "Motion Designer & Animator",
    bio: "Bringing designs to life through motion and animation. Expert in After Effects, Lottie, and interactive animations.",
    location: "Los Angeles, CA",
    website: "chriswong.studio",
    followers: 1567,
    following: 234,
  },
  "6": {
    name: "Emma Davis",
    avatar: "/placeholder.svg?height=120&width=120",
    profession: "Brand Designer & Illustrator",
    bio: "Creating memorable brand identities and custom illustrations. Passionate about storytelling through visual design.",
    location: "Portland, OR",
    website: "emmadavis.art",
    followers: 2341,
    following: 298,
  },
}

const mockDesigns: Record<string, any[]> = {
  "1": [
    {
      id: "1",
      image: "/modern-app-design.png",
      title: "Mobile Banking App Redesign",
      designer: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 245,
      comments: 18,
    },
    {
      id: "2",
      image: "/general-dashboard-interface.png",
      title: "Analytics Dashboard UI",
      designer: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 189,
      comments: 12,
    },
  ],
  "2": [
    {
      id: "3",
      image: "/ecommerce-website-homepage.png",
      title: "E-commerce Platform",
      designer: {
        name: "Alex Rivera",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 312,
      comments: 24,
    },
  ],
  "3": [
    {
      id: "4",
      image: "/food-delivery-app-screen.png",
      title: "Food Delivery App UI",
      designer: {
        name: "Maya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 428,
      comments: 31,
    },
  ],
  "4": [
    {
      id: "5",
      image: "/fitness-app-ui.png",
      title: "Fitness Tracker App",
      designer: {
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 356,
      comments: 19,
    },
  ],
  "5": [
    {
      id: "6",
      image: "/modern-app-design.png",
      title: "Animated Logo Concepts",
      designer: {
        name: "Chris Wong",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 267,
      comments: 15,
    },
  ],
  "6": [
    {
      id: "7",
      image: "/general-dashboard-interface.png",
      title: "Brand Identity Design",
      designer: {
        name: "Emma Davis",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 389,
      comments: 22,
    },
  ],
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const profile = mockProfiles[params.id] || mockProfiles["1"]
  const designs = mockDesigns[params.id] || []

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
                    <p className="text-muted-foreground">{profile.profession}</p>
                  </div>
                  <Button>Follow</Button>
                </div>

                <p className="text-sm mb-4 leading-relaxed">{profile.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" />
                    <a href="#" className="hover:text-foreground transition-colors">
                      {profile.website}
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 mt-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">
                      <span className="font-semibold">{profile.followers}</span> followers
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">
                      <span className="font-semibold">{profile.following}</span> following
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-6">Portfolio</h2>
            {designs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map((design) => (
                  <DesignCard key={design.id} {...design} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-12">No designs yet</p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
