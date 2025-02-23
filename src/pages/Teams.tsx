
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Teams() {
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
            {/* Management Team */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Management</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-6 space-y-4 border border-border/40">
                    <div className="w-24 h-24 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Production Team */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Production</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-6 space-y-4 border border-border/40">
                    <div className="w-24 h-24 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">Jane Smith</h3>
                      <p className="text-sm text-muted-foreground">Executive Producer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Team */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Design</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent to-primary blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-background/80 backdrop-blur-xl rounded-lg p-6 space-y-4 border border-border/40">
                    <div className="w-24 h-24 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">Mike Johnson</h3>
                      <p className="text-sm text-muted-foreground">Lead Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
