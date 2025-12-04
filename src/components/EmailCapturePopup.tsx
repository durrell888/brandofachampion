import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Loader2 } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

const EmailCapturePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("emailPopupSeen");
    
    if (!hasSeenPopup) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("emailPopupSeen", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from("subscribers")
        .insert({ email: email.toLowerCase().trim() });

      if (error) {
        if (error.code === "23505") {
          toast.info("You're already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Thanks for subscribing!");
      }
      handleClose();
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">Welcome!</DialogTitle>
          <DialogDescription className="text-base">
            Enter your email to get exclusive updates on our athletes, events, and how you can make a difference.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground text-center mt-2">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCapturePopup;
