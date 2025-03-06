
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateArtist() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [name, setName] = useState("")
  const [genre, setGenre] = useState("")
  const [style, setStyle] = useState("")
  const [bio, setBio] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!user) {
      toast.error("You must be logged in to create an artist profile")
      navigate("/login")
      return
    }
    
    try {
      setLoading(true)
      
      // Check if user already has an artist profile
      const { data: existingArtist, error: checkError } = await supabase
        .from('artists')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()
      
      if (checkError) throw checkError
      
      if (existingArtist) {
        toast.error("You already have an artist profile")
        navigate(`/artist/${existingArtist.id}`)
        return
      }
      
      // Create new artist profile
      const { data, error } = await supabase
        .from('artists')
        .insert([
          { 
            name, 
            genre, 
            style,
            bio, 
            user_id: user.id 
          }
        ])
        .select()
      
      if (error) throw error
      
      toast.success("Artist profile created successfully!")
      navigate(`/artists`)
    } catch (error: any) {
      console.error('Error creating artist profile:', error)
      toast.error(error.message || "Failed to create artist profile")
    } finally {
      setLoading(false)
    }
  }

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
            {user ? (
              <Button variant="ghost" className="text-white hover:text-accent" onClick={() => navigate("/profile")}>
                Profile
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="text-white hover:text-accent" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="ghost" className="text-white hover:text-accent" onClick={() => navigate("/signin")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Create Artist Form */}
      <section className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75" />
            <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-8 shadow-xl border border-border/40">
              <h1 className="text-3xl font-bold mb-6">Create Artist Profile</h1>
              
              {!user ? (
                <div className="text-center py-8">
                  <p className="mb-4">You need to be logged in to create an artist profile.</p>
                  <Button onClick={() => navigate("/login")}>Log In</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Artist Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your stage name or band name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                      id="genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      placeholder="e.g. Rock, Hip-Hop, Electronic, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="style">Style</Label>
                    <Input
                      id="style"
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      placeholder="e.g. Alternative, Trap, House, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself as an artist..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      rows={4}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Artist Profile'}
                  </Button>
                </form>
              )}
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
