import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[url('/your-background-image-url-here')] bg-cover bg-center bg-fixed">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm border-b border-border/40 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            onClick={() => navigate("/")} 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
          >
            The 411
          </h1>
          <div className="flex justify-center flex-1 gap-8">
            <Button variant="ghost" className="text-white hover:text-accent" onClick={() => navigate("/music")}>
              Music
            </Button>
            <Button variant="ghost" className="text-white hover:text-accent" onClick={() => navigate("/artists")}>
              Artists
            </Button>
            <Button variant="ghost" className="text-white hover:text-accent" onClick={() => navigate("/teams")}>
              Teams
            </Button>
            <Button variant="ghost" className="text-white hover:text-accent" onClick={() => navigate("/about")}>
              About
            </Button>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:text-accent" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="ghost" className="text-white hover:text-accent" onClick={() => navigate("/signin")}>
              Sign Up
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
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-sm text-gray-600 hover:text-gray-900">About Us</a></li>
                <li><a href="/teams" className="text-sm text-gray-600 hover:text-gray-900">Our Team</a></li>
                <li><a href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Music</h3>
              <ul className="space-y-2">
                <li><a href="/music" className="text-sm text-gray-600 hover:text-gray-900">Latest Releases</a></li>
                <li><a href="/artists" className="text-sm text-gray-600 hover:text-gray-900">Artists</a></li>
                <li><a href="/premium" className="text-sm text-gray-600 hover:text-gray-900">Premium Access</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Social</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Instagram</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} The 411. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
