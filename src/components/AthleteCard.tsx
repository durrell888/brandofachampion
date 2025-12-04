import { MapPin, Trophy, Briefcase, GraduationCap, Heart, DollarSign, Home, Scale, Video, Ruler, Weight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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
  classYear?: string;
  school?: string;
  gpa?: number;
  height?: string;
  weight?: string;
  hudlLink?: string;
  instagramLink?: string;
  twitterLink?: string;
}

const supportIcons: Record<string, React.ReactNode> = {
  Career: <Briefcase className="w-3 h-3" />,
  Education: <GraduationCap className="w-3 h-3" />,
  "Mental Health": <Heart className="w-3 h-3" />,
  Financial: <DollarSign className="w-3 h-3" />,
  Housing: <Home className="w-3 h-3" />,
  Legal: <Scale className="w-3 h-3" />,
};

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: "bg-success", text: "text-success-foreground", label: "Active" },
  retired: { bg: "bg-muted", text: "text-muted-foreground", label: "Retired" },
  transitioning: { bg: "bg-accent", text: "text-accent-foreground", label: "Transitioning" },
};

interface AthleteCardProps {
  athlete: Athlete;
  index: number;
}

const AthleteCard = ({ athlete, index }: AthleteCardProps) => {
  const status = statusConfig[athlete.status];

  return (
    <div
      className="group bg-card rounded-xl border border-border overflow-hidden card-shadow hover:card-shadow-hover hover:border-accent/30 transition-all duration-300 animate-fade-in opacity-0"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header with image */}
      <div className="relative h-32 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjMgMCAxMiA1LjM3IDEyIDEyaC02eiIgZmlsbD0icmdiYSgwLDAsMCwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-50" />
        <img
          src={athlete.avatar}
          alt={athlete.name}
          className="absolute bottom-0 left-6 transform translate-y-1/2 w-20 h-20 rounded-xl object-cover ring-4 ring-card shadow-lg group-hover:ring-accent/30 transition-all"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
            {status.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-14 px-6 pb-6">
        <div className="mb-4">
          <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
            {athlete.name}
          </h3>
          <p className="text-sm font-medium text-muted-foreground">
            {athlete.sport} {athlete.position && `· ${athlete.position}`}
          </p>
          {athlete.classYear && (
            <p className="text-sm font-bold text-accent">
              Class of {athlete.classYear}
            </p>
          )}
        </div>

        {athlete.school && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <GraduationCap className="w-4 h-4 text-accent" />
            <span className="font-medium">{athlete.school}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{athlete.location}</span>
        </div>

        {/* Stats row */}
        {(athlete.height || athlete.weight || athlete.gpa) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {athlete.height && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground bg-secondary px-2.5 py-1.5 rounded-md">
                <Ruler className="w-3.5 h-3.5 text-accent" />
                {athlete.height}
              </div>
            )}
            {athlete.weight && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground bg-secondary px-2.5 py-1.5 rounded-md">
                <Weight className="w-3.5 h-3.5 text-accent" />
                {athlete.weight}
              </div>
            )}
            {athlete.gpa && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground bg-secondary px-2.5 py-1.5 rounded-md">
                <GraduationCap className="w-3.5 h-3.5 text-accent" />
                GPA: {athlete.gpa.toFixed(1)}
              </div>
            )}
          </div>
        )}

        {athlete.achievements.length > 0 && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-accent/5 border border-accent/10">
            <Trophy className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p className="text-sm text-foreground font-medium">{athlete.achievements[0]}</p>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Support Needed</p>
          <div className="flex flex-wrap gap-1.5">
            {athlete.supportNeeded.map((support) => (
              <Badge key={support} variant="outline" className="text-xs gap-1.5 font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
                {supportIcons[support]}
                {support}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          {athlete.hudlLink && (
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={() => window.open(athlete.hudlLink, '_blank')}
            >
              <Video className="w-4 h-4" />
              Film
            </Button>
          )}
          <Link to={`/athletes/${athlete.id}`} className={athlete.hudlLink ? 'flex-1' : 'w-full'}>
            <Button 
              variant="default" 
              className="w-full group/btn"
            >
              View Profile
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AthleteCard;
