import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle, Crown, LogOut, CreditCard, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User } from "@supabase/supabase-js";

interface SubscriptionStatus {
  subscribed: boolean;
  product_id: string | null;
  subscription_end: string | null;
}

const SUBSCRIPTION_TIERS = {
  basic: {
    name: "Basic Athlete Program",
    price: "$4.99/month",
    features: ["Athlete profile with Hudl film", "Personal achievements", "Elite athletes network access"],
  },
  pro: {
    name: "Pro Athlete Program", 
    price: "$14.99/month",
    features: [
      "All Basic features",
      "Professional grade analysis",
      "Community message board access",
      "NIL Advisor access",
      "Direct support team access",
      "Scholarships database access"
    ],
  },
  recruiting: {
    name: "Recruiting Database",
    price: "$19.99/month",
    features: ["Access to college coaching staff contacts", "Contact up to 6 schools per 30 days", "Track contacted schools"],
  },
};

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setIsLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setIsLoading(false);
        checkSubscription();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkSubscription = async () => {
    setIsCheckingSubscription(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      setSubscriptionStatus(data);
    } catch (error) {
      console.error("Error checking subscription:", error);
      setSubscriptionStatus({ subscribed: false, product_id: null, subscription_end: null });
    } finally {
      setIsCheckingSubscription(false);
    }
  };

  const handleSubscribe = async (tier: string) => {
    try {
      let functionName = 'create-checkout';
      if (tier === 'pro') {
        functionName = 'create-pro-checkout';
      } else if (tier === 'recruiting') {
        functionName = 'create-checkout';
      }
      
      const { data, error } = await supabase.functions.invoke(functionName);
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("Failed to start checkout. Please try again.");
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast.error("Failed to open subscription management. Please try again.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 container">
        <div className="max-w-4xl mx-auto">
          {/* Account Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">My Account</h1>
            <p className="text-muted-foreground">Manage your subscription and account settings</p>
          </div>

          {/* User Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold text-lg">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Subscription Status Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-accent" />
                Subscription Status
              </CardTitle>
              <CardDescription>
                Your current subscription details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isCheckingSubscription ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Checking subscription status...
                </div>
              ) : subscriptionStatus?.subscribed ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-green-600">Active Subscription</span>
                  </div>
                  {subscriptionStatus.subscription_end && (
                    <p className="text-sm text-muted-foreground">
                      Renews on: {new Date(subscriptionStatus.subscription_end).toLocaleDateString()}
                    </p>
                  )}
                  <Button onClick={handleManageSubscription} variant="outline" className="gap-2">
                    <CreditCard className="w-4 h-4" />
                    Manage Subscription
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">No active subscription</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Subscribe to unlock premium features like recruiting database, scholarships, and community access.
                  </p>
                </div>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={checkSubscription} 
                className="mt-4"
                disabled={isCheckingSubscription}
              >
                {isCheckingSubscription ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Refresh Status
              </Button>
            </CardContent>
          </Card>

          {/* Subscription Plans */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Available Plans</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(SUBSCRIPTION_TIERS).map(([key, tier]) => (
                <Card key={key} className="relative overflow-hidden">
                  {key === 'pro' && (
                    <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold text-foreground">{tier.price}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      onClick={() => handleSubscribe(key)} 
                      className="w-full gap-2"
                      variant={key === 'pro' ? 'default' : 'outline'}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
