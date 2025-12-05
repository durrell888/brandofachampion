import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Calendar, Lock, Loader2 } from "lucide-react";
import ThreadList from "@/components/messageboard/ThreadList";
import CreateThreadModal from "@/components/messageboard/CreateThreadModal";
import CoachingSessionsTab from "@/components/messageboard/CoachingSessionsTab";

const MessageBoard = () => {
  const [user, setUser] = useState<any>(null);
  const [isProSubscriber, setIsProSubscriber] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCreateThread, setShowCreateThread] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        return;
      }

      setUser(session.user);

      // Check Pro subscription
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        if (!error && data) {
          const isPro = data.subscribed && data.product_id === 'prod_SPKCELFqCvN0d0';
          setIsProSubscriber(isPro);
        }
      } catch (err) {
        console.error('Error checking subscription:', err);
      }

      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        setIsProSubscriber(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-pro-checkout');
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // Paywall for non-Pro subscribers - TEMPORARILY DISABLED FOR TESTING
  if (false && !isProSubscriber) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <section className="relative pt-32 pb-20 hero-gradient overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
                <Lock className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-accent uppercase tracking-wider">Pro Members Only</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 tracking-tight">
                Community Message Board
              </h1>
              <p className="text-xl text-primary-foreground/70 mb-8">
                Connect directly with our team of professionals. Ask questions, share your journey, 
                and schedule coaching sessions with former NFL players and industry experts.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="bg-card rounded-2xl border border-border p-8 text-center">
              <MessageSquare className="w-16 h-16 text-accent mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Unlock Full Access with Pro Membership
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Get exclusive access to our message board, direct communication with team members, 
                and the ability to schedule coaching sessions.
              </p>
              <ul className="text-left max-w-sm mx-auto mb-8 space-y-3">
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  Direct messaging with professionals
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  Share images and videos
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  Schedule coaching sessions
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  Former NFL player analysis
                </li>
              </ul>
              <div className="flex flex-col items-center gap-4">
                <div className="text-3xl font-extrabold text-foreground">
                  $14.99<span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>
                <Button variant="hero" size="lg" onClick={handleSubscribe}>
                  {user ? "Subscribe to Pro" : "Sign In to Subscribe"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative pt-32 pb-12 hero-gradient overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4 tracking-tight">
              Community Message Board
            </h1>
            <p className="text-xl text-primary-foreground/70">
              Connect with our team of professionals
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container max-w-5xl">
          <Tabs defaultValue="messages" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="coaching" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Coaching Sessions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="messages">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Discussion Threads</h2>
                <Button variant="hero" onClick={() => setShowCreateThread(true)}>
                  New Thread
                </Button>
              </div>
              <ThreadList userId={user?.id} />
            </TabsContent>

            <TabsContent value="coaching">
              <CoachingSessionsTab userId={user?.id} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <CreateThreadModal 
        open={showCreateThread} 
        onOpenChange={setShowCreateThread}
        userId={user?.id}
      />

      <Footer />
    </div>
  );
};

export default MessageBoard;