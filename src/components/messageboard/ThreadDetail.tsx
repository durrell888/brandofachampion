import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Image, X, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Thread {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
  author?: string;
  avatar?: string;
}

interface Message {
  id: string;
  thread_id: string;
  user_id: string;
  content: string;
  is_team_response: boolean;
  team_member_name: string | null;
  media_urls: string[] | null;
  created_at: string;
  // Demo fields
  author?: string;
  avatar?: string;
}

interface ThreadDetailProps {
  thread: Thread;
  userId: string;
  onBack: () => void;
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
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

// Sample messages for demo threads
const getDemoMessages = (threadId: string): Message[] => {
  const demoMessagesMap: Record<string, Message[]> = {
    "demo-1": [
      {
        id: "msg-1-1",
        thread_id: "demo-1",
        user_id: "demo-user-1",
        content: "Hey everyone! I've been working with Coach Ross on my film and techniques. Any other DBs here have tips on what coaches are looking for?",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 15 * 60000).toISOString(),
        author: "Marcus Thompson",
        avatar: "/images/athletes/jamar-owens.jpg"
      },
      {
        id: "msg-1-2",
        thread_id: "demo-1",
        user_id: "team-aaron",
        content: "Great question Marcus! The main things coaches look for: 1) Hip fluidity in your backpedal 2) Ball skills - can you track and high-point the ball 3) Tackling technique 4) Football IQ. Send me your latest film and I'll give you specific feedback.",
        is_team_response: true,
        team_member_name: "Aaron Ross",
        media_urls: null,
        created_at: new Date(Date.now() - 12 * 60000).toISOString(),
        author: "Aaron Ross",
        avatar: "/images/team/aaron-ross.avif"
      },
      {
        id: "msg-1-3",
        thread_id: "demo-1",
        user_id: "demo-user-3",
        content: "Coach Ross's feedback on my press coverage changed everything. Went from 0 offers to 3 in two months!",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 8 * 60000).toISOString(),
        author: "Jaylen Carter",
        avatar: "/images/athletes/trey-byrd.jpg"
      },
      {
        id: "msg-1-4",
        thread_id: "demo-1",
        user_id: "demo-user-4",
        content: "Facts! The 1-on-1 film review sessions are worth every penny of the Pro membership",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 5 * 60000).toISOString(),
        author: "Tyler Jackson",
        avatar: "/images/athletes/nick-burden.jpg"
      },
      {
        id: "msg-1-5",
        thread_id: "demo-1",
        user_id: "demo-user-5",
        content: "Just scheduled my session with Coach Ross for next week. Can't wait! 💪",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 2 * 60000).toISOString(),
        author: "Cameron Davis",
        avatar: "/images/athletes/aaron-gregory.jpg"
      }
    ],
    "demo-2": [
      {
        id: "msg-2-1",
        thread_id: "demo-2",
        user_id: "demo-user-2",
        content: "I can't believe it y'all... Just got off the phone with Georgia State. THEY OFFERED! First D1 offer ever. Couldn't have done it without this community and Durrell's guidance on reaching out to coaches the right way.",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 45 * 60000).toISOString(),
        author: "DeShawn Williams",
        avatar: "/images/athletes/jordan-carter.webp"
      },
      {
        id: "msg-2-2",
        thread_id: "demo-2",
        user_id: "demo-user-1",
        content: "LETS GOOOOO! 🔥🔥🔥 Congrats bro!",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 42 * 60000).toISOString(),
        author: "Marcus Thompson",
        avatar: "/images/athletes/jamar-owens.jpg"
      },
      {
        id: "msg-2-3",
        thread_id: "demo-2",
        user_id: "team-durrell",
        content: "DeShawn! So proud of you! Remember what we talked about - this is just the beginning. Keep your options open, stay focused on your grades, and let's strategize on your next steps. DM me to set up a call this week.",
        is_team_response: true,
        team_member_name: "Durrell Steen",
        media_urls: null,
        created_at: new Date(Date.now() - 38 * 60000).toISOString(),
        author: "Durrell Steen",
        avatar: "/images/team/durrell-steen.jpg"
      },
      {
        id: "msg-2-4",
        thread_id: "demo-2",
        user_id: "demo-user-4",
        content: "Huge W! You deserve it bro, been watching you grind all year",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 25 * 60000).toISOString(),
        author: "Tyler Jackson",
        avatar: "/images/athletes/nick-burden.jpg"
      },
      {
        id: "msg-2-5",
        thread_id: "demo-2",
        user_id: "demo-user-3",
        content: "This is what it's all about! Motivation for all of us 🙌",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 15 * 60000).toISOString(),
        author: "Jaylen Carter",
        avatar: "/images/athletes/trey-byrd.jpg"
      },
      {
        id: "msg-2-6",
        thread_id: "demo-2",
        user_id: "demo-user-6",
        content: "Congrats DeShawn! Remember me when you're in the league 😂",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 5 * 60000).toISOString(),
        author: "Brandon Mitchell",
        avatar: "/images/athletes/jamier-brown.jpg"
      }
    ],
    "demo-3": [
      {
        id: "msg-3-1",
        thread_id: "demo-3",
        user_id: "demo-user-3",
        content: "I've been getting some local businesses reaching out about NIL deals. My parents don't really understand how it works. Can high schoolers even do NIL? What should we look out for?",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
        author: "Jaylen Carter",
        avatar: "/images/athletes/trey-byrd.jpg"
      },
      {
        id: "msg-3-2",
        thread_id: "demo-3",
        user_id: "team-sanya",
        content: "Great question Jaylen! Yes, high schoolers can do NIL in most states now. Here's what to watch for:\n\n1. Always have a lawyer or trusted adult review contracts\n2. Understand what they're asking you to do (social posts, appearances, etc.)\n3. Make sure it doesn't conflict with potential college eligibility\n4. Don't sign exclusivity deals early in your career\n\nDM me and we can connect you with our NIL advisor for a free consultation!",
        is_team_response: true,
        team_member_name: "Sanya Richards-Ross",
        media_urls: null,
        created_at: new Date(Date.now() - 1.5 * 3600000).toISOString(),
        author: "Sanya Richards-Ross",
        avatar: "/images/team/sanya-richards-ross.jpg"
      },
      {
        id: "msg-3-3",
        thread_id: "demo-3",
        user_id: "demo-user-1",
        content: "This is so helpful! I've been wondering the same thing",
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date(Date.now() - 45 * 60000).toISOString(),
        author: "Marcus Thompson",
        avatar: "/images/athletes/jamar-owens.jpg"
      }
    ]
  };

  // Return specific messages for known threads, or generic ones for others
  return demoMessagesMap[threadId] || [
    {
      id: "msg-generic-1",
      thread_id: threadId,
      user_id: "demo-user-1",
      content: "Great discussion topic! Looking forward to hearing everyone's thoughts.",
      is_team_response: false,
      team_member_name: null,
      media_urls: null,
      created_at: new Date(Date.now() - 3600000).toISOString(),
      author: "Marcus Thompson",
      avatar: "/images/athletes/jamar-owens.jpg"
    },
    {
      id: "msg-generic-2",
      thread_id: threadId,
      user_id: "team-durrell",
      content: "Thanks for bringing this up! This is exactly the kind of conversation that helps our whole community grow. Let me share some thoughts...",
      is_team_response: true,
      team_member_name: "Durrell Steen",
      media_urls: null,
      created_at: new Date(Date.now() - 2400000).toISOString(),
      author: "Durrell Steen",
      avatar: "/images/team/durrell-steen.jpg"
    }
  ];
};

