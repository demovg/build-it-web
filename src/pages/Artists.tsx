import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Artists() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary bg-[url('your-background-image-url-here')] bg-cover bg-center bg-fixed">
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

      {/* Artists Content */}
      <section className="container mx-auto px-4 pt-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Our Artists</h1>
            <p className="text-muted-foreground">
              Meet the talented individuals behind the music.
            </p>
          </div>

          {/* Artist Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Artist Card */}
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-6 space-y-4 border border-border/40">
                <div className="w-24 h-24 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Artist Name</h3>
                  <p className="text-sm text-muted-foreground">Genre • Style</p>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate("/artist/1")}
                >
                  View Profile
                </Button>
              </div>
            </div>

            {/* Second Artist */}
            <div className="group relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-6 space-y-4 border border-border/40">
                <div className="w-24 h-24 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Artist Name</h3>
                  <p className="text-sm text-muted-foreground">Genre • Style</p>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => navigate("/artist/2")}
                >
                  View Profile
                </Button>
              </div>
            </div>
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
