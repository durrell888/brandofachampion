import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface CreateThreadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const CreateThreadModal = ({ open, onOpenChange, userId }: CreateThreadModalProps) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const handleCreate = async () => {
    const trimmedTitle = title.trim();
    const trimmedMessage = message.trim();
    
    if (!trimmedTitle) {
      toast({ title: "Title required", description: "Please enter a title", variant: "destructive" });
      return;
    }
    
    if (trimmedTitle.length > 200) {
      toast({ title: "Title too long", description: "Maximum 200 characters allowed", variant: "destructive" });
      return;
    }
    
    if (trimmedMessage.length > 10000) {
      toast({ title: "Message too long", description: "Maximum 10,000 characters allowed", variant: "destructive" });
      return;
    }

    setCreating(true);

    const { data: thread, error } = await supabase
      .from('message_threads')
      .insert({ user_id: userId, title: trimmedTitle })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: "Failed to create thread", variant: "destructive" });
      setCreating(false);
      return;
    }

    if (trimmedMessage) {
      await supabase.from('thread_messages').insert({
        thread_id: thread.id,
        user_id: userId,
        content: trimmedMessage
      });
    }

    toast({ title: "Thread created", description: "Your discussion thread has been created" });
    setTitle("");
    setMessage("");
    setCreating(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Start a New Discussion</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Thread Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What would you like to discuss?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Initial Message (optional)</Label>
            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Add details..." rows={4} />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="hero" onClick={handleCreate} disabled={creating}>
            {creating && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Create Thread
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateThreadModal;