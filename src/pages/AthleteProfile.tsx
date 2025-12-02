import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Trophy, GraduationCap, Ruler, Weight, Video, Briefcase, Heart, DollarSign, Home, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockAthletes } from "@/data/athletes";

const supportIcons: Record<string, React.ReactNode> = {
  Career: <Briefcase className="w-4 h-4" />,
  Education: <GraduationCap className="w-4 h-4" />,
  "Mental Health": <Heart className="w-4 h-4" />,
  Financial: <DollarSign className="w-4 h-4" />,
  Housing: <Home className="w-4 h-4" />,
  Legal: <Scale className="w-4 h-4" />,
};

const statusColors: Record<string, string> = {
  active: "bg-success text-success-foreground",
  retired: "bg-muted text-muted-foreground",
  transitioning: "bg-accent text-accent-foreground",
};

const AthleteProfile = () => {
  const { id } = useParams<{ id: string }>();
  const athlete = mockAthletes.find((a) => a.id === id);

  if (!athlete) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Athlete Not Found</h1>
          <Link to="/">
            <Button>Back to Athletes</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Athletes
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Photo Section */}
          <div className="animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden border-2 border-border">
              <img
                src={athlete.avatar}
                alt={athlete.name}
                className="w-full aspect-[4/5] object-cover"
              />
              <Badge 
                className={`absolute top-4 right-4 ${statusColors[athlete.status]} capitalize text-sm px-3 py-1`}
              >
                {athlete.status}
              </Badge>
            </div>
          </div>

          {/* Info Section */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            {/* Name and Basic Info */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {athlete.name}
              </h1>
              <p className="text-xl text-primary font-medium">
                {athlete.sport} {athlete.position && `· ${athlete.position}`}
              </p>
              {athlete.classYear && (
                <p className="text-lg text-muted-foreground mt-1">
                  Class of {athlete.classYear}
                </p>
              )}
            </div>

            {/* School and Location */}
            <div className="space-y-2 mb-6">
              {athlete.school && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-5 h-5" />
                  <span>{athlete.school}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{athlete.location}</span>
              </div>
            </div>

            {/* Physical Stats */}
            {(athlete.height || athlete.weight || athlete.gpa) && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl mb-6">
                {athlete.height && (
                  <div className="text-center">
                    <Ruler className="w-5 h-5 mx-auto text-primary mb-1" />
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="font-semibold text-foreground">{athlete.height}</p>
                  </div>
                )}
                {athlete.weight && (
                  <div className="text-center">
                    <Weight className="w-5 h-5 mx-auto text-primary mb-1" />
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-semibold text-foreground">{athlete.weight}</p>
                  </div>
                )}
                {athlete.gpa && (
                  <div className="text-center">
                    <GraduationCap className="w-5 h-5 mx-auto text-primary mb-1" />
                    <p className="text-sm text-muted-foreground">GPA</p>
                    <p className="font-semibold text-foreground">{athlete.gpa.toFixed(1)}</p>
                  </div>
                )}
              </div>
            )}

            {/* Achievements */}
            {athlete.achievements.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  Achievements
                </h3>
                <ul className="space-y-2">
                  {athlete.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Support Needed */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-3">Support Needed</h3>
              <div className="flex flex-wrap gap-2">
                {athlete.supportNeeded.map((support) => (
                  <Badge key={support} variant="outline" className="gap-2 py-2 px-3">
                    {supportIcons[support]}
                    {support}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Hudl Button */}
            {athlete.hudlLink && (
              <Button 
                size="lg"
                className="w-full gap-2"
                onClick={() => window.open(athlete.hudlLink, '_blank')}
              >
                <Video className="w-5 h-5" />
                Watch Hudl Film
              </Button>
            )}
          </div>
        </div>

        {/* Hudl Video Embed */}
        {athlete.hudlLink && (
          <div className="mt-12 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Game Film</h2>
            <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border-2 border-border bg-muted aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">View full game highlights on Hudl</p>
                <Button 
                  onClick={() => window.open(athlete.hudlLink, '_blank')}
                  className="gap-2"
                >
                  <Video className="w-4 h-4" />
                  Open Hudl Profile
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AthleteProfile;