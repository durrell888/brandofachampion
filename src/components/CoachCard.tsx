import { motion } from "framer-motion";
import { Calendar, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coach } from "@/data/coaches";

interface CoachCardProps {
  coach: Coach;
  onBook: (coach: Coach) => void;
}

export function CoachCard({ coach, onBook }: CoachCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={coach.image}
          alt={coach.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
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

        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-accent">
            <Star className="h-4 w-4 fill-accent" />
            <Star className="h-4 w-4 fill-accent" />
            <Star className="h-4 w-4 fill-accent" />
            <Star className="h-4 w-4 fill-accent" />
            <Star className="h-4 w-4 fill-accent" />
          </div>
          <Button onClick={() => onBook(coach)} size="sm" variant="hero">
            <Calendar className="mr-2 h-4 w-4" />
            Book Session
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
