
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"

interface Artist {
  id: string
  name: string
  genre: string | null
  style: string | null
  bio: string | null
  avatar_url: string | null
  user_id: string | null
}

export default function ArtistProfile() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchArtist(id)
    }
  }, [id])

  async function fetchArtist(artistId: string) {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', artistId)
        .single()

      if (error) throw error
      setArtist(data)
    } catch (error) {
      console.error('Error fetching artist:', error)
      toast.error('Failed to load artist profile')
    } finally {
      setLoading(false)
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (!event.target.files || event.target.files.length === 0 || !artist) {
        return
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${artist.id}.${fileExt}`

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
        .eq('id', artist.id)

      if (updateError) throw updateError

      // Update local state
      setArtist({
        ...artist,
        avatar_url: publicUrl
      })

      toast.success('Profile picture updated!')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Error uploading image')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Artist Not Found</h2>
          <Button onClick={() => navigate('/artists')}>Back to Artists</Button>
        </div>
      </div>
    )
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

      {/* Profile Content */}
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
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={artist.avatar_url || ""} alt={artist.name} />
                    <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user?.id === artist.user_id && (
                    <label className="absolute bottom-0 right-0 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <div className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90">
                        📷
                      </div>
                    </label>
                  )}
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold">{artist.name}</h1>
                  <p className="text-lg text-muted-foreground">{artist.genre} • {artist.style}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Biography</h2>
            <p className="text-muted-foreground">
              {artist.bio || "No biography provided yet."}
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
