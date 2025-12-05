import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Image, Video, X, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Thread {
  id: string;
  title: string;
  user_id: string;
  created_at: string;
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
}

interface ThreadDetailProps {
  thread: Thread;
  userId: string | undefined;
  onBack: () => void;
}

const ThreadDetail = ({ thread, userId, onBack }: ThreadDetailProps) => {
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
  }, [thread.id]);

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
      const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024; // 50MB video, 10MB image
      
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
    if (!userId) return;
    if (!newMessage.trim() && mediaFiles.length === 0) return;

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
      
      // Update thread's updated_at
      await supabase
        .from('message_threads')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', thread.id);
    }

    setSending(false);
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="font-bold text-foreground">{thread.title}</h2>
          <p className="text-sm text-muted-foreground">
            Started {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Messages */}
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
              <Card className={`max-w-[80%] p-3 ${
                message.is_team_response 
                  ? 'bg-accent/10 border-accent/30' 
                  : message.user_id === userId 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary'
              }`}>
                {message.is_team_response && message.team_member_name && (
                  <p className="text-xs font-bold text-accent mb-1">
                    {message.team_member_name} • Team
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
                  {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                </p>
              </Card>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Media previews */}
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

      {/* Input */}
      <div className="pt-4 border-t border-border">
        {userId ? (
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
        ) : (
          <div className="text-center py-2">
            <a href="/auth" className="text-accent hover:underline font-medium">
              Sign in to join the conversation
            </a>
          </div>
        )}
        {uploading && (
          <p className="text-xs text-muted-foreground mt-1">Uploading media...</p>
        )}
      </div>
    </div>
  );
};

export default ThreadDetail;