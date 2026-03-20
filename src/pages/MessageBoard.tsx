import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Calendar, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import ThreadList from "@/components/messageboard/ThreadList";
import CreateThreadModal from "@/components/messageboard/CreateThreadModal";

const MessageBoard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateThread, setShowCreateThread] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
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
              <ThreadList userId={user?.id || ''} />
            </TabsContent>

            <TabsContent value="coaching">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Your Coaching Sessions</h2>
                <Button variant="hero">Request Session</Button>
              </div>
              <Card className="p-8 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No coaching sessions</h3>
                <p className="text-muted-foreground">Request a session with one of our team members.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <CreateThreadModal 
        open={showCreateThread} 
        onOpenChange={setShowCreateThread}
        userId={user?.id || ''}
      />

      <Footer />
    </div>
  );
};

export default MessageBoard;