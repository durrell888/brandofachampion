import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Loader2, Crown, Star } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

interface ParentRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  parentName: z.string().trim().min(1, "Parent name is required").max(100),
  parentEmail: z.string().trim().email("Invalid email address").max(255),
  parentPhone: z.string().trim().min(10, "Valid phone number required").max(20),
  athleteName: z.string().trim().min(1, "Athlete name is required").max(100),
  athleteAge: z.string().min(1, "Athlete age is required"),
  sport: z.string().min(1, "Sport is required"),
  school: z.string().trim().min(1, "School name is required").max(200),
  goals: z.string().trim().max(1000).optional(),
});

const SPORTS = [
  "Football",
  "Basketball",
  "Baseball",
  "Soccer",
  "Track & Field",
  "Swimming",
  "Tennis",
  "Golf",
  "Volleyball",
  "Wrestling",
  "Softball",
  "Other",
];

const AGE_RANGES = [
  "Under 13",
  "13-14",
  "15-16",
  "17-18",
  "18+",
];

type TierType = "basic" | "pro";

const TIERS = {
  basic: {
    name: "Basic",
    price: 4.99,
    priceId: "price_1SaXIxJCEhoZof7cVAHwQfwm",
    icon: Star,
    features: [
      "Athlete profile with Hudl film & personal achievements",
      "Mentorship from professional trainers",
      "Access to current & former professional players",
      "Elite athletes network access",
    ],
  },
  pro: {
    name: "Pro",
    price: 14.99,
    priceId: "price_1ScNJmJCEhoZof7cWvOCcXtE",
    icon: Crown,
    features: [
      "Everything in Basic, plus:",
      "Former NFL player grade on your play",
      "Personal analysis of your athlete",
      "NIL Advisor access",
      "Exclusive community message board",
      "Ask questions to Brand of Champion support team",
    ],
  },
};

export const ParentRegistrationModal = ({ open, onOpenChange }: ParentRegistrationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<TierType>("basic");
  const [formData, setFormData] = useState({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    athleteName: "",
    athleteAge: "",
    sport: "",
    school: "",
    goals: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async () => {
    setErrors({});
    
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("create-registration", {
        body: {
          parentName: formData.parentName,
          parentEmail: formData.parentEmail,
          athleteName: formData.athleteName,
          athleteAge: formData.athleteAge,
          sport: formData.sport,
          school: formData.school,
          tier: selectedTier,
        },
      });

      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, "_blank");
        toast.success("Redirecting to checkout...");
        onOpenChange(false);
        setFormData({
          parentName: "",
          parentEmail: "",
          parentPhone: "",
          athleteName: "",
          athleteAge: "",
          sport: "",
          school: "",
          goals: "",
        });
        setSelectedTier("basic");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to process registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentTier = TIERS[selectedTier];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            Register Your Athlete
          </DialogTitle>
          <DialogDescription>
            Join the Brand of a Champion program. Choose your plan and fill out the form below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Tier Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Choose Your Plan
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {(Object.entries(TIERS) as [TierType, typeof TIERS.basic][]).map(([key, tier]) => {
                const Icon = tier.icon;
                const isSelected = selectedTier === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTier(key)}
                    className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    {key === "pro" && (
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                        Best Value
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-5 h-5 ${isSelected ? "text-accent" : "text-muted-foreground"}`} />
                      <span className="font-semibold">{tier.name}</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">${tier.price}</span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Parent Information */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Parent/Guardian Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="parentName">Full Name *</Label>
              <Input
                id="parentName"
                value={formData.parentName}
                onChange={(e) => handleInputChange("parentName", e.target.value)}
                placeholder="Your full name"
                className={errors.parentName ? "border-destructive" : ""}
              />
              {errors.parentName && (
                <p className="text-xs text-destructive">{errors.parentName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Email *</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                  placeholder="your@email.com"
                  className={errors.parentEmail ? "border-destructive" : ""}
                />
                {errors.parentEmail && (
                  <p className="text-xs text-destructive">{errors.parentEmail}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentPhone">Phone *</Label>
                <Input
                  id="parentPhone"
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className={errors.parentPhone ? "border-destructive" : ""}
                />
                {errors.parentPhone && (
                  <p className="text-xs text-destructive">{errors.parentPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Athlete Information */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Athlete Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="athleteName">Athlete's Full Name *</Label>
              <Input
                id="athleteName"
                value={formData.athleteName}
                onChange={(e) => handleInputChange("athleteName", e.target.value)}
                placeholder="Athlete's full name"
                className={errors.athleteName ? "border-destructive" : ""}
              />
              {errors.athleteName && (
                <p className="text-xs text-destructive">{errors.athleteName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="athleteAge">Age Range *</Label>
                <Select
                  value={formData.athleteAge}
                  onValueChange={(value) => handleInputChange("athleteAge", value)}
                >
                  <SelectTrigger className={errors.athleteAge ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_RANGES.map((age) => (
                      <SelectItem key={age} value={age}>
                        {age}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.athleteAge && (
                  <p className="text-xs text-destructive">{errors.athleteAge}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sport">Primary Sport *</Label>
                <Select
                  value={formData.sport}
                  onValueChange={(value) => handleInputChange("sport", value)}
                >
                  <SelectTrigger className={errors.sport ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPORTS.map((sport) => (
                      <SelectItem key={sport} value={sport}>
                        {sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sport && (
                  <p className="text-xs text-destructive">{errors.sport}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">School Name *</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) => handleInputChange("school", e.target.value)}
                placeholder="Current school"
                className={errors.school ? "border-destructive" : ""}
              />
              {errors.school && (
                <p className="text-xs text-destructive">{errors.school}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Goals & Aspirations (Optional)</Label>
              <Textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => handleInputChange("goals", e.target.value)}
                placeholder="Tell us about your athlete's goals and what you hope to achieve with Brand of a Champion..."
                rows={3}
              />
            </div>
          </div>

          {/* Selected Plan Summary */}
          <div className={`rounded-lg p-4 border space-y-3 ${
            selectedTier === "pro" 
              ? "bg-accent/10 border-accent/30" 
              : "bg-muted/50 border-border"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <currentTier.icon className={`w-5 h-5 ${selectedTier === "pro" ? "text-accent" : "text-muted-foreground"}`} />
                <div>
                  <p className="font-semibold">{currentTier.name} Membership</p>
                  <p className="text-sm text-muted-foreground">Monthly subscription</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${selectedTier === "pro" ? "text-accent" : ""}`}>
                  ${currentTier.price}
                </p>
                <p className="text-sm text-muted-foreground">/month</p>
              </div>
            </div>
            <div className="border-t border-current/10 pt-3">
              <p className="text-sm font-medium mb-2">What's included:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {currentTier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={selectedTier === "pro" ? "text-accent" : "text-foreground"}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Continue to Payment - $${currentTier.price}/month`
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our terms and will be redirected to secure checkout.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};