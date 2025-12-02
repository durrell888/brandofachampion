import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Video } from "@/data/videos";

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
}

const VideoCard = ({ video, onPlay }: VideoCardProps) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <div
      className="group cursor-pointer rounded-xl overflow-hidden bg-card card-shadow hover:card-shadow-hover transition-all duration-300"
      onClick={() => onPlay(video)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="w-7 h-7 text-accent-foreground ml-1" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge variant="secondary" className="bg-foreground/80 text-background">
            {video.duration}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <Badge variant="outline" className="mb-3 text-xs capitalize">
          {video.category.replace("-", " ")}
        </Badge>
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
