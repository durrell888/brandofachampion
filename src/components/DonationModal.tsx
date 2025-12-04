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
import { Heart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

export const DonationModal = ({ open, onOpenChange }: DonationModalProps) => {
  const [amount, setAmount] = useState<string>("100");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePresetClick = (preset: number) => {
    setAmount(preset.toString());
  };

  const handleDonate = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      toast.error("Please enter a valid donation amount (minimum $1)");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-donation", {
        body: { amount: numAmount, email: email || undefined },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Failed to process donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent" />
            Make a Donation
          </DialogTitle>
          <DialogDescription>
            Support our mission to empower athletes to succeed in every aspect of life.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Preset amounts */}
          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_AMOUNTS.map((preset) => (
                <Button
                  key={preset}
                  variant={amount === preset.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePresetClick(preset)}
                  className="flex-1 min-w-[60px]"
                >
                  ${preset}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Custom Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="amount"
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Email (optional) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <p className="text-xs text-muted-foreground">
              For donation receipt
            </p>
          </div>

          {/* Donate button */}
          <Button
            onClick={handleDonate}
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
              <>
                <Heart className="w-4 h-4 mr-2" />
                Donate ${amount || "0"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
