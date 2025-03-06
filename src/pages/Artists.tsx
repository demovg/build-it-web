
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"

interface Artist {
  id: string
  name: string
  genre: string | null
  style: string | null
  avatar_url: string | null
  user_id: string | null
}

export default function Artists() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [artists, setArtists] = useState<Artist[]>([])
  const [userHasArtistProfile, setUserHasArtistProfile] = useState(false)

  useEffect(() => {
    fetchArtists()
    if (user) {
      checkUserArtistProfile()
    }
  }, [user])

  async function fetchArtists() {
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('*')

      if (error) throw error
      if (data) setArtists(data)
    } catch (error) {
      console.error('Error fetching artists:', error)
      toast.error('Failed to load artists')
    }
  }

  async function checkUserArtistProfile() {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('artists')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()
      
      if (error) throw error
      setUserHasArtistProfile(!!data)
    } catch (error) {
      console.error('Error checking artist profile:', error)
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>, artistId: string) {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${artistId}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('artists')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('artists')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('artists')
        .update({ avatar_url: publicUrl })
        .eq('id', artistId)

      if (updateError) throw updateError

      toast.success('Profile picture updated!')
      fetchArtists() // Refresh the list
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Error uploading image')
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

      {/* Artists Content */}
      <section className="container mx-auto px-4 pt-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Our Artists</h1>
              <p className="text-muted-foreground">
                Meet the talented individuals behind the music.
              </p>
            </div>
            {user && !userHasArtistProfile && (
              <Button 
                onClick={() => navigate("/create-artist")} 
                className="bg-accent hover:bg-accent/90"
              >
                Create Artist Profile
              </Button>
            )}
          </div>

          {/* Artist Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <div key={artist.id} className="group relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-6 space-y-4 border border-border/40">
                  <div className="relative">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={artist.avatar_url || ""} alt={artist.name} />
                      <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {user?.id === artist.user_id && (
                      <label className="absolute bottom-0 right-0 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, artist.id)}
                        />
                        <div className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90">
                          📷
                        </div>
                      </label>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {artist.genre} • {artist.style}
                    </p>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => navigate(`/artist/${artist.id}`)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
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
