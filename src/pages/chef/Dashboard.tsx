
import { useEffect, useState } from "react";
import { ChefLayout } from "@/components/layouts/ChefLayout";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, DollarSign, Users, Star } from "lucide-react";

const ChefDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalEarnings: 0,
    totalClients: 0,
    averageRating: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      // Fetch total bookings and earnings
      const { data: bookings } = await supabase
        .from("bookings")
        .select("total_amount, client_id")
        .eq("chef_id", user.id);

      // Fetch average rating
      const { data: reviews } = await supabase
        .from("reviews")
        .select("rating")
        .eq("chef_id", user.id);

      if (bookings) {
        // Calculate stats
        const totalBookings = bookings.length;
        const totalEarnings = bookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0);
        // Get unique client count by filtering out duplicates and null values
        const uniqueClients = new Set(bookings.filter(b => b.client_id).map(b => b.client_id)).size;

        const averageRating = reviews?.length 
          ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length 
          : 0;

        setStats({
          totalBookings,
          totalEarnings,
          totalClients: uniqueClients,
          averageRating,
        });
      }
    };

    fetchStats();
  }, [user]);

  return (
    <ChefLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-muted-foreground mt-2">
            Here's an overview of your business performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Calendar className="h-10 w-10 text-accent p-2 bg-accent/10 rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <DollarSign className="h-10 w-10 text-accent p-2 bg-accent/10 rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <h3 className="text-2xl font-bold">
                  ${stats.totalEarnings.toFixed(2)}
                </h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Users className="h-10 w-10 text-accent p-2 bg-accent/10 rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Total Clients</p>
                <h3 className="text-2xl font-bold">{stats.totalClients}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Star className="h-10 w-10 text-accent p-2 bg-accent/10 rounded-full" />
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <h3 className="text-2xl font-bold">
                  {stats.averageRating.toFixed(1)}
                </h3>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ChefLayout>
  );
};

export default ChefDashboard;
