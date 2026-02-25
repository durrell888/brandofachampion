import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PenSquare, Upload, Loader2 } from "lucide-react";

interface SubmitNewsModalProps {
  onSubmitted?: () => void;
}

export default function SubmitNewsModal({ onSubmitted }: SubmitNewsModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("High School");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be under 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setContent("");
    setCategory("High School");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    if (title.length > 200) {
      toast.error("Title must be under 200 characters");
      return;
    }

    if (description.length > 500) {
      toast.error("Description must be under 500 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to submit news");
        return;
      }

      let imageUrl: string | null = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const filePath = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('news-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast.error("Failed to upload image");
          return;
        }

        const { data: urlData } = supabase.storage
          .from('news-images')
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      const { error } = await supabase
        .from('user_submitted_news')
        .insert({
          user_id: user.id,
          title: title.trim(),
          description: description.trim(),
          content: content.trim() || null,
          category,
          image_url: imageUrl,
          source: 'Community',
          status: 'pending',
        });

      if (error) throw error;

      toast.success("Article submitted!", {
        description: "Your article is pending review and will appear once approved."
      });
      
      resetForm();
      setOpen(false);
      onSubmitted?.();
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to submit article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PenSquare className="w-4 h-4" />
          Submit News
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit a News Article</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Share Georgia high school football news. Articles will be reviewed before publishing.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g. Milton Eagles dominate spring game"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              required
            />
            <p className="text-xs text-muted-foreground text-right">{title.length}/200</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Summary *</Label>
            <Textarea
              id="description"
              placeholder="Brief summary of the article..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
              required
            />
            <p className="text-xs text-muted-foreground text-right">{description.length}/500</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Full Article (optional)</Label>
            <Textarea
              id="content"
              placeholder="Write your full article here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High School">High School</SelectItem>
                <SelectItem value="Recruiting">Recruiting</SelectItem>
                <SelectItem value="Rankings">Rankings</SelectItem>
                <SelectItem value="Community">Community</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cover Image (optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => document.getElementById('news-image-input')?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-md" />
              ) : (
                <div className="py-4">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload (max 5MB)</p>
                </div>
              )}
              <input
                id="news-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit for Review"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
