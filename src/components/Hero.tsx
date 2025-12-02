import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Users, Heart, TrendingUp, ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen py-32 pt-40">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-accent">501(c)(3) Nonprofit Organization</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-primary-foreground text-center max-w-5xl leading-[0.9] mb-8 animate-fade-in [animation-delay:100ms] opacity-0 tracking-tight">
          <span className="block">BUILDING THE</span>
          <span className="text-gradient">BRAND OF A</span>
          <span className="block">CHAMPION</span>
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/70 text-center max-w-2xl mb-12 animate-fade-in [animation-delay:200ms] opacity-0 font-medium">
          Empowering athletes to succeed in every aspect of life through media relations, marketing, career development, and personal growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:300ms] opacity-0">
          <Link to="/stories">
            <Button variant="hero" size="xl" className="group">
              <Play className="w-5 h-5" />
              Watch Our Stories
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="heroOutline" size="xl">
            Join Our Mission
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mt-24 animate-fade-in [animation-delay:400ms] opacity-0">
          <div className="text-center p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg red-gradient flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-4xl md:text-5xl font-extrabold text-primary-foreground">500+</span>
            </div>
            <p className="text-sm font-medium text-primary-foreground/60 uppercase tracking-wide">Athletes Supported</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg red-gradient flex items-center justify-center">
                <Heart className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-4xl md:text-5xl font-extrabold text-primary-foreground">100+</span>
            </div>
            <p className="text-sm font-medium text-primary-foreground/60 uppercase tracking-wide">Partner Organizations</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg red-gradient flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-4xl md:text-5xl font-extrabold text-primary-foreground">95%</span>
            </div>
            <p className="text-sm font-medium text-primary-foreground/60 uppercase tracking-wide">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Angled divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-20">
          <path d="M0 80L1440 0V80H0Z" className="fill-background" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
