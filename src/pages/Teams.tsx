
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { useAuth } from "@/contexts/AuthContext"

interface TeamMember {
  id: string
  name: string
  role: string
  bio: string | null
  avatar_url: string | null
  user_id: string | null
}

export default function Teams() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  async function fetchTeamMembers() {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')

      if (error) throw error
      if (data) setTeamMembers(data)
    } catch (error) {
      console.error('Error fetching team members:', error)
      toast.error('Failed to load team members')
    }
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>, memberId: string) {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${memberId}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('team-members')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('team-members')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('team_members')
        .update({ avatar_url: publicUrl })
        .eq('id', memberId)

      if (updateError) throw updateError

      toast.success('Profile picture updated!')
      fetchTeamMembers() // Refresh the list
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Error uploading image')
    }
  }

  const groupedMembers: { [key: string]: TeamMember[] } = teamMembers.reduce((acc, member) => {
    const role = member.role || 'Other'
    if (!acc[role]) {
      acc[role] = []
    }
    acc[role].push(member)
    return acc
  }, {} as { [key: string]: TeamMember[] })

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

      {/* Teams Content */}
      <section className="container mx-auto px-4 pt-24">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Our Team</h1>
            <p className="text-muted-foreground">
              Meet the talented individuals who make it all happen behind the scenes.
            </p>
          </div>

          {/* Team Categories */}
          <div className="grid gap-8">
            {Object.entries(groupedMembers).map(([role, members]) => (
              <div key={role} className="space-y-6">
                <h2 className="text-2xl font-semibold">{role}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member) => (
                    <div key={member.id} 
                      className="group relative cursor-pointer" 
                      onClick={() => navigate(`/team-member/${member.id}`)}
                    >
                      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                      <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-6 space-y-4 border border-border/40">
                        <div className="relative">
                          <Avatar className="w-24 h-24 mx-auto">
                            <AvatarImage src={member.avatar_url || ""} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {user?.id === member.user_id && (
                            <label 
                              className="absolute bottom-0 right-0 cursor-pointer"
                              onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking upload
                            >
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, member.id)}
                              />
                              <div className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90">
                                📷
                              </div>
                            </label>
                          )}
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
