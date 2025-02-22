
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function About() {
  const navigate = useNavigate()

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

      {/* About Content */}
      <section className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">About The 411</h1>
            <p className="text-lg text-muted-foreground">
              We're more than just a record label - we're a community of artists and music lovers 
              dedicated to pushing the boundaries of sound.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75" />
            <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-8 border border-border/40">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To discover and nurture talented artists, providing them with the platform and resources 
                they need to create exceptional music that moves and inspires people around the world.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions or want to work with us? We'd love to hear from you.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
