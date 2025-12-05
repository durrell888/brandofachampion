import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { MessageSquare, Clock, ChevronRight, Users, TrendingUp } from "lucide-react";
import ThreadDetail from "./ThreadDetail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Thread {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  // Demo fields
  author?: string;
  avatar?: string;
  replyCount?: number;
  lastReplyBy?: string;
  isHot?: boolean;
}

interface ThreadListProps {
  userId: string;
  demoMode?: boolean;
}

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};

// Sample threads showing active community
const sampleThreads: Thread[] = [
  {
    id: "demo-1",
    title: "Tips for getting recruited as a DB? Coach Ross helped me a lot!",
    user_id: "demo-user-1",
    created_at: new Date(Date.now() - 15 * 60000).toISOString(), // 15 mins ago
    updated_at: new Date(Date.now() - 2 * 60000).toISOString(), // 2 mins ago
    author: "Marcus Thompson",
    avatar: "/images/athletes/jamar-owens.jpg",
    replyCount: 12,
    lastReplyBy: "Aaron Ross",
    isHot: true
  },
  {
    id: "demo-2",
    title: "Just got my first D1 offer! Thank you Brand of a Champion family 🙏",
    user_id: "demo-user-2",
    created_at: new Date(Date.now() - 45 * 60000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60000).toISOString(),
    author: "DeShawn Williams",
    avatar: "/images/athletes/jordan-carter.webp",
    replyCount: 28,
    lastReplyBy: "Durrell Steen",
    isHot: true
  },
  {
    id: "demo-3",
    title: "Question about NIL deals for high school athletes",
    user_id: "demo-user-3",
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 30 * 60000).toISOString(),
    author: "Jaylen Carter",
    avatar: "/images/athletes/trey-byrd.jpg",
    replyCount: 8,
    lastReplyBy: "Sanya Richards-Ross"
  },
  {
    id: "demo-4",
    title: "Film review feedback from Coach Ross was game-changing",
    user_id: "demo-user-4",
    created_at: new Date(Date.now() - 5 * 3600000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 3600000).toISOString(),
    author: "Tyler Jackson",
    avatar: "/images/athletes/nick-burden.jpg",
    replyCount: 15,
    lastReplyBy: "Aaron Ross"
  },
  {
    id: "demo-5",
    title: "How to balance academics with D1 recruiting process?",
    user_id: "demo-user-5",
    created_at: new Date(Date.now() - 8 * 3600000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    author: "Cameron Davis",
    avatar: "/images/athletes/aaron-gregory.jpg",
    replyCount: 21,
    lastReplyBy: "Kiana Williams"
  },
  {
    id: "demo-6",
    title: "Financial literacy session helped my family so much",
    user_id: "demo-user-6",
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 3600000).toISOString(),
    author: "Brandon Mitchell",
    avatar: "/images/athletes/jamier-brown.jpg",
    replyCount: 9,
    lastReplyBy: "Andrew Chen"
  }
];

const ThreadList = ({ userId, demoMode = true }: ThreadListProps) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  const fetchThreads = async () => {
    const { data, error } = await supabase
      .from('message_threads')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error && data) {
      // Combine real threads with sample threads for demo
      if (demoMode) {
        setThreads([...sampleThreads, ...data]);
      } else {
        setThreads(data);
      }
    } else if (demoMode) {
      setThreads(sampleThreads);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchThreads();

    const channel = supabase
      .channel('threads-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'message_threads' }, () => {
        fetchThreads();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [demoMode]);

  if (selectedThread) {
    return (
      <ThreadDetail 
        thread={selectedThread} 
        userId={userId}
        onBack={() => setSelectedThread(null)}
        demoMode={selectedThread.id.startsWith('demo-')}
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
    <div className="space-y-4">
      {/* Active users indicator */}
      <div className="flex items-center justify-between bg-accent/10 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {sampleThreads.slice(0, 5).map((t, i) => (
              <Avatar key={i} className="w-8 h-8 border-2 border-background">
                <AvatarImage src={t.avatar} />
                <AvatarFallback className="text-xs bg-accent text-accent-foreground">
                  {t.author?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-sm text-foreground font-medium ml-2">
            <Users className="w-4 h-4 inline mr-1" />
            5 members active now
          </span>
        </div>
        <span className="text-xs text-accent flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Live
        </span>
      </div>

      {threads.map((thread) => (
        <Card 
          key={thread.id}
          className={`p-4 cursor-pointer hover:border-accent/50 transition-all hover:shadow-lg ${
            thread.isHot ? 'border-accent/30 bg-accent/5' : ''
          }`}
          onClick={() => setSelectedThread(thread)}
        >
          <div className="flex items-start gap-3">
            {thread.avatar && (
              <Avatar className="w-10 h-10">
                <AvatarImage src={thread.avatar} />
                <AvatarFallback>{thread.author?.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground truncate">{thread.title}</h3>
                {thread.isHot && (
                  <span className="flex items-center gap-1 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full whitespace-nowrap">
                    <TrendingUp className="w-3 h-3" /> Hot
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {thread.author && (
                  <span className="font-medium text-foreground/80">{thread.author}</span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(thread.updated_at)}
                </span>
                {thread.replyCount !== undefined && (
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {thread.replyCount} replies
                  </span>
                )}
                {thread.user_id === userId && (
                  <span className="text-accent text-xs font-medium">Your thread</span>
                )}
              </div>
              {thread.lastReplyBy && (
                <p className="text-xs text-accent mt-1">
                  Last reply by <span className="font-semibold">{thread.lastReplyBy}</span>
                </p>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-2" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ThreadList;