
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ChefHat, LogIn, UserPlus } from "lucide-react";

export function MainNav() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-md fixed w-full z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat className="h-6 w-6 text-accent" />
          <span className="font-semibold text-lg">ChefConnect</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </Link>
          <Link to="/become-chef" className="text-muted-foreground hover:text-foreground transition-colors">
            Become a Chef
          </Link>
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
        </div>
      </div>
    </nav>
  );
}
