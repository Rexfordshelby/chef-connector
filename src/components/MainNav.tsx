
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ChefHat, LogIn, LogOut, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function MainNav() {
  const { user, profile, signOut } = useAuth();

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md fixed w-full z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat className="h-6 w-6 text-accent" />
          <span className="font-semibold text-lg">Delizofare</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </Link>
          {/* Only show Become a Chef link if user is logged in and is not already a chef */}
          {user && profile?.role !== 'chef' && (
            <Link to="/become-chef" className="text-muted-foreground hover:text-foreground transition-colors">
              Become a Chef
            </Link>
          )}
          {user ? (
            <>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => signOut()}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
