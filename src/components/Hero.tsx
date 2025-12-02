import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Users, Heart, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] hero-gradient overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-[90vh] py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8 animate-fade-in">
          <Heart className="w-4 h-4 text-accent" />
          <span className="text-sm text-primary-foreground/90">Nonprofit · Empowering Athletes Beyond the Game</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground text-center max-w-4xl leading-tight mb-6 animate-fade-in [animation-delay:100ms] opacity-0">
          Building the{" "}
          <span className="text-gradient">Brand of a Champion</span>
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/80 text-center max-w-2xl mb-10 animate-fade-in [animation-delay:200ms] opacity-0">
          Helping professional athletes succeed in every aspect of life through media relations, marketing, career development, and personal growth resources.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:300ms] opacity-0">
          <Link to="/stories">
            <Button variant="hero" size="xl">
              <Play className="w-5 h-5" />
              Watch Our Stories
            </Button>
          </Link>
          <Button variant="heroOutline" size="xl">
            Join Our Mission
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-8 md:gap-16 mt-20 animate-fade-in [animation-delay:400ms] opacity-0">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-accent mb-1">
              <Users className="w-5 h-5" />
              <span className="text-3xl md:text-4xl font-bold text-primary-foreground">500+</span>
            </div>
            <p className="text-sm text-primary-foreground/60">Athletes Supported</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-accent mb-1">
              <Heart className="w-5 h-5" />
              <span className="text-3xl md:text-4xl font-bold text-primary-foreground">100+</span>
            </div>
            <p className="text-sm text-primary-foreground/60">Partner Organizations</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-accent mb-1">
              <TrendingUp className="w-5 h-5" />
              <span className="text-3xl md:text-4xl font-bold text-primary-foreground">95%</span>
            </div>
            <p className="text-sm text-primary-foreground/60">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
