
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, DollarSign, Star, Users } from "lucide-react";

const BecomeChef = () => {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <h1 className="text-4xl font-bold mb-6">Share Your Culinary Passion</h1>
          <p className="text-lg text-muted-foreground">
            Join our community of professional chefs and start earning by sharing your culinary expertise with food lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 animate-fade-up">
            <DollarSign className="h-8 w-8 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Earn More</h3>
            <p className="text-muted-foreground">
              Set your own rates and earn what you deserve for your culinary expertise.
            </p>
          </Card>
          <Card className="p-6 animate-fade-up [animation-delay:200ms]">
            <Clock className="h-8 w-8 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
            <p className="text-muted-foreground">
              Choose when you work and manage your own schedule with ease.
            </p>
          </Card>
          <Card className="p-6 animate-fade-up [animation-delay:400ms]">
            <Users className="h-8 w-8 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Grow Your Network</h3>
            <p className="text-muted-foreground">
              Connect with food lovers and expand your professional network.
            </p>
          </Card>
        </div>

        <div className="max-w-md mx-auto text-center animate-fade-up">
          <Button size="lg" className="w-full">
            Start Your Chef Journey
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account? <a href="/login" className="text-accent hover:underline">Sign in</a>
          </p>
        </div>
      </section>

      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">How It Works</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4 animate-fade-up">
                <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Create Your Profile</h3>
                  <p className="text-muted-foreground">
                    Set up your professional profile showcasing your expertise, experience, and specialties.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 animate-fade-up [animation-delay:200ms]">
                <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Set Your Availability</h3>
                  <p className="text-muted-foreground">
                    Define your working hours and the areas you're willing to serve.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 animate-fade-up [animation-delay:400ms]">
                <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Start Receiving Bookings</h3>
                  <p className="text-muted-foreground">
                    Accept booking requests and start earning by sharing your culinary expertise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeChef;
