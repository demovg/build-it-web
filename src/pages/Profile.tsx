
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface ProfileFormData {
  full_name: string
  username: string
  website: string
  bio: string
  avatar_url: string
  location: string
}

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: "",
    username: "",
    website: "",
    bio: "",
    avatar_url: "",
    location: "",
  })

  useEffect(() => {
    getProfile()
  }, [user])

  async function getProfile() {
    try {
      if (!user) throw new Error("No user")

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (error) throw error
      if (data) setFormData(data)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error("No user")

      const { error } = await supabase
        .from("profiles")
        .update(formData)
        .eq("id", user.id)

      if (error) throw error
      toast.success("Profile updated successfully!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setLoading(true)
      if (!user || !event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.")
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${user.id}/${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      setFormData({ ...formData, avatar_url: publicUrl })
      toast.success("Avatar updated!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full backdrop-blur-sm border-b border-border/40 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 
            onClick={() => navigate("/")} 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
          >
            The 411
          </h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              {formData.avatar_url && (
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src={formData.avatar_url}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                type="text"
                value={formData.full_name || ""}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={formData.username || ""}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website || ""}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio || ""}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={loading}
              />
            </div>

            <Button 
              onClick={updateProfile} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
