import { MapPin, Trophy, Briefcase, GraduationCap, Heart, DollarSign, Home, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  position?: string;
  location: string;
  avatar: string;
  achievements: string[];
  supportNeeded: string[];
  yearsActive: string;
  status: "active" | "retired" | "transitioning";
}

const supportIcons: Record<string, React.ReactNode> = {
  Career: <Briefcase className="w-3 h-3" />,
  Education: <GraduationCap className="w-3 h-3" />,
  "Mental Health": <Heart className="w-3 h-3" />,
  Financial: <DollarSign className="w-3 h-3" />,
  Housing: <Home className="w-3 h-3" />,
  Legal: <Scale className="w-3 h-3" />,
};

const statusColors: Record<string, string> = {
  active: "bg-success text-success-foreground",
  retired: "bg-muted text-muted-foreground",
  transitioning: "bg-accent text-accent-foreground",
};

interface AthleteCardProps {
  athlete: Athlete;
  index: number;
}

const AthleteCard = ({ athlete, index }: AthleteCardProps) => {
  return (
    <div
      className="group bg-card rounded-2xl border-2 border-border p-6 card-shadow hover:card-shadow-hover hover:border-primary/20 transition-all duration-300 animate-fade-in opacity-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={athlete.avatar}
            alt={athlete.name}
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-border group-hover:ring-primary/30 transition-all"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${statusColors[athlete.status]}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {athlete.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {athlete.sport} {athlete.position && `· ${athlete.position}`}
              </p>
            </div>
            <Badge variant="secondary" className="shrink-0 capitalize">
              {athlete.status}
            </Badge>
          </div>

          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span>{athlete.location}</span>
            <span className="mx-1">·</span>
            <span>{athlete.yearsActive}</span>
          </div>
        </div>
      </div>

      {athlete.achievements.length > 0 && (
        <div className="mt-4 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-accent shrink-0" />
          <p className="text-sm text-muted-foreground truncate">{athlete.achievements[0]}</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs font-medium text-muted-foreground mb-2">Support Needed</p>
        <div className="flex flex-wrap gap-1.5">
          {athlete.supportNeeded.map((support) => (
            <Badge key={support} variant="outline" className="text-xs gap-1 font-normal">
              {supportIcons[support]}
              {support}
            </Badge>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
        View Profile
      </Button>
    </div>
  );
};

export default AthleteCard;