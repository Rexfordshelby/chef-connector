
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ChefHat, Star } from "lucide-react";

const chefs = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Italian Cuisine",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=400",
    price: 120,
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Asian Fusion",
    rating: 4.8,
    reviews: 96,
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400",
    price: 150,
  },
  {
    id: 3,
    name: "Emma Martinez",
    specialty: "Mediterranean",
    rating: 4.7,
    reviews: 84,
    image: "https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?auto=format&fit=crop&q=80&w=400",
    price: 135,
  },
];

const Explore = () => {
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
                src={chef.image}
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
                  <span className="font-medium">{chef.rating}</span>
                  <span className="text-muted-foreground text-sm">({chef.reviews})</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChefHat className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Starting from</span>
                </div>
                <span className="font-semibold">${chef.price}/session</span>
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
