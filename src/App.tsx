
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNav } from "./components/MainNav";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import BecomeChef from "./pages/BecomeChef";
import NotFound from "./pages/NotFound";
import ChefDashboard from "./pages/chef/Dashboard";
import ChefBookings from "./pages/chef/Bookings";
import ChefProfile from "./pages/chef/Profile";
import ChefAnalytics from "./pages/chef/Analytics";
import ChefMenu from "./pages/chef/Menu";
import ChefReviews from "./pages/chef/Reviews";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <MainNav />
          <main className="pt-16 min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/become-chef" element={<BecomeChef />} />
              <Route path="/chef">
                <Route path="dashboard" element={<ChefDashboard />} />
                <Route path="bookings" element={<ChefBookings />} />
                <Route path="profile" element={<ChefProfile />} />
                <Route path="analytics" element={<ChefAnalytics />} />
                <Route path="menu" element={<ChefMenu />} />
                <Route path="reviews" element={<ChefReviews />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
