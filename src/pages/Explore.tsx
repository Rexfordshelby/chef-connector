import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Make sure this path is correct
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ChefHat, Star } from "lucide-react";

const Explore = () => {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    async function fetchChefs() {
      let { data, error } = await supabase.from("chefs").select("*");
      if (error) console.error("Error fetching chefs:", error);
      else setChefs(data);
    }

    fetchChefs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-12 text-center animate-fade-down">
        <h1 className="text-3xl font-bold mb-4">Discover Amazing Chefs</h1>
        <p className="text-muted-foreground">
          Browse through our selection of talented chefs and find the perfect match for your next culinary experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chefs.map((chef) => (
          <Card key={chef.id} className="overflow-hidden animate-fade-up hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={chef.image || "https://via.placeholder.com/400"} // Use a default image if none is provided
                alt={chef.name}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{chef.name}</h3>
                  <p className="text-muted-foreground text-sm">{chef.specialty}</p>
                </div>
                <div className="flex items-center gap-1 text-accent">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">{chef.rating || "N/A"}</span>
                  <span className="text-muted-foreground text-sm">({chef.reviews || 0})</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChefHat className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Starting from</span>
                </div>
                <span className="font-semibold">${chef.price || "N/A"}/session</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Explore;
