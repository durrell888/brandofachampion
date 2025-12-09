import { useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Shield } from "lucide-react";
import { toast } from "sonner";

interface SitePasswordGateProps {
  children: ReactNode;
}

const STORAGE_KEY = "site_password_verified";

export const SitePasswordGate = ({ children }: SitePasswordGateProps) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordEnabled, setPasswordEnabled] = useState(false);

  useEffect(() => {
    checkPasswordStatus();
  }, []);

  const checkPasswordStatus = async () => {
    try {
      // Check if site password is enabled
      const { data: settings, error } = await supabase
        .from("site_settings")
        .select("setting_key, setting_value")
        .eq("setting_key", "site_password_enabled")
        .maybeSingle();

      if (error) {
        console.error("Error checking password status:", error);
        setIsLoading(false);
        setIsVerified(true); // Default to allowing access on error
        return;
      }

      const enabled = settings?.setting_value === "true";
      setPasswordEnabled(enabled);

      if (!enabled) {
        setIsVerified(true);
        setIsLoading(false);
        return;
      }

      // Check if already verified in this session
      const verified = sessionStorage.getItem(STORAGE_KEY) === "true";
      setIsVerified(verified);
      setIsLoading(false);
    } catch (error) {
      console.error("Error in checkPasswordStatus:", error);
      setIsVerified(true);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      toast.error("Please enter a password");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("verify-site-password", {
        body: { password: password.trim() },
      });

      if (error) {
        toast.error("Failed to verify password");
        setIsSubmitting(false);
        return;
      }

      if (data.valid) {
        sessionStorage.setItem(STORAGE_KEY, "true");
        setIsVerified(true);
        toast.success("Access granted");
      } else {
        toast.error("Incorrect password");
        setPassword("");
      }
    } catch (error) {
      console.error("Error verifying password:", error);
      toast.error("Failed to verify password");
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!passwordEnabled || isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-center">Site Protected</h1>
            <p className="text-muted-foreground text-center mt-2">
              This site is password protected. Please enter the password to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                disabled={isSubmitting}
                autoFocus
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Enter Site"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Contact the site administrator if you need access.
          </p>
        </div>
      </div>
    </div>
  );
};
