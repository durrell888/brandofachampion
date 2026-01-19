import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

type YouTubeBackgroundTileProps = {
  videoId: string;
  label: string;
  className?: string;
};

export function YouTubeBackgroundTile({
  videoId,
  label,
  className,
}: YouTubeBackgroundTileProps) {
  const [playing, setPlaying] = useState(false);

  const embedSrc = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "0",
      controls: "1",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }, [videoId]);

  const thumbSrc = useMemo(
    () => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    [videoId]
  );

  return (
    <div className={cn("relative overflow-hidden group cursor-pointer", className)}>
      {playing ? (
        <iframe
          src={embedSrc}
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title={`${label} drills video`}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          {/* Thumbnail */}
          <img
            src={thumbSrc}
            alt={`${label} drill preview`}
            className="absolute inset-0 h-full w-full object-cover scale-110 transition-transform duration-300 group-hover:scale-125"
            loading="lazy"
            decoding="async"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-background/50 group-hover:bg-background/40 transition-colors" />

          {/* Play button */}
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center z-10"
            aria-label={`Play ${label} video`}
          >
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <Play className="w-8 h-8 text-accent-foreground fill-current ml-1" />
            </div>
          </button>

          {/* Label */}
          <div className="absolute bottom-4 left-4 z-20">
            <Badge className="bg-accent text-accent-foreground font-bold">
              {label}
            </Badge>
          </div>
        </>
      )}
    </div>
  );
}
