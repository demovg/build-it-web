
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"

export default function ArtistProfile() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm border-b border-border/40 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            onClick={() => navigate("/")} 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
          >
            The 411
          </h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/music")}>
              Music
            </Button>
            <Button variant="ghost" onClick={() => navigate("/artists")}>
              Artists
            </Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>
              About
            </Button>
          </div>
        </div>
      </nav>

      {/* Artist Profile Content */}
      <section className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/artists")}
            className="mb-4"
          >
            ← Back to Artists
          </Button>

          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75" />
            <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-8 border border-border/40">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-6xl">👤</span>
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold">Artist Name {id}</h1>
                  <p className="text-lg text-muted-foreground">Genre • Style</p>
                  <div className="flex gap-4">
                    <Button className="bg-accent hover:bg-accent/90">
                      Follow
                    </Button>
                    <Button variant="outline">
                      Share Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Biography</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Latest Releases */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Latest Releases</h2>
            <div className="grid gap-4">
              <div className="p-4 rounded-lg bg-background/80 backdrop-blur-xl border border-border/40">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-md flex items-center justify-center">
                    <span className="text-xl">🎵</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Track Name</h3>
                    <p className="text-sm text-muted-foreground">3:45 • Released Jan 2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Play
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
