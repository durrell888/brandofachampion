import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  const [loaded, setLoaded] = useState(false);

  const embedSrc = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      loop: "1",
      playlist: videoId,
      controls: "0",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      iv_load_policy: "3",
      fs: "0",
      disablekb: "1",
    });

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }, [videoId]);

  const thumbSrc = useMemo(
    () => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    [videoId]
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Fallback poster so the tile never looks blank */}
      <img
        src={thumbSrc}
        alt={`${label} drill preview`}
        className="absolute inset-0 h-full w-full object-cover scale-110"
        loading="lazy"
        decoding="async"
      />

      {/* Video layer */}
      <iframe
        src={embedSrc}
        className={cn(
          "absolute inset-0 w-full h-full scale-150 transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        style={{ border: "none", pointerEvents: "none" }}
        allow="autoplay; encrypted-media; picture-in-picture"
        title={`${label} drills video`}
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setLoaded(true)}
      />

      {/* Soft darkening for readability */}
      <div className="absolute inset-0 bg-background/40" />

      <div className="absolute bottom-4 left-4 z-20">
        <Badge className="bg-accent text-accent-foreground font-bold">
          {label}
        </Badge>
      </div>
    </div>
  );
}
