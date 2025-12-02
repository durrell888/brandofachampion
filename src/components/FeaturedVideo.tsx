import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Video } from "@/data/videos";

interface FeaturedVideoProps {
  video: Video;
  onPlay: (video: Video) => void;
}

const FeaturedVideo = ({ video, onPlay }: FeaturedVideoProps) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div
        className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group card-shadow hover:card-shadow-hover transition-all duration-300"
        onClick={() => onPlay(video)}
      >
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Play className="w-10 h-10 md:w-12 md:h-12 text-accent-foreground ml-1" fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-accent">Featured Video</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
          {video.title}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {video.description}
        </p>
        <Button variant="hero" size="lg" onClick={() => onPlay(video)}>
          <Play className="w-5 h-5" />
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default FeaturedVideo;
