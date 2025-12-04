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
import { Users, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

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

export const ParentRegistrationModal = ({ open, onOpenChange }: ParentRegistrationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`New Athlete Registration: ${formData.athleteName}`);
    const body = encodeURIComponent(
      `Parent/Guardian Information:\n` +
      `Name: ${formData.parentName}\n` +
      `Email: ${formData.parentEmail}\n` +
      `Phone: ${formData.parentPhone}\n\n` +
      `Athlete Information:\n` +
      `Name: ${formData.athleteName}\n` +
      `Age: ${formData.athleteAge}\n` +
      `Sport: ${formData.sport}\n` +
      `School: ${formData.school}\n\n` +
      `Goals:\n${formData.goals || "Not specified"}`
    );
    
    // Simulate brief delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    window.location.href = `mailto:Durrell@brandofachampion.com?subject=${subject}&body=${body}`;
    
    setIsLoading(false);
    setIsSuccess(true);
    toast.success("Opening your email client...");
    
    // Reset after success
    setTimeout(() => {
      setIsSuccess(false);
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
      onOpenChange(false);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p className="text-muted-foreground text-center">
              Your registration is being prepared. Please send the email to complete your submission.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            Register Your Athlete
          </DialogTitle>
          <DialogDescription>
            Join the Brand of a Champion program. Fill out the form below to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Parent Information */}
          <div className="space-y-4">
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
              "Submit Registration"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to be contacted about the Brand of a Champion program.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
