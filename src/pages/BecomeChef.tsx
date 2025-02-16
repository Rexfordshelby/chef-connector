import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, DollarSign, Users } from "lucide-react";
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
    if (profile?.role === "chef") {
      navigate("/dashboard");
    }
  }, [profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to continue.");
      return;
    }

    try {
      setLoading(true);

      // Trim input data to remove extra spaces
      const cleanedFormData = {
        experience: formData.experience.trim(),
        specialties: formData.specialties.split(",").map((s) => s.trim()),
        certifications: formData.certifications.trim(),
        languages: formData.languages.split(",").map((l) => l.trim()),
        serviceAreas: formData.serviceAreas.split(",").map((a) => a.trim()),
      };

      // Check if the user already has a chef profile
      const { data: existingChef, error: checkError } = await supabase
        .from("chef_profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (checkError && checkError.code !== "PGRST116") throw checkError;

      if (existingChef) {
        toast.error("You are already a registered chef.");
        navigate("/dashboard");
        return;
      }

      // Update user role in profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ chef_registration_status: "approved", role: "chef" })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Create chef profile
      const { error: chefProfileError } = await supabase
        .from("chef_profiles")
        .insert({
          id: user.id,
          professional_experience: cleanedFormData.experience,
          specialties: cleanedFormData.specialties,
          certifications: cleanedFormData.certifications,
          languages: cleanedFormData.languages,
          service_areas: cleanedFormData.serviceAreas,
          profile_completed: true,
        });

      if (chefProfileError) throw chefProfileError;

      toast.success("Your chef profile has been created!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Become a Chef</h1>
          <p className="text-lg text-muted-foreground">
            Join our community of professional chefs and share your culinary expertise.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-6">
          <h3 className="text-xl font-semibold mb-6">Chef Application Form</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="experience">Professional Experience</Label>
              <Textarea
                id="experience"
                placeholder="Tell us about your culinary experience..."
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Input
                id="certifications"
                placeholder="List your culinary certifications"
                value={formData.certifications}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages">Languages Spoken</Label>
              <Input
                id="languages"
                placeholder="English, Spanish (comma-separated)"
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceAreas">Service Areas</Label>
              <Input
                id="serviceAreas"
                placeholder="Manhattan, Brooklyn (comma-separated)"
                value={formData.serviceAreas}
                onChange={(e) => setFormData({ ...formData, serviceAreas: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Card>
      </section>
    </div>
  );
};

export default BecomeChef;