const ThreadDetail = ({ thread, userId, onBack, demoMode = false }: ThreadDetailProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const fetchMessages = async () => {
    if (demoMode) {
      setMessages(getDemoMessages(thread.id));
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('thread_messages')
      .select('*')
      .eq('thread_id', thread.id)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();

    if (!demoMode) {
      const channel = supabase
        .channel(`thread-${thread.id}`)
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'thread_messages',
          filter: `thread_id=eq.${thread.id}`
        }, (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [thread.id, demoMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + mediaFiles.length > 5) {
      toast({
        title: "Too many files",
        description: "You can only attach up to 5 files per message",
        variant: "destructive"
      });
      return;
    }

    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
      
      if (!isImage && !isVideo) {
        toast({ title: "Invalid file", description: "Only images and videos are allowed", variant: "destructive" });
        return false;
      }
      if (file.size > maxSize) {
        toast({ title: "File too large", description: `Max size: ${isVideo ? '50MB' : '10MB'}`, variant: "destructive" });
        return false;
      }
      return true;
    });

    setMediaFiles(prev => [...prev, ...validFiles]);
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    setMediaPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadMedia = async (): Promise<string[]> => {
    const urls: string[] = [];
    
    for (const file of mediaFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('message-media')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('message-media')
        .getPublicUrl(fileName);
      
      urls.push(publicUrl);
    }

    return urls;
  };

  const handleSend = async () => {
    if (!newMessage.trim() && mediaFiles.length === 0) return;

    if (demoMode) {
      // In demo mode, just add message locally
      const newMsg: Message = {
        id: `demo-new-${Date.now()}`,
        thread_id: thread.id,
        user_id: userId,
        content: newMessage.trim(),
        is_team_response: false,
        team_member_name: null,
        media_urls: null,
        created_at: new Date().toISOString(),
        author: "You",
        avatar: undefined
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage("");
      toast({
        title: "Message sent!",
        description: "Your message has been posted to the thread."
      });
      return;
    }

    setSending(true);
    let mediaUrls: string[] = [];

    if (mediaFiles.length > 0) {
      setUploading(true);
      mediaUrls = await uploadMedia();
      setUploading(false);
    }

    const { error } = await supabase
      .from('thread_messages')
      .insert({
        thread_id: thread.id,
        user_id: userId,
        content: newMessage.trim(),
        media_urls: mediaUrls.length > 0 ? mediaUrls : null
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } else {
      setNewMessage("");
      setMediaFiles([]);
      setMediaPreviews([]);
      
      await supabase
        .from('message_threads')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', thread.id);
    }

    setSending(false);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center gap-4 pb-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          {thread.avatar && (
            <Avatar className="w-10 h-10">
              <AvatarImage src={thread.avatar} />
              <AvatarFallback>{thread.author?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <h2 className="font-bold text-foreground">{thread.title}</h2>
            <p className="text-sm text-muted-foreground">
              {thread.author && <span className="text-foreground/80">{thread.author} • </span>}
              Started {formatTimeAgo(thread.created_at)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-accent" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.user_id === userId && !message.is_team_response ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${message.user_id === userId && !message.is_team_response ? 'flex-row-reverse' : ''}`}>
                {message.avatar && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback className="text-xs">{message.author?.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <Card className={`p-3 ${
                  message.is_team_response 
                    ? 'bg-accent/10 border-accent/30' 
                    : message.user_id === userId 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary'
                }`}>
                  {(message.is_team_response || message.author) && message.user_id !== userId && (
                    <p className={`text-xs font-bold mb-1 ${message.is_team_response ? 'text-accent' : 'text-foreground/80'}`}>
                      {message.author || message.team_member_name}
                      {message.is_team_response && ' • Team'}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {message.media_urls && message.media_urls.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {message.media_urls.map((url, idx) => (
                        url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') ? (
                          <video 
                            key={idx} 
                            src={url} 
                            controls 
                            className="rounded-lg max-h-48 w-full object-cover"
                          />
                        ) : (
                          <img 
                            key={idx} 
                            src={url} 
                            alt="Attachment" 
                            className="rounded-lg max-h-48 w-full object-cover cursor-pointer"
                            onClick={() => window.open(url, '_blank')}
                          />
                        )
                      ))}
                    </div>
                  )}
                  
                  <p className={`text-xs mt-1 ${
                    message.user_id === userId && !message.is_team_response 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}>
                    {formatTimeAgo(message.created_at)}
                  </p>
                </Card>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {mediaPreviews.length > 0 && (
        <div className="flex gap-2 py-2 overflow-x-auto">
          {mediaPreviews.map((preview, idx) => (
            <div key={idx} className="relative flex-shrink-0">
              {mediaFiles[idx]?.type.startsWith('video/') ? (
                <video src={preview} className="h-16 w-16 object-cover rounded-lg" />
              ) : (
                <img src={preview} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
              )}
              <button
                onClick={() => removeMedia(idx)}
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4 border-t border-border">
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={sending}
          >
            <Image className="w-4 h-4" />
          </Button>
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 min-h-[40px] max-h-[120px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button 
            variant="hero" 
            size="icon"
            onClick={handleSend}
            disabled={sending || (!newMessage.trim() && mediaFiles.length === 0)}
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        {uploading && (
          <p className="text-xs text-muted-foreground mt-1">Uploading media...</p>
        )}
      </div>
    </div>
  );
};

export default ThreadDetail;