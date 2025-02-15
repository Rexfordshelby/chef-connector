
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  ChefHat, 
  LayoutDashboard, 
  Calendar, 
  UserCircle, 
  BarChart, 
  BookOpen,
  MessageSquare,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChefLayoutProps {
  children: React.ReactNode;
}

export function ChefLayout({ children }: ChefLayoutProps) {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || profile?.role !== "chef") {
      navigate("/login");
    }
  }, [user, profile, navigate]);

  const navigation = [
    {
      name: "Dashboard",
      href: "/chef/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Bookings",
      href: "/chef/bookings",
      icon: Calendar,
    },
    {
      name: "Profile",
      href: "/chef/profile",
      icon: UserCircle,
    },
    {
      name: "Analytics",
      href: "/chef/analytics",
      icon: BarChart,
    },
    {
      name: "Menu",
      href: "/chef/menu",
      icon: BookOpen,
    },
    {
      name: "Reviews",
      href: "/chef/reviews",
      icon: Star,
    },
  ];

  const isActive = (path: string) => window.location.pathname === path;

  if (!user || profile?.role !== "chef") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg pt-16">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center p-4 border-b">
            <ChefHat className="h-8 w-8 text-accent" />
            <span className="ml-2 text-lg font-semibold">Chef Portal</span>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  isActive(item.href) && "bg-accent/10 text-accent"
                )}
                onClick={() => navigate(item.href)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64 w-full">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
