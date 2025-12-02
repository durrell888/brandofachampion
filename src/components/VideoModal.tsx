import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Video } from "@/data/videos";

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ video, isOpen, onClose }: VideoModalProps) => {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 bg-foreground overflow-hidden">
        <DialogTitle className="sr-only">{video.title}</DialogTitle>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
