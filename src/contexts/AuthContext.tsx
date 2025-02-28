
import { createContext, useContext, useEffect, useState } from "react"
import { Session, User } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

type AppRole = 'admin' | 'user' | 'moderator';

interface AuthContextType {
  user: User | null
  session: Session | null
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  deleteAccount: () => Promise<void>
  hasRole: (role: AppRole) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error
      toast.success("Check your email to confirm your account!")
      navigate("/login")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      toast.success("Welcome back!")
      navigate("/")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success("Signed out successfully")
      navigate("/login")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const deleteAccount = async () => {
    try {
      if (!user) throw new Error("No user logged in")
      
      // Delete user data from profiles table first
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)
        
      if (profileError) throw profileError
      
      // Instead of using the admin API, we'll use the user's own session to delete their account
      const { error } = await supabase
        .rpc('delete_user')
      
      if (error) {
        // If the RPC function fails, at least sign the user out
        await supabase.auth.signOut()
        throw error
      }
      
      // Sign out after successful deletion
      await supabase.auth.signOut()
      toast.success("Your account has been deleted")
      navigate("/login")
    } catch (error: any) {
      console.error("Error deleting account:", error)
      toast.error(error.message || "Failed to delete account")
    }
  }

  const hasRole = async (role: AppRole) => {
    try {
      const { data, error } = await supabase
        .rpc('has_role', {
          requested_user_id: user?.id,
          requested_role: role
        })
      
      if (error) throw error
      return data || false
    } catch (error) {
      console.error('Error checking role:', error)
      return false
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signOut, deleteAccount, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
