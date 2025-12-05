import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MessageSquare, Clock, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ThreadDetail from "./ThreadDetail";

interface Thread {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface ThreadListProps {
  userId: string;
}

const ThreadList = ({ userId }: ThreadListProps) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  const fetchThreads = async () => {
    const { data, error } = await supabase
      .from('message_threads')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setThreads(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchThreads();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('threads-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'message_threads' }, () => {
        fetchThreads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (selectedThread) {
    return (
      <ThreadDetail 
        thread={selectedThread} 
        userId={userId}
        onBack={() => setSelectedThread(null)}
      />
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-5 bg-secondary rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-secondary rounded w-1/2"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <Card className="p-8 text-center">
        <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No threads yet</h3>
        <p className="text-muted-foreground">Be the first to start a discussion!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {threads.map((thread) => (
        <Card 
          key={thread.id}
          className="p-4 cursor-pointer hover:border-accent/50 transition-colors"
          onClick={() => setSelectedThread(thread)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">{thread.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                </span>
                {thread.user_id === userId && (
                  <span className="text-accent text-xs font-medium">Your thread</span>
                )}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ThreadList;