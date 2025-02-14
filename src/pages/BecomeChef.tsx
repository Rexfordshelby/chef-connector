
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, DollarSign, Star, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const BecomeChef = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    experience: "",
    specialties: "",
    certifications: "",
    languages: "",
    serviceAreas: "",
  });

  useEffect(() => {
    // If user is already a chef, redirect to dashboard
    if (profile?.role === "chef") {
      navigate("/dashboard");
    }
  }, [profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to continue");
      return;
    }

    try {
      setLoading(true);

      // Update profile with chef status and role
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          chef_registration_status: "approved",
          role: "chef"
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Create chef profile
      const { error: chefProfileError } = await supabase
        .from("chef_profiles")
        .insert({
          id: user.id,
          professional_experience: formData.experience,
          specialties: formData.specialties.split(",").map(s => s.trim()),
          certifications: formData.certifications,
          languages: formData.languages.split(",").map(l => l.trim()),
          service_areas: formData.serviceAreas.split(",").map(a => a.trim()),
          profile_completed: true, // Set to true since we're auto-approving
        });

      if (chefProfileError) throw chefProfileError;

      toast.success("Welcome aboard! Your chef profile has been created.");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (!user) {
      return (
        <div className="max-w-md mx-auto text-center animate-fade-up">
          <Button size="lg" className="w-full" onClick={() => navigate("/signup")}>
            Sign Up to Start Your Chef Journey
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 text-accent"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          </p>
        </div>
      );
    }

    if (profile?.chef_registration_status === "pending") {
      return (
        <Card className="max-w-md mx-auto p-6 text-center">
          <h3 className="text-xl font-semibold mb-4">Application In Review</h3>
          <p className="text-muted-foreground">
            Your chef application is currently being reviewed. We'll notify you once
            it's approved.
          </p>
        </Card>
      );
    }

    return (
      <Card className="max-w-2xl mx-auto p-6">
        <h3 className="text-xl font-semibold mb-6">Chef Application Form</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="experience">Professional Experience</Label>
            <Textarea
              id="experience"
              placeholder="Tell us about your culinary experience..."
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialties">Specialties</Label>
            <Input
              id="specialties"
              placeholder="Italian, French, Pastry (comma-separated)"
              value={formData.specialties}
              onChange={(e) =>
                setFormData({ ...formData, specialties: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications">Certifications</Label>
            <Input
              id="certifications"
              placeholder="List your culinary certifications"
              value={formData.certifications}
              onChange={(e) =>
                setFormData({ ...formData, certifications: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="languages">Languages Spoken</Label>
            <Input
              id="languages"
              placeholder="English, Spanish (comma-separated)"
              value={formData.languages}
              onChange={(e) =>
                setFormData({ ...formData, languages: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceAreas">Service Areas</Label>
            <Input
              id="serviceAreas"
              placeholder="Manhattan, Brooklyn (comma-separated)"
              value={formData.serviceAreas}
              onChange={(e) =>
                setFormData({ ...formData, serviceAreas: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting Application..." : "Submit Application"}
          </Button>
        </form>
      </Card>
    );
  };

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up">
          <h1 className="text-4xl font-bold mb-6">Share Your Culinary Passion</h1>
          <p className="text-lg text-muted-foreground">
            Join our community of professional chefs and start earning by sharing
            your culinary expertise with food lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 animate-fade-up">
            <DollarSign className="h-8 w-8 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Earn More</h3>
            <p className="text-muted-foreground">
              Set your own rates and earn what you deserve for your culinary
              expertise.
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

        {renderContent()}

        <section className="mt-20 bg-secondary/50 py-20 -mx-4 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">
              How It Works
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4 animate-fade-up">
                <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Submit Your Application</h3>
                  <p className="text-muted-foreground">
                    Fill out our comprehensive application form showcasing your
                    expertise and experience.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 animate-fade-up [animation-delay:200ms]">
                <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Complete Your Profile</h3>
                  <p className="text-muted-foreground">
                    Once approved, set up your professional profile with your
                    specialties and availability.
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
                    Accept booking requests and begin your journey as a professional
                    chef on our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default BecomeChef;
