
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import MusicPage from "./pages/Music";
import Artists from "./pages/Artists";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ArtistProfile from "./pages/ArtistProfile";
import Teams from "./pages/Teams";
import TeamMemberProfile from "./pages/TeamMemberProfile";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Premium from "./pages/Premium";
import Profile from "./pages/Profile";
import CreateArtist from "./pages/CreateArtist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artist/:id" element={<ArtistProfile />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/team-member/:id" element={<TeamMemberProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route 
              path="/create-artist" 
              element={
                <ProtectedRoute>
                  <CreateArtist />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/premium" 
              element={
                <ProtectedRoute>
                  <Premium />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
