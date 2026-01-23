import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Coach } from "@/data/coaches";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coach: Coach | null;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

export function BookingModal({ open, onOpenChange, coach }: BookingModalProps) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [athleteName, setAthleteName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const isSubscription = coach?.isSubscription === true;

  const handleBookSession = async () => {
    // For subscriptions, only require athlete name and email
    if (isSubscription) {
      if (!athleteName || !parentEmail) {
        toast({
          title: "Missing Information",
          description: "Please fill in all fields to start your subscription.",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!date || !time || !athleteName || !parentEmail) {
        toast({
          title: "Missing Information",
          description: "Please fill in all fields to book your session.",
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);

    try {
      const functionName = isSubscription ? "create-strength-checkout" : "create-training-checkout";
      const body = isSubscription
        ? { athleteName, parentEmail }
        : {
            coachId: coach?.id,
            coachName: coach?.name,
            position: coach?.positionGroup,
            date: format(date!, "yyyy-MM-dd"),
            time,
            athleteName,
            parentEmail,
          };

      const { data, error } = await supabase.functions.invoke(functionName, { body });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
        onOpenChange(false);
        toast({
          title: "Redirecting to Payment",
          description: isSubscription
            ? "Complete your payment to start your monthly subscription."
            : "Complete your payment to confirm your booking.",
        });
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      toast({
        title: isSubscription ? "Subscription Failed" : "Booking Failed",
        description: error.message || "Unable to process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            {isSubscription ? "Subscribe to Training" : "Book Training Session"}
          </DialogTitle>
          <DialogDescription>
            {coach && (
              <span className="text-accent font-semibold">{coach.name}</span>
            )}{" "}
            - {coach?.positionGroup}
            {isSubscription && coach?.subscriptionPrice && (
              <span className="block mt-1 text-lg font-bold text-accent">
                ${coach.subscriptionPrice}/month
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Athlete Name */}
          <div className="space-y-2">
            <Label htmlFor="athleteName">Athlete Name</Label>
            <Input
              id="athleteName"
              placeholder="Enter athlete's full name"
              value={athleteName}
              onChange={(e) => setAthleteName(e.target.value)}
              className="bg-background border-border"
            />
          </div>

          {/* Parent Email */}
          <div className="space-y-2">
            <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
            <Input
              id="parentEmail"
              type="email"
              placeholder="Enter email for confirmation"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              className="bg-background border-border"
            />
          </div>

          {/* Date Picker - Only show for non-subscription bookings */}
          {!isSubscription && (
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-background border-border",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date < new Date() || date.getDay() === 0
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Time Slot - Only show for non-subscription bookings */}
          {!isSubscription && (
            <div className="space-y-2">
              <Label>Select Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue placeholder="Choose a time slot">
                    {time && (
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </span>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Session Info */}
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground">
              {isSubscription
                ? "Monthly subscription includes unlimited access to training materials and scheduled sessions"
                : "1-hour personalized training session"}
            </p>
          </div>

          {/* Book Button */}
          <Button
            onClick={handleBookSession}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                {isSubscription ? "Subscribe Now" : "Proceed to Payment"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
