import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { Session } from "@supabase/supabase-js";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export default function AuthRequired() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        // Check if user is logged in but email not confirmed
        if (session?.user && !session.user.email_confirmed_at) {
          setPendingConfirmation(true);
        } else {
          setPendingConfirmation(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user && !session.user.email_confirmed_at) {
        setPendingConfirmation(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(email);
    } catch {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Invalid email or password");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Please confirm your email before logging in. Check your inbox.");
        setPendingConfirmation(true);
      } else {
        toast.error(error.message);
      }
    } else if (data.user && !data.user.email_confirmed_at) {
      toast.error("Please confirm your email before accessing the site. Check your inbox.");
      setPendingConfirmation(true);
    } else {
      toast.success("Logged in successfully!");
      window.location.reload();
    }
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        return;
      }
    }

    setIsLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl }
    });
    
    if (error) {
      if (error.message.includes("already registered")) {
        toast.error("This email is already registered. Please log in instead.");
        setActiveTab("login");
      } else {
        toast.error(error.message);
      }
    } else {
      setSignUpSuccess(true);
    }
    setIsLoading(false);
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: `${window.location.origin}/` }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Confirmation email resent! Check your inbox.");
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setPendingConfirmation(false);
    setSession(null);
  };

  // Show pending confirmation state
  if (pendingConfirmation || (session?.user && !session.user.email_confirmed_at)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-amber-500" />
            </div>
            <CardTitle className="text-2xl">Email Confirmation Required</CardTitle>
            <CardDescription>
              Please check your inbox and confirm your email to access the site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                We sent a confirmation link to:
              </p>
              <p className="font-medium text-foreground">
                {session?.user?.email || email}
              </p>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={handleResendConfirmation} 
                variant="outline" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Mail className="w-4 h-4 mr-2" />}
                Resend Confirmation Email
              </Button>
              <Button 
                onClick={handleSignOut} 
                variant="ghost" 
                className="w-full"
              >
                Sign Out & Try Another Email
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              After confirming your email, refresh this page or click the link in the email.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show sign up success state
  if (signUpSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a confirmation link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Confirmation email sent to:
              </p>
              <p className="font-medium text-foreground">{email}</p>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={() => {
                  setSignUpSuccess(false);
                  setActiveTab("login");
                }} 
                className="w-full"
              >
                Back to Login
              </Button>
              <Button 
                onClick={handleResendConfirmation} 
                variant="outline" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Resend Confirmation Email
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Click the link in the email to confirm your account, then log in.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <img 
              src="/favicon.ico" 
              alt="Brand of a Champion" 
              className="w-16 h-16 mx-auto"
            />
          </div>
          <CardTitle className="text-2xl">Brand of a Champion</CardTitle>
          <CardDescription>
            Sign in with a verified email to access the site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Login
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Create Account
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  You'll receive an email to confirm your address before accessing the site.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
