
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Index() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[url('/your-background-image-url-here')] bg-cover bg-center bg-fixed">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm border-b border-border/40 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            The 411
          </h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/music")}>
              Music
            </Button>
            <Button variant="ghost" onClick={() => navigate("/artists")}>
              Artists
            </Button>
            <Button variant="ghost" onClick={() => navigate("/teams")}>
              Teams
            </Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>
              About
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center pt-20">
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Where Music Meets{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Experience the future of music with our innovative record label. 
              Join us in shaping the next generation of sound.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => navigate("/music")}>
                Explore Music
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/artists")}>
                Meet Our Artists
              </Button>
            </div>
          </div>

          {/* Glass Card */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75" />
            <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-8 shadow-xl border border-border/40">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Latest Release</h3>
                <p className="text-muted-foreground">
                  Check out our newest tracks and upcoming releases from our talented artists.
                </p>
                <Button className="w-full" variant="secondary" onClick={() => navigate("/music")}>
                  Listen Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
