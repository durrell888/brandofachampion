import { motion } from "framer-motion";
import { Calendar, Award, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coach } from "@/data/coaches";
import { useNavigate } from "react-router-dom";
import soliDlineImg from "@/assets/soli-performance-systems-logo.jpg";

interface CoachCardProps {
  coach: Coach;
  onBook: (coach: Coach) => void;
}

export function CoachCard({ coach, onBook }: CoachCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (coach.id === "dline-specialist") {
      navigate("/defensive-line-specialist");
    } else {
      navigate(`/coach/${coach.id}`);
    }
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (coach.externalLink) {
      if (coach.externalLink.startsWith('/')) {
        navigate(coach.externalLink);
      } else {
        window.open(coach.externalLink, '_blank');
      }
    } else {
      onBook(coach);
    }
  };

  const isLogoImage = coach.id === "dline-specialist" || coach.image.includes("soli-dline");
  const coachImageSrc = coach.id === "dline-specialist" ? soliDlineImg : coach.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={handleCardClick}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={coachImageSrc}
          alt={coach.name}
          className={`w-full h-full ${isLogoImage ? "object-contain p-4 bg-[#1a0800]" : "object-cover object-top"} group-hover:scale-105 transition-transform duration-500`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge variant="secondary" className="mb-2">
            {coach.positionGroup}
          </Badge>
          <h3 className="text-xl font-display font-bold text-foreground">
            {coach.name}
          </h3>
          <p className="text-sm text-accent">{coach.position}</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Award className="h-4 w-4 text-accent" />
          <span>{coach.experience}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {coach.bio}
        </p>

        <div className="flex flex-wrap gap-2">
          {coach.specialties.slice(0, 3).map((specialty) => (
            <Badge
              key={specialty}
              variant="outline"
              className="text-xs border-border/50"
            >
              {specialty}
            </Badge>
          ))}
          {coach.specialties.length > 3 && (
            <Badge variant="outline" className="text-xs border-border/50">
              +{coach.specialties.length - 3} more
            </Badge>
          )}
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <Button
            onClick={handleBookClick}
            variant="hero"
            className="w-full"
          >
            <Calendar className="mr-2 h-4 w-4 shrink-0" />
            Book Session
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-accent hover:text-accent/80"
          >
            View Curriculum
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
