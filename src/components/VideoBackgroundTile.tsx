import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type VideoBackgroundTileProps = {
  videoSrc: string;
  label: string;
  className?: string;
};

export function VideoBackgroundTile({
  videoSrc,
  label,
  className,
}: VideoBackgroundTileProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110"
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
