
import { Button } from "@/components/ui/button";
import { ChefHat, Search, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Connect with Amazing Chefs Near You
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Experience restaurant-quality meals in your home. Book talented chefs or share your culinary skills with others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-5 w-5" />
                Find a Chef
              </Button>
            </Link>
            <Link to="/become-chef">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <ChefHat className="mr-2 h-5 w-5" />
                Become a Chef
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <ChefHat className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Chefs</h3>
              <p className="text-muted-foreground">
                Connect with verified, professional chefs in your area for an exceptional dining experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up [animation-delay:200ms]">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">
                Every chef is vetted and rated by our community to ensure the highest quality service.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up [animation-delay:400ms]">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growing Community</h3>
              <p className="text-muted-foreground">
                Join thousands of food lovers and talented chefs sharing their passion for great food.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
